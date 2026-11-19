import type { ImageMetadata } from 'astro';
import kelebek from '../../assets/john-remy/kelebek.webp';
import fincan from '../../assets/john-remy/fincan.webp';
import figur from '../../assets/john-remy/figur.webp';
import goz from '../../assets/john-remy/goz.webp';

/**
 * John Remy's artworks. Only facts supplied by the artist are recorded here.
 * Year, medium and dimensions are intentionally absent until the artist provides them.
 */
export interface Artwork {
  slug: string;
  /** Title exactly as given by the artist. */
  title: string;
  image: ImageMetadata;
  /** Turkish description of what the image shows, for screen readers. */
  alt: string;
  /** The background the artwork is painted on; the detail page adopts it. */
  ground: 'blood' | 'black';
  /** Artist's own statement, kept verbatim in its original language. */
  statement?: { text: string; lang: string };
}

export const artworks: Artwork[] = [
  {
    slug: 'untitled-834769',
    title: 'Untitled 834769',
    image: kelebek,
    alt: 'Koyu kırmızı zemin üzerinde, mürekkep lekesini andıran simetrik siyah bir kelebek. İki kanadında da göz biçiminde halkalar var.',
    ground: 'blood',
  },
  {
    slug: 'screaming-mug',
    title: 'Screaming Mug',
    image: fincan,
    alt: 'Karakalem dokusunda, insan yüzüne dönüşmüş bir kupa: iri ve yorgun gözler, kulak biçiminde bir kulp ve çığlık atar gibi açılmış bir ağız. Siyah zeminde parlak bir ışık halesi içinde duruyor.',
    ground: 'black',
    statement: {
      text: 'An arbitrary mockery of ego mixed with a pinch of healthy, reflecting humour in insomnia while trying to observe insanity through a thick sanity tinted window.',
      lang: 'en',
    },
  },
  {
    slug: 'untitled-271503',
    title: 'Untitled 271503',
    image: figur,
    alt: 'Karanlıkta, yukarıdan düşen koni biçimli bir ışığın altında, yuvarlak bir minderin üzerinde bağdaş kurmuş, sırtı dönük çıplak bir kadın figürü. Karakalem dokusunda çizim.',
    ground: 'black',
  },
  {
    slug: 'untitled-590118',
    title: 'Untitled 590118',
    image: goz,
    alt: 'Simsiyah zemin üzerine beyaz çizgilerle çizilmiş, gölgenin içinden bakan tek bir göz. Sağ altta sanatçının imzası var.',
    ground: 'black',
  },
];

export function artworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export interface ArtistProfile {
  name: string;
  /** Bio paragraphs. `null` shows a "not yet added" placeholder. */
  bio: string[] | null;
  /**
   * True while the bio is sample text written for the demo. It describes only what
   * is visible in the works (no invented exhibitions, education, places or dates).
   * The page labels it as sample text. Set to false once the artist approves or
   * replaces it.
   */
  bioIsSample: boolean;
  contact: {
    email: string | null;
    instagram: string | null;
    /**
     * True while the channels are samples. Sample values are shown as plain text
     * with an "Örnek" tag and are never linked, so no visitor reaches a stranger.
     * The email uses the reserved .example domain (RFC 2606), which has no mailboxes.
     */
    isSample: boolean;
  };
}

export const artist: ArtistProfile = {
  name: 'John Remy',
  bio: [
    'John Remy, karakalem dokusunu ve sert ışık-karanlık karşıtlığını kullanarak insan hâllerini çizen bir sanatçı. Çizimlerinde gündelik bir kupa yüze, bir mürekkep lekesi kelebeğe, tek bir bakış bütün bir resme dönüşüyor.',
    'Eserlerinin çoğu siyah bir zeminde, tek bir ışık kaynağının altında duruyor; uykusuz gecelerin, insanın kendi kendisiyle konuşmasının ve egonun hafif bir alayla izlendiği bir sahne gibi. Kırmızı ise bu sessizliği bozan tek renk.',
  ],
  bioIsSample: true,
  contact: {
    email: 'merhaba@johnremy.example',
    instagram: 'johnremy.cizim',
    isSample: true,
  },
};
