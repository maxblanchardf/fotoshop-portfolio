/* =====================================================
   FOTO SHOP ESTUDIO — data.js
   =====================================================
   CÓMO AGREGAR FOTOS
   ─────────────────────────────────────────────────────
   Cada entrada del array PHOTOS tiene esta estructura:

   {
     id:            número único (incremental),
     src:           'photos/categoria/nombre-foto.jpg',
     category:      'slug-de-categoria',        ← ver slugs abajo
     categoryLabel: 'Nombre para mostrar',
     client:        'Nombre del Cliente',
     title:         'Descripción opcional'
   }

   SLUGS DE CATEGORÍAS DISPONIBLES:
     moda-hombre | moda-mujer | accesorios | lenceria
     colgados    | flat-lay   | 360        | infantil
     campanias   | calzado

   EJEMPLO REAL:
   {
     id: 101,
     src: 'photos/moda-hombre/camisa-azul.jpg',
     category: 'moda-hombre',
     categoryLabel: 'Moda Hombre',
     client: 'Marca XYZ',
     title: 'Colección Otoño 2025'
   }

   REEMPLAZA las entradas de muestra por tus fotos reales.
   ===================================================== */

const PHOTOS = [

  // ── MODA HOMBRE ───────────────────────────────────
  { id:  1, src: 'https://picsum.photos/seed/mh1/600/800', category: 'moda-hombre', categoryLabel: 'Moda Hombre', client: 'Colección MH', title: '' },
  { id:  2, src: 'https://picsum.photos/seed/mh2/600/800', category: 'moda-hombre', categoryLabel: 'Moda Hombre', client: 'Marca Urbana', title: '' },
  { id:  3, src: 'https://picsum.photos/seed/mh3/600/800', category: 'moda-hombre', categoryLabel: 'Moda Hombre', client: 'Colección MH', title: '' },
  { id:  4, src: 'https://picsum.photos/seed/mh4/600/800', category: 'moda-hombre', categoryLabel: 'Moda Hombre', client: 'Estudio Clásico', title: '' },
  { id:  5, src: 'https://picsum.photos/seed/mh5/600/800', category: 'moda-hombre', categoryLabel: 'Moda Hombre', client: 'Marca Urbana', title: '' },

  // ── MODA MUJER ────────────────────────────────────
  { id:  6, src: 'https://picsum.photos/seed/mw6/600/800', category: 'moda-mujer', categoryLabel: 'Moda Mujer', client: 'Colección MW', title: '' },
  { id:  7, src: 'https://picsum.photos/seed/mw7/600/800', category: 'moda-mujer', categoryLabel: 'Moda Mujer', client: 'Alta Costura', title: '' },
  { id:  8, src: 'https://picsum.photos/seed/mw8/600/800', category: 'moda-mujer', categoryLabel: 'Moda Mujer', client: 'Colección MW', title: '' },
  { id:  9, src: 'https://picsum.photos/seed/mw9/600/800', category: 'moda-mujer', categoryLabel: 'Moda Mujer', client: 'Primavera Co.', title: '' },
  { id: 10, src: 'https://picsum.photos/seed/mw10/600/800', category: 'moda-mujer', categoryLabel: 'Moda Mujer', client: 'Alta Costura', title: '' },

  // ── ACCESORIOS ────────────────────────────────────
  { id: 11, src: 'https://picsum.photos/seed/ac11/600/800', category: 'accesorios', categoryLabel: 'Accesorios', client: 'Joyería Luna', title: '' },
  { id: 12, src: 'https://picsum.photos/seed/ac12/600/800', category: 'accesorios', categoryLabel: 'Accesorios', client: 'Bolsos & Co.', title: '' },
  { id: 13, src: 'https://picsum.photos/seed/ac13/600/800', category: 'accesorios', categoryLabel: 'Accesorios', client: 'Joyería Luna', title: '' },
  { id: 14, src: 'https://picsum.photos/seed/ac14/600/800', category: 'accesorios', categoryLabel: 'Accesorios', client: 'Bolsos & Co.', title: '' },

  // ── LENCERÍA ──────────────────────────────────────
  { id: 15, src: 'https://picsum.photos/seed/le15/600/800', category: 'lenceria', categoryLabel: 'Lencería', client: 'Íntima Brand', title: '' },
  { id: 16, src: 'https://picsum.photos/seed/le16/600/800', category: 'lenceria', categoryLabel: 'Lencería', client: 'Íntima Brand', title: '' },
  { id: 17, src: 'https://picsum.photos/seed/le17/600/800', category: 'lenceria', categoryLabel: 'Lencería', client: 'Soft Collection', title: '' },
  { id: 18, src: 'https://picsum.photos/seed/le18/600/800', category: 'lenceria', categoryLabel: 'Lencería', client: 'Soft Collection', title: '' },

  // ── COLGADOS ──────────────────────────────────────
  { id: 19, src: 'https://picsum.photos/seed/co19/600/800', category: 'colgados', categoryLabel: 'Colgados', client: 'Colección MH', title: '' },
  { id: 20, src: 'https://picsum.photos/seed/co20/600/800', category: 'colgados', categoryLabel: 'Colgados', client: 'Marca Urbana', title: '' },
  { id: 21, src: 'https://picsum.photos/seed/co21/600/800', category: 'colgados', categoryLabel: 'Colgados', client: 'Colección MW', title: '' },

  // ── FLAT LAY ──────────────────────────────────────
  { id: 22, src: 'https://picsum.photos/seed/fl22/600/800', category: 'flat-lay', categoryLabel: 'Flat Lay', client: 'Bolsos & Co.', title: '' },
  { id: 23, src: 'https://picsum.photos/seed/fl23/600/800', category: 'flat-lay', categoryLabel: 'Flat Lay', client: 'Joyería Luna', title: '' },
  { id: 24, src: 'https://picsum.photos/seed/fl24/600/800', category: 'flat-lay', categoryLabel: 'Flat Lay', client: 'Alta Costura', title: '' },
  { id: 25, src: 'https://picsum.photos/seed/fl25/600/800', category: 'flat-lay', categoryLabel: 'Flat Lay', client: 'Bolsos & Co.', title: '' },

  // ── 360° ──────────────────────────────────────────
  { id: 26, src: 'https://picsum.photos/seed/tr26/600/800', category: '360', categoryLabel: '360°', client: 'Calzado Pro', title: '' },
  { id: 27, src: 'https://picsum.photos/seed/tr27/600/800', category: '360', categoryLabel: '360°', client: 'Calzado Pro', title: '' },
  { id: 28, src: 'https://picsum.photos/seed/tr28/600/800', category: '360', categoryLabel: '360°', client: 'Joyería Luna', title: '' },

  // ── INFANTIL ──────────────────────────────────────
  { id: 29, src: 'https://picsum.photos/seed/in29/600/800', category: 'infantil', categoryLabel: 'Infantil', client: 'Mini Moda', title: '' },
  { id: 30, src: 'https://picsum.photos/seed/in30/600/800', category: 'infantil', categoryLabel: 'Infantil', client: 'Mini Moda', title: '' },
  { id: 31, src: 'https://picsum.photos/seed/in31/600/800', category: 'infantil', categoryLabel: 'Infantil', client: 'Pequeños & Co.', title: '' },
  { id: 32, src: 'https://picsum.photos/seed/in32/600/800', category: 'infantil', categoryLabel: 'Infantil', client: 'Pequeños & Co.', title: '' },

  // ── CAMPAÑAS ──────────────────────────────────────
  { id: 33, src: 'https://picsum.photos/seed/ca33/600/800', category: 'campanias', categoryLabel: 'Campañas', client: 'Primavera Co.', title: '' },
  { id: 34, src: 'https://picsum.photos/seed/ca34/600/800', category: 'campanias', categoryLabel: 'Campañas', client: 'Estudio Clásico', title: '' },
  { id: 35, src: 'https://picsum.photos/seed/ca35/600/800', category: 'campanias', categoryLabel: 'Campañas', client: 'Marca Urbana', title: '' },
  { id: 36, src: 'https://picsum.photos/seed/ca36/600/800', category: 'campanias', categoryLabel: 'Campañas', client: 'Primavera Co.', title: '' },

  // ── CALZADO ───────────────────────────────────────
  { id: 37, src: 'https://picsum.photos/seed/cz37/600/800', category: 'calzado', categoryLabel: 'Calzado', client: 'Calzado Pro', title: '' },
  { id: 38, src: 'https://picsum.photos/seed/cz38/600/800', category: 'calzado', categoryLabel: 'Calzado', client: 'Calzado Pro', title: '' },
  { id: 39, src: 'https://picsum.photos/seed/cz39/600/800', category: 'calzado', categoryLabel: 'Calzado', client: 'Estudio Clásico', title: '' },
  { id: 40, src: 'https://picsum.photos/seed/cz40/600/800', category: 'calzado', categoryLabel: 'Calzado', client: 'Calzado Pro', title: '' },

];
