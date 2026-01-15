
export interface AdScreen {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

export interface MapCoords {
  x: number; // percentage from left (for terrain map)
  y: number; // percentage from top (for terrain map)
  zoom: number; // scale factor
}

export interface LocationData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  originalUrl: string;
  lat: number;
  lng: number;
  thumbnailUrl?: string; // Main display image for the pin
  embedUrl?: string;
  children?: string[]; 
  ads?: AdScreen[];    
  level: 'country' | 'province' | 'region';
  coords: MapCoords; // Normalized coordinates for the static terrain map
}

export type LocationId = string;
