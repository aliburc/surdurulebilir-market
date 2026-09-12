const CATEGORY_IMAGES: Record<string, string> = {
  "Karton Kutu": "/images/categories/karton-kutu.jpg",
  "Cam Şişe / Kavanoz": "/images/categories/cam-kavanoz.jpg",
  "Kağıt Poşet": "/images/categories/kagit-poset.jpg",
  "Biyobozunur Plastik Film": "/images/categories/plastik-film.jpg",
  "Geri Dönüştürülmüş PET Şişe": "/images/categories/pet-sise.jpg",
  "Mantar Tıpa": "/images/categories/mantar-tipa.jpg",
  "Dolgu Malzemesi": "/images/categories/dolgu-malzemesi.jpg",
  "Bambu Ambalaj": "/images/categories/bambu-ambalaj.jpg",
};

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? "/images/categories/karton-kutu.jpg";
}
