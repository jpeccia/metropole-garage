import { Vehicle } from '@/types/vehicle';

export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Aston',
    model: 'Vulcan',
    year: 2024,
    color: 'Black',
    type: 'exotic',
    licensePlate: 'VLCN 24',
    performance: {
      topSpeed: 95,
      acceleration: 98,
      handling: 92,
      braking: 94
    },
    customizations: {
      bodyKit: 'Carbon',
      wheels: 'Performance Alloy',
      paintJob: 'Matte Black',
      interior: 'Racing',
      spoiler: true,
      neonLights: true
    },
    imageUrl: 'https://images.pexels.com/photos/3752184/pexels-photo-3752184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    make: 'Lambo',
    model: 'Aventador',
    year: 2023,
    color: 'Yellow',
    type: 'exotic',
    licensePlate: 'LMBO 23',
    performance: {
      topSpeed: 97,
      acceleration: 96,
      handling: 90,
      braking: 92
    },
    customizations: {
      bodyKit: 'Sport',
      wheels: 'Premium Alloy',
      paintJob: 'Metallic Yellow',
      interior: 'Luxury',
      spoiler: true,
      neonLights: false
    },
    imageUrl: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    make: 'Ferrari',
    model: '488 GTB',
    year: 2022,
    color: 'Red',
    type: 'sports',
    licensePlate: 'FER 488',
    performance: {
      topSpeed: 94,
      acceleration: 95,
      handling: 93,
      braking: 91
    },
    customizations: {
      bodyKit: 'Classic',
      wheels: 'Sport Alloy',
      paintJob: 'Ferrari Red',
      interior: 'Racing',
      spoiler: true,
      neonLights: false
    },
    imageUrl: 'https://images.pexels.com/photos/2664399/pexels-photo-2664399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    make: 'Porsche',
    model: '911 Turbo S',
    year: 2023,
    color: 'Silver',
    type: 'sports',
    licensePlate: 'POR 911',
    performance: {
      topSpeed: 93,
      acceleration: 94,
      handling: 96,
      braking: 95
    },
    customizations: {
      bodyKit: 'GT',
      wheels: 'Premium Sport',
      paintJob: 'Metallic Silver',
      interior: 'Premium',
      spoiler: true,
      neonLights: false
    },
    imageUrl: 'https://images.pexels.com/photos/4674337/pexels-photo-4674337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    make: 'BMW',
    model: 'M5',
    year: 2022,
    color: 'Blue',
    type: 'sedan',
    licensePlate: 'BMW M5',
    performance: {
      topSpeed: 88,
      acceleration: 87,
      handling: 90,
      braking: 89
    },
    customizations: {
      bodyKit: 'M Sport',
      wheels: 'Performance',
      paintJob: 'Metallic Blue',
      interior: 'Premium',
      spoiler: false,
      neonLights: false
    },
    imageUrl: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    make: 'Audi',
    model: 'RS7',
    year: 2023,
    color: 'White',
    type: 'sedan',
    licensePlate: 'AUD RS7',
    performance: {
      topSpeed: 87,
      acceleration: 88,
      handling: 89,
      braking: 88
    },
    customizations: {
      bodyKit: 'RS',
      wheels: 'Premium',
      paintJob: 'Pearl White',
      interior: 'Luxury',
      spoiler: false,
      neonLights: true
    },
    imageUrl: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    make: 'Kawasaki',
    model: 'Ninja ZX-10R',
    year: 2023,
    color: 'Green',
    type: 'motorcycle',
    licensePlate: 'NJA 10R',
    performance: {
      topSpeed: 96,
      acceleration: 97,
      handling: 95,
      braking: 93
    },
    customizations: {
      wheels: 'Racing',
      paintJob: 'Kawasaki Green',
      neonLights: true
    },
    imageUrl: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    make: 'Jeep',
    model: 'Wrangler Rubicon',
    year: 2022,
    color: 'Orange',
    type: 'offroad',
    licensePlate: 'JEP RBN',
    performance: {
      topSpeed: 75,
      acceleration: 70,
      handling: 85,
      braking: 80
    },
    customizations: {
      bodyKit: 'Off-Road',
      wheels: 'All-Terrain',
      paintJob: 'Rubicon Orange',
      interior: 'Utility',
      spoiler: false,
      neonLights: false
    },
    imageUrl: 'https://images.pexels.com/photos/2611687/pexels-photo-2611687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '9',
    make: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2023,
    color: 'Green',
    type: 'suv',
    licensePlate: 'RRS 23',
    performance: {
      topSpeed: 80,
      acceleration: 78,
      handling: 82,
      braking: 83
    },
    customizations: {
      bodyKit: 'Premium',
      wheels: 'Luxury Alloy',
      paintJob: 'British Racing Green',
      interior: 'Luxury',
      spoiler: false,
      neonLights: false
    },
    imageUrl: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];