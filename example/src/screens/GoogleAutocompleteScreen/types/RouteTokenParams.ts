import type { Location } from './Location';

interface RouteModifiers {
  vehicleInfo: VehicleInfo;
  avoidTolls: boolean;
  avoidHighways: boolean;
  avoidFerries: boolean;
}

interface VehicleInfo {
  totalAxleCount: number;
  totalHeightMm: number;
  totalLengthMm: number;
  totalWidthMm: number;
  totalWeightKg: number;
  trailerInfo: TrailerInfo;
}

interface TrailerInfo {
  lengthMm: number;
}

export interface RouteTokenParams {
  origin: {
    location: Location;
  };
  destination: {
    location: Location;
  };
  travelMode: 'TRUCK';
  routingPreference: string;
  routeModifiers: RouteModifiers;
  computeAlternativeRoutes: boolean;
  languageCode: 'en-US';
  units: 'IMPERIAL';
}
