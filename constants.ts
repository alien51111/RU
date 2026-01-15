import { LocationData } from './types';

export const LOCATIONS: Record<string, LocationData> = {
  'iraq': {
    id: 'iraq',
    level: 'country',
    name: 'Republic of Iraq',
    subtitle: 'National Grid',
    description: 'The core digital infrastructure network connecting Mesopotamia’s major commercial hubs.',
    originalUrl: '',
    lat: 33.3152,
    lng: 44.3661,
    coords: { x: 50, y: 50, zoom: 1 },
    children: ['baghdad', 'najaf', 'erbil', 'basra']
  },
  
  // --- PROVINCES (HUBS) ---
  'baghdad': {
    id: 'baghdad',
    level: 'province',
    name: 'Baghdad',
    subtitle: 'Metropolitan Capital',
    description: 'Dynamic heart of commerce and governance.',
    originalUrl: '',
    lat: 33.3152,
    lng: 44.3661,
    thumbnailUrl: 'https://i.pinimg.com/1200x/95/b4/23/95b4239fbe379384fe8c726728238b3d.jpg',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d53326.6917631!2d44.3661!3d33.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2siq!4v1705500000000',
    coords: { x: 57, y: 47, zoom: 6 },
    children: ['karadah', 'mansour']
  },
  'najaf': {
    id: 'najaf',
    level: 'province',
    name: 'Al-Najaf',
    subtitle: 'Spiritual Center',
    description: 'Major pilgrimage destination and regional hub.',
    originalUrl: '',
    lat: 31.9955,
    lng: 44.3944,
    thumbnailUrl: 'https://i.pinimg.com/1200x/ba/d1/6b/bad16b6ba3686c81c1a486dd44374a33.jpg',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27122.56!2d44.3944!3d31.9955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2siq!4v1705500000001',
    coords: { x: 57, y: 62, zoom: 6 },
    children: ['najaf_airport_reg']
  },
  'erbil': {
    id: 'erbil',
    level: 'province',
    name: 'Erbil',
    subtitle: 'Northern Gateway',
    description: 'Modern development hub in the Kurdistan region.',
    originalUrl: '',
    lat: 36.1877,
    lng: 44.0107,
    thumbnailUrl: 'https://i.pinimg.com/1200x/f1/c5/d8/f1c5d8e399c8c38d57a6e1f592ca216b.jpg',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25746.89!2d44.0107!3d36.1877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2siq!4v1705500000002',
    coords: { x: 54, y: 15, zoom: 15 },
    children: ['eskan_reg']
  },
  'basra': {
    id: 'basra',
    level: 'province',
    name: 'Basra',
    subtitle: 'Economic Port',
    description: 'Primary trade gateway connecting the regional economy.',
    originalUrl: '',
    lat: 30.5508,
    lng: 47.6760,
    thumbnailUrl: 'https://i.pinimg.com/736x/78/fc/fb/78fcfbea07595324ff390f3e6330d3ce.jpg',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d110531.0665!2d47.6760!3d30.5508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2siq!4v1705500000003',
    coords: { x: 87, y: 77, zoom: 6.5 },
    children: ['basra_airport_reg']
  },

  // --- REGIONS (TERMINAL NODES) ---
  'karadah': {
    id: 'karadah',
    level: 'region',
    name: 'Karadah Terminal',
    subtitle: 'exact location here',
    description: 'Strategic advertising node in the heart of Baghdad central district.',
    originalUrl: '',
    lat: 33.2989,
    lng: 44.4237,
    thumbnailUrl: 'https://i.pinimg.com/1200x/95/b4/23/95b4239fbe379384fe8c726728238b3d.jpg',
    coords: { x: 74, y: 72, zoom: 8 }, 
    ads: [
      { id: 'k1', title: 'street name here', imageUrl: 'https://i.pinimg.com/1200x/95/b4/23/95b4239fbe379384fe8c726728238b3d.jpg', description: 'Primary digital interface at Andalus crossing.' }
    ]
  },
  'mansour': {
    id: 'mansour',
    level: 'region',
    name: 'Al-Mansour Terminal',
    subtitle: 'exact location here',
    description: 'Prestigious commercial area in western Baghdad with multiple high-impact screens.',
    originalUrl: '',
    lat: 33.3153,
    lng: 44.3649,
    thumbnailUrl: 'https://i.pinimg.com/1200x/ba/d1/6b/bad16b6ba3686c81c1a486dd44374a33.jpg',
    coords: { x: 40, y: 52, zoom: 8 },
    ads: [
      { id: 'm1', title: 'street name here', imageUrl: 'https://i.pinimg.com/1200x/ba/d1/6b/bad16b6ba3686c81c1a486dd44374a33.jpg', description: 'Main boulevard digital billboard.' },
      { id: 'm2', title: 'street name here', imageUrl: 'https://i.pinimg.com/1200x/f1/c5/d8/f1c5d8e399c8c38d57a6e1f592ca216b.jpg', description: 'Overpass high-visibility screen.' }
    ]
  },
  'najaf_airport_reg': {
    id: 'najaf_airport_reg',
    level: 'region',
    name: 'Najaf Airport Terminal',
    subtitle: 'exact location here',
    description: 'Gateway for international arrivals with premium display assets.',
    originalUrl: '',
    lat: 31.9984,
    lng: 44.3914,
    thumbnailUrl: 'https://i.pinimg.com/736x/78/fc/fb/78fcfbea07595324ff390f3e6330d3ce.jpg',
    coords: { x: 50, y: 50, zoom: 8 },
    ads: [
      { id: 'n1', title: 'street name here', imageUrl: 'https://i.pinimg.com/736x/78/fc/fb/78fcfbea07595324ff390f3e6330d3ce.jpg', description: 'Primary arrival terminal screen.' }
    ]
  },
  'eskan_reg': {
    id: 'eskan_reg',
    level: 'region',
    name: 'Eskan Terminal',
    subtitle: 'exact location here',
    description: 'Vibrant commercial district hub in the heart of Erbil.',
    originalUrl: '',
    lat: 36.1877,
    lng: 44.0106,
    thumbnailUrl: 'https://i.pinimg.com/1200x/f1/c5/d8/f1c5d8e399c8c38d57a6e1f592ca216b.jpg',
    coords: { x: 50, y: 50, zoom: 8 },
    ads: [
      { id: 'e1', title: 'street name here', imageUrl: 'https://i.pinimg.com/1200x/f1/c5/d8/f1c5d8e399c8c38d57a6e1f592ca216b.jpg', description: 'Massive square-facing LED display.' }
    ]
  },
  'basra_airport_reg': {
    id: 'basra_airport_reg',
    level: 'region',
    name: 'Basra Airport Terminal',
    subtitle: 'exact location here',
    description: 'Logistical gateway for southern Iraq with strategic transit displays.',
    originalUrl: '',
    lat: 30.5499,
    lng: 47.6621,
    thumbnailUrl: 'https://i.pinimg.com/736x/78/fc/fb/78fcfbea07595324ff390f3e6330d3ce.jpg',
    coords: { x: 50, y: 50, zoom: 8 },
    ads: [
      { id: 'b1', title: 'street name here', imageUrl: 'https://i.pinimg.com/736x/78/fc/fb/78fcfbea07595324ff390f3e6330d3ce.jpg', description: 'Main entrance terminal advertising.' }
    ]
  }
};