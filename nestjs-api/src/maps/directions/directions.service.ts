import { Injectable } from '@nestjs/common';
import {
  DirectionsRequest,
  Client as GoogleMapsClient,
  TravelMode,
} from '@googlemaps/google-maps-services-js/';
import { ConfigService } from '@nestjs/config';
import { ResultResponse } from 'src/utils/Response/contract.response';
import { TDirectionsResult } from 'src/types/directions';

@Injectable()
export class DirectionsService {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}

  async getDirections(originId: string, destinationId: string) {
    const params: DirectionsRequest['params'] = {
      origin: `place_id:${originId}`,
      destination: `place_id:${destinationId}`,
      mode: TravelMode.driving,
      key: this.configService.get('GOOGLE_MAPS_API_KEY'),
    };

    const { data } = await this.googleMapsClient.directions({
      params,
    });

    return new ResultResponse<TDirectionsResult>().success({
      message: 'Direção montada com sucesso',
      output: {
        ...data,
        request: {
          origin: {
            place_id: params.origin,
            location: {
              lat: data.routes[0].legs[0].start_location.lat,
              lng: data.routes[0].legs[0].start_location.lng,
            },
          },
          destination: {
            place_id: params.destination,
            location: {
              lat: data.routes[0].legs[0].end_location.lat,
              lng: data.routes[0].legs[0].end_location.lng,
            },
          },
          mode: params.mode,
        },
      },
    });
  }
}
