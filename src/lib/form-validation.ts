/**
 * Accessible client-side form validation with Turkish messages.
 *
 * Rules come from the markup, so it stays the single source of truth:
 *   required, type="email", type="tel", type="date", minlength, maxlength,
 *   data-min-days / data-max-days on dates (relative to today),
 *   radio groups inside a <fieldset data-name="...">.
 * Errors are rendered inline (linked with aria-describedby) and in an error
 * summary that receives focus.
 *
 * This module only validates. What happens with valid data is decided by the
 * caller's `onValid` handler, so a real submission endpoint can be added later
 * without touching the validation logic.
 */

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface ValidField {
  name: string;
  label: string;
  /** Human-readable value (option text, formatted date), safe to show as text. */
  value: string;
}

interface Control {
  name: string;
  /** Element that receives focus and is described by the error. */
  focusTarget: HTMLElement;
  describedTarget: HTMLElement;
  errorId: string;
  label: string;
  fields: Field[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanLabel(text: string): string {
  return text.replace(/\s*\(isteğe bağlı\)\s*/i, '').replace(/\s+/g, ' ').trim();
}

function labelFor(form: HTMLFormElement, field: Field): string {
  const label = form.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(field.id)}"]`);
  return cleanLabel(label?.dataset.name ?? label?.textContent ?? field.name);
}

/** Today at local midnight, plus `days`. */
function dayOffset(days: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
}

function toIsoDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}.${m}.${y}` : iso;
}

function validPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 10) return /^[2-5]/.test(digits);
  if (digits.length === 11) return digits.startsWith('0');
  if (digits.length === 12) return digits.startsWith('90');
  return false;
}

function messageFor(control: Control): string | null {
  const [first] = control.fields;
  if (!first) return null;
  const label = control.label;

  // Radio group
  if (first instanceof HTMLInputElement && first.type === 'radio') {
    const required = control.fields.some((f) => f.required);
    const checked = control.fields.some((f) => (f as HTMLInputElement).checked);
    return required && !checked ? `${label} için bir seçenek işaretleyin.` : null;
  }

  // Checkbox
  if (first instanceof HTMLInputElement && first.type === 'checkbox') {
    return first.required && !first.checked ? `${label} için kutuyu işaretleyin.` : null;
  }

  const value = first.value.trim();

  if (first.required && value === '') {
    return first instanceof HTMLSelectElement || (first instanceof HTMLInputElement && first.type === 'date')
      ? `${label} seçin.`
      : `${label} alanını doldurun.`;
  }
  if (value === '') return null;

  if (first instanceof HTMLInputElement) {
    if (first.type === 'email' && !EMAIL_PATTERN.test(value)) {
      return 'Geçerli bir e-posta adresi girin (örneğin ad@alanadi.com).';
    }
    if (first.type === 'tel' && !validPhone(value)) {
      return 'Telefon numarasını 05XX XXX XX XX biçiminde girin.';
    }
    if (first.type === 'date') {
      const minDays = first.dataset.minDays;
      const maxDays = first.dataset.maxDays;
      if (minDays !== undefined && value < toIsoDate(dayOffset(Number(minDays)))) {
        return 'Geçmiş bir tarih seçilemez. Bugün ya da sonrası için bir gün seçin.';
      }
      if (maxDays !== undefined && value > toIsoDate(dayOffset(Number(maxDays)))) {
        return `En fazla ${maxDays} gün sonrası için rezervasyon alınabilir.`;
      }
    }
  }

  if (!(first instanceof HTMLSelectElement)) {
    if (first.minLength > 0 && value.length < first.minLength) {
      return `${label} en az ${first.minLength} karakter olmalı. Şu an ${value.length} karakter.`;
    }
    if (first.maxLength > 0 && value.length > first.maxLength) {
      return `${label} en fazla ${first.maxLength} karakter olabilir.`;
    }
  }
  return null;
}

function setError(control: Control, message: string | null): void {
  const errorEl = document.getElementById(control.errorId);
  const target = control.describedTarget;
  const describedBy = (target.getAttribute('aria-describedby') ?? '')
    .split(' ')
    .filter((id) => id && id !== control.errorId);
  const isGroup = target instanceof HTMLFieldSetElement;

  if (message) {
    if (!isGroup) target.setAttribute('aria-invalid', 'true');
    target.dataset.invalid = 'true';
    describedBy.push(control.errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  } else {
    target.removeAttribute('aria-invalid');
    delete target.dataset.invalid;
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  }

  if (describedBy.length) target.setAttribute('aria-describedby', describedBy.join(' '));
  else target.removeAttribute('aria-describedby');
}

function displayValue(control: Control): string {
  const [first] = control.fields;
  if (!first) return '';
  if (first instanceof HTMLInputElement && first.type === 'radio') {
    const checked = control.fields.find((f) => (f as HTMLInputElement).checked);
    if (!checked) return '';
    const label = checked.closest('form')?.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(checked.id)}"]`);
    return cleanLabel(label?.textContent ?? checked.value);
  }
  if (first instanceof HTMLSelectElement) {
    return first.value === '' ? '' : (first.selectedOptions[0]?.textContent?.trim() ?? first.value);
  }
  if (first instanceof HTMLInputElement && first.type === 'date') return formatDate(first.value);
  return first.value.trim();
}

function collectControls(form: HTMLFormElement): Control[] {
  const controls: Control[] = [];
  const seenGroups = new Set<string>();
  const fields = Array.from(form.querySelectorAll<Field>('input, textarea, select')).filter(
    (f) => f.name && f.type !== 'hidden',
  );

  for (const field of fields) {
    if (field instanceof HTMLInputElement && field.type === 'radio') {
      if (seenGroups.has(field.name)) continue;
      seenGroups.add(field.name);
      const group = fields.filter((f) => f instanceof HTMLInputElement && f.type === 'radio' && f.name === field.name);
      const fieldset = field.closest('fieldset');
      if (!fieldset) throw new Error(`Radio group "${field.name}" must be inside a <fieldset>.`);
      const legend = fieldset.querySelector('legend');
      controls.push({
        name: field.name,
        focusTarget: field,
        describedTarget: fieldset,
        errorId: `${field.name}-hata`,
        label: cleanLabel(fieldset.dataset.name ?? legend?.textContent ?? field.name),
        fields: group,
      });
      continue;
    }
    controls.push({
      name: field.name,
      focusTarget: field,
      describedTarget: field,
      errorId: `${field.id}-hata`,
      label: labelFor(form, field),
      fields: [field],
    });
  }
  return controls;
}

export function enhanceForm(
  form: HTMLFormElement,
  onValid: (fields: ValidField[], form: HTMLFormElement) => void,
): void {
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  const summaryList = summary?.querySelector('ul');
  const controls = collectControls(form);

  form.noValidate = true;

  // Keep native date pickers inside the allowed window.
  for (const input of form.querySelectorAll<HTMLInputElement>('input[type="date"]')) {
    if (input.dataset.minDays !== undefined) input.min = toIsoDate(dayOffset(Number(input.dataset.minDays)));
    if (input.dataset.maxDays !== undefined) input.max = toIsoDate(dayOffset(Number(input.dataset.maxDays)));
  }

  // Only controls already flagged are re-checked, so nobody is scolded mid-typing.
  // Re-checking on input (not blur) clears the error while the visitor is still in
  // the field: clearing on blur would shift the layout between mousedown and mouseup
  // and swallow the click on whatever they were moving to.
  for (const control of controls) {
    const revalidate = () => {
      if (control.describedTarget.dataset.invalid === 'true') setError(control, messageFor(control));
    };
    for (const field of control.fields) {
      field.addEventListener('input', revalidate);
      field.addEventListener('change', revalidate);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const errors: { control: Control; message: string }[] = [];
    for (const control of controls) {
      const message = messageFor(control);
      setError(control, message);
      if (message) errors.push({ control, message });
    }

    if (summary && summaryList) {
      summaryList.replaceChildren(
        ...errors.map(({ control, message }) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${control.focusTarget.id}`;
          a.textContent = message;
          a.addEventListener('click', (e) => {
            e.preventDefault();
            control.focusTarget.focus();
          });
          li.append(a);
          return li;
        }),
      );
      summary.hidden = errors.length === 0;
    }

    if (errors.length > 0) {
      (summary ?? errors[0]!.control.focusTarget).focus();
      return;
    }

    onValid(
      controls
        .filter((c) => !(c.fields[0] instanceof HTMLInputElement && c.fields[0].type === 'checkbox'))
        .map((c) => ({ name: c.name, label: c.label, value: displayValue(c) })),
      form,
    );
  });
}
