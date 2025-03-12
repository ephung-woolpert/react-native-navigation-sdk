import type { LatLng } from './LatLng';
import type { Location } from './Location';

export interface Route {
  legs?: Leg[];
  distanceMeters?: number;
  duration?: string;
  staticDuration?: string;
  polyline?: Polyline;
  description?: string;
  warnings?: string[];
  viewport?: Viewport;
  travelAdvisory: TravelAdvisory;
  localizedValues?: {
    distance: Distance;
    duration: Duration;
    staticDuration: Duration;
  };
  routeToken: string;
  routeLabels?: string[];
  polylineDetails?: PolylineDetails;
}

interface Leg {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: Polyline;
  startLocation: Location;
  endLocation: Location;
  steps: Step[];
  localizedValues: LocalizedValues;
}

interface Polyline {
  encodedPolyline: string;
}

interface Step {
  distanceMeters: number;
  staticDuration: string;
  polyline: Polyline;
  startLocation: Location;
  endLocation: Location;
  navigationInstruction: NavigationInstruction;
  localizedValues: LocalizedValues;
  travelMode: string;
}

interface NavigationInstruction {
  maneuver: string;
  instructions: string;
}

interface LocalizedValues {
  distance: Distance;
  staticDuration: Duration;
}

interface Distance {
  text: string;
}

interface Duration {
  text: string;
}

interface Viewport {
  low: LatLng;
  high: LatLng;
}

interface TravelAdvisory {
  routeRestrictionsPartiallyIgnored?: boolean;
}

interface PolylineDetails {}
