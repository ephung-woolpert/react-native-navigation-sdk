import Config from 'react-native-config';
import type { Route } from '../types/Route';
import type { RouteTokenParams } from '../types/RouteTokenParams';

const createRequestURL = (
  url: string,
  params: Record<string, string | number | boolean | object>
): string => {
  let resultUrl = url;
  Object.entries(params).forEach(([key, value], index) => {
    resultUrl += `${index === 0 ? '?' : '&'}${key}=${value}`;
  });
  return resultUrl;
};

const API_KEY = Config.MAPS_API_KEY;
if (!API_KEY) {
  throw new Error('[GoogleRoutesApi] API_KEY is not set');
}

type ApiResponse<T> = T;

// https://routes.googleapis.com/directions/v2:computeRoutes?key=XXXXXX
const fetchGoogleRoutesApi = <T, B>(
  endpoint: string,
  body?: B,
  method: 'POST' | 'GET' = 'POST',
  headers?: Record<string, string>
): Promise<ApiResponse<T>> => {
  const url = createRequestURL(`https://routes.googleapis.com/${endpoint}`, {
    key: API_KEY,
  });
  return fetch(url, {
    method: method,
    headers,
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(`Failed to fetch data from Google Routes API: ${error}`);
    });
};

const generateRoutes = ({
  origin,
  destination,
}: {
  origin: RouteTokenParams['origin'];
  destination: RouteTokenParams['destination'];
}) => {
  return fetchGoogleRoutesApi<
    {
      routes: Route[];
    },
    RouteTokenParams
  >(
    'directions/v2:computeRoutes',
    {
      origin,
      destination,
      travelMode: 'TRUCK',
      routingPreference: 'TRAFFIC_AWARE_OPTIMAL',
      routeModifiers: {
        vehicleInfo: {
          totalAxleCount: 5,
          totalHeightMm: 4114,
          totalLengthMm: 21945,
          totalWidthMm: 2590,
          totalWeightKg: 32658,
          trailerInfo: {
            lengthMm: 16154,
          },
        },
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      computeAlternativeRoutes: false,
      languageCode: 'en-US',
      units: 'IMPERIAL',
    },
    'POST',
    {
      'X-Goog-FieldMask': 'routes.routeToken,routes.travelAdvisory',
      // 'X-Goog-FieldMask': 'routes',
    }
  )
    .then(response => response)
    .catch(error => {
      throw new Error(`Failed to generate route token: ${error}`);
    });
};

const GoogleRoutesApi = {
  generateRoutes,
};

// // Testing: Example usage to generate a route token
// GoogleRoutesApi.generateRoutes({
//   origin: {
//     location: {
//       latLng: {
//         latitude: 41.82999557797065,
//         longitude: -87.6650479101103,
//       },
//     },
//   },
//   destination: {
//     location: {
//       latLng: {
//         latitude: 41.66217983799244,
//         longitude: -87.4769040416346,
//       },
//     },
//   },
// })
//   .then(resp => {
//     console.debug(
//       '[GoogleRoutesApi] createRouteToken resp:',
//       JSON.stringify(resp, null, 2)
//     );
//   })
//   .catch(error => {
//     console.error('[GoogleRoutesApi] createRouteToken error:', error);
//   });

export default GoogleRoutesApi;
