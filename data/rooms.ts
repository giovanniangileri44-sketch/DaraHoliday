import { Room } from '../types';

// LISTA REALE DELLE CAMERE
const ROOMS_DATA = [
  // PIANO TERRA (Piano 0)
  { "id": "101", "name": "Appartamento 101", "type": "Deluxe", "capacity": 2, "floor": 0, "size": 55, "outdoor": "Terrazza" },
  { "id": "102", "name": "Appartamento 102", "type": "Standard", "capacity": 2, "floor": 0, "size": 48, "outdoor": "Terrazza" },
  { "id": "103", "name": "Appartamento 103", "type": "Deluxe", "capacity": 4, "floor": 0, "size": 59, "outdoor": "Terrazza", "features": ["Sofa"] },
  { "id": "106", "name": "Appartamento 106", "type": "Deluxe", "capacity": 2, "floor": 0, "size": 59, "outdoor": "Terrazza" },
  { "id": "107", "name": "Appartamento 107", "type": "Deluxe", "capacity": 2, "floor": 0, "size": 60, "outdoor": "Terrazza" },
  { "id": "108", "name": "Appartamento 108", "type": "Deluxe", "capacity": 2, "floor": 0, "size": 53, "outdoor": "Terrazza" },

  // PRIMO PIANO (Piano 1 - Lato A)
  { "id": "201", "name": "Appartamento 201", "type": "Standard", "capacity": 2, "floor": 1, "size": 46, "outdoor": "Balcone" },
  { "id": "202", "name": "Appartamento 202", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 60, "outdoor": "Balcone" },
  { "id": "203", "name": "Appartamento 203", "type": "Standard", "capacity": 2, "floor": 1, "size": 46, "outdoor": "Balcone" },
  { "id": "204", "name": "Appartamento 204", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 52, "outdoor": "Balcone" },
  { "id": "205", "name": "Appartamento 205", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 53, "outdoor": "Balcone" },
  { "id": "206", "name": "Appartamento 206", "type": "Standard", "capacity": 2, "floor": 1, "size": 45, "outdoor": "Balcone" },
  { "id": "207", "name": "Appartamento 207", "type": "Standard", "capacity": 2, "floor": 1, "size": 47, "outdoor": "Balcone" },
  { "id": "208", "name": "Appartamento 208", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 56, "outdoor": "Balcone" },

  // PIANO TERRA / CORTE (Serie 300 - Piano 0)
  { "id": "301", "name": "Appartamento 301", "type": "Deluxe", "capacity": 4, "floor": 0, "size": 63, "outdoor": "Terrazza", "features": ["Sofa"] },
  { "id": "302", "name": "Appartamento 302", "type": "Deluxe", "capacity": 4, "floor": 0, "size": 63, "outdoor": "Terrazza", "features": ["Twinbed (2)"] },
  { "id": "303", "name": "Appartamento 303", "type": "Deluxe", "capacity": 4, "floor": 0, "size": 58, "outdoor": "Terrazza", "features": ["Sofa"] },
  { "id": "304", "name": "Appartamento 304", "type": "Standard", "capacity": 2, "floor": 0, "size": 49, "outdoor": "Terrazza" },
  { "id": "305", "name": "Appartamento 305", "type": "Deluxe", "capacity": 2, "floor": 0, "size": 58, "outdoor": "Terrazza" },
  { "id": "306", "name": "Appartamento 306", "type": "Deluxe", "capacity": 3, "floor": 0, "size": 63, "outdoor": "Terrazza", "features": ["Singlebed (1)"] },
  { "id": "307", "name": "Appartamento 307", "type": "Standard", "capacity": 2, "floor": 0, "size": 49, "outdoor": "Terrazza" },
  { "id": "308", "name": "Appartamento 308", "type": "Deluxe", "capacity": 4, "floor": 0, "size": 57, "outdoor": "Terrazza", "features": ["Sofa"] },

  // PRIMO PIANO / ALTRA ALA (Serie 400 - Piano 1)
  { "id": "401", "name": "Appartamento 401", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 71, "outdoor": "Balcone" },
  { "id": "402", "name": "Appartamento 402", "type": "Deluxe", "capacity": 4, "floor": 1, "size": 73, "outdoor": "Balcone", "features": ["Sofa"] },
  { "id": "403", "name": "Appartamento 403", "type": "Deluxe", "capacity": 4, "floor": 1, "size": 68, "outdoor": "Balcone", "features": ["Sofa"] },
  { "id": "404", "name": "Appartamento 404", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 52, "outdoor": "Balcone" },
  { "id": "405", "name": "Appartamento 405", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 57, "outdoor": "Balcone" },
  { "id": "406", "name": "Appartamento 406", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 50, "outdoor": "Balcone" },
  { "id": "407", "name": "Appartamento 407", "type": "Standard", "capacity": 2, "floor": 1, "size": 49, "outdoor": "Balcone" },
  { "id": "408", "name": "Appartamento 408", "type": "Deluxe", "capacity": 2, "floor": 1, "size": 58, "outdoor": "Balcone" },

];

// Default amenities valid for all rooms (since not specified in JSON per room)
const DEFAULT_AMENITIES = [
  'Wifi', 'Aria Condizionata', 'Riscaldamento', 'Cucina',
  'Frigorifero', 'Macchina Caffè', 'TV', 'Asciugacapelli'
];

// Helper to generate image paths
const getRoomImages = (roomId: string) => {
  // Logic: 
  // mainImage: /foto/cam{ID}/1.webp
  // gallery: /foto/cam{ID}/2.webp ... 5.webp
  // Note: The previous logic used 'cam'+id. We keep that convention.
  const folderId = `cam${roomId}`;
  return {
    mainImage: `/foto/${folderId}/1.webp`,
    gallery: [
      `/foto/${folderId}/2.webp`,
      `/foto/${folderId}/3.webp`,
      `/foto/${folderId}/4.webp`,
      `/foto/${folderId}/5.webp`
    ]
  }
};

export const rooms: Room[] = ROOMS_DATA.map((data) => {
  const images = getRoomImages(data.id);
  const floorText = data.floor === 0 ? 'piano terra' : 'primo piano';

  return {
    ...data,
    description: `${data.type} Appartment al ${floorText} con ${data.outdoor}.`, // Basic description generation
    price: 0, // Placeholder, as price is now "Variable"
    amenities: DEFAULT_AMENITIES, // Static base amenities, specific features added below if needed?
    // Note: features from JSON are separate from general amenities in the UI usually, but we can merge them if needed.
    // For now, we keeps amenities as the standard list, and features are in the room object.
    mainImage: images.mainImage,
    gallery: images.gallery
  };
});