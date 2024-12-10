import {
  DirectionsResponseData,
  LatLng,
  TravelMode,
} from '@googlemaps/google-maps-services-js';

export type TDirectionsResult = DirectionsResponseData & {
  request: {
    origin: {
      place_id: LatLng;
      location: {
        lat: number;
        lng: number;
      };
    };
    destination: {
      place_id: LatLng;
      location: {
        lat: number;
        lng: number;
      };
    };
    mode: TravelMode;
  };
};
