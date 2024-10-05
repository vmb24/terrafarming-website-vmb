declare module 'leaflet' {
    export interface IconOptions {
      shadowUrl?: string;
      iconRetinaUrl?: string;
      iconUrl?: string;
      iconSize?: Point;
      iconAnchor?: Point;
      popupAnchor?: Point;
      tooltipAnchor?: Point;
      shadowSize?: Point;
    }

    export function icon(arg0: { iconRetinaUrl: string; iconUrl: string; shadowUrl: string; iconSize: number[]; iconAnchor: number[]; popupAnchor: number[]; tooltipAnchor: number[]; shadowSize: number[]; }) {
        throw new Error('Function not implemented.');
    }
  }