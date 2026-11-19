/**
 * Accessible client-side form validation with Turkish messages.
 *
 * Rules come from native attributes (required, type="email", minlength, maxlength),
 * so the markup stays the single source of truth. Errors are rendered inline
 * (linked with aria-describedby) and in an error summary that receives focus.
 *
 * This module only validates. What happens with valid data is decided by the
 * caller's `onValid` handler, so a real submission endpoint can be added later
 * without touching the validation logic.
 */

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface ValidField {
  name: string;
  label: string;
  value: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function labelText(form: HTMLFormElement, field: Field): string {
  const label = form.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(field.id)}"]`);
  return (label?.dataset.name ?? label?.textContent ?? field.name).replace(/\s*\(isteğe bağlı\)\s*/i, '').trim();
}

function messageFor(field: Field, label: string): string | null {
  const value = field.value.trim();

  if (field instanceof HTMLInputElement && field.type === 'checkbox') {
    return field.required && !field.checked ? `${label} için kutuyu işaretleyin.` : null;
  }
  if (field.required && value === '') {
    return `${label} alanını doldurun.`;
  }
  if (value === '') return null;

  if (field instanceof HTMLInputElement && field.type === 'email' && !EMAIL_PATTERN.test(value)) {
    return 'Geçerli bir e-posta adresi girin (örneğin ad@alanadi.com).';
  }
  if ('minLength' in field && field.minLength > 0 && value.length < field.minLength) {
    return `${label} en az ${field.minLength} karakter olmalı. Şu an ${value.length} karakter.`;
  }
  if ('maxLength' in field && field.maxLength > 0 && value.length > field.maxLength) {
    return `${label} en fazla ${field.maxLength} karakter olabilir.`;
  }
  return null;
}

function setError(field: Field, message: string | null): void {
  const errorId = `${field.id}-hata`;
  const errorEl = document.getElementById(errorId);
  const describedBy = (field.getAttribute('aria-describedby') ?? '')
    .split(' ')
    .filter((id) => id && id !== errorId);

  if (message) {
    field.setAttribute('aria-invalid', 'true');
    describedBy.push(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  } else {
    field.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  }

  if (describedBy.length) field.setAttribute('aria-describedby', describedBy.join(' '));
  else field.removeAttribute('aria-describedby');
}

export function enhanceForm(
  form: HTMLFormElement,
  onValid: (fields: ValidField[], form: HTMLFormElement) => void,
): void {
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  const summaryList = summary?.querySelector('ul');
  const fields = Array.from(form.querySelectorAll<Field>('input, textarea, select')).filter(
    (f) => f.name && f.type !== 'hidden',
  );

  form.noValidate = true;

  // Only fields already flagged are re-checked, so nobody is scolded mid-typing.
  // Re-checking on input (not blur) clears the error while the visitor is still in
  // the field: clearing on blur would shift the layout between mousedown and mouseup
  // and swallow the click on whatever they were moving to.
  for (const field of fields) {
    const revalidate = () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        setError(field, messageFor(field, labelText(form, field)));
      }
    };
    field.addEventListener('input', revalidate);
    field.addEventListener('change', revalidate);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const errors: { field: Field; message: string }[] = [];
    for (const field of fields) {
      const message = messageFor(field, labelText(form, field));
      setError(field, message);
      if (message) errors.push({ field, message });
    }

    if (summary && summaryList) {
      summaryList.replaceChildren(
        ...errors.map(({ field, message }) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${field.id}`;
          a.textContent = message;
          a.addEventListener('click', (e) => {
            e.preventDefault();
            field.focus();
          });
          li.append(a);
          return li;
        }),
      );
      summary.hidden = errors.length === 0;
    }

    if (errors.length > 0) {
      (summary ?? errors[0]!.field).focus();
      return;
    }

    onValid(
      fields
        .filter((f) => !(f instanceof HTMLInputElement && f.type === 'checkbox'))
        .map((f) => ({ name: f.name, label: labelText(form, f), value: f.value.trim() })),
      form,
    );
  });
}
