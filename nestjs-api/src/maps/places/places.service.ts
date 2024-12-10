import { Injectable } from '@nestjs/common';
import {
  FindPlaceFromTextResponseData,
  Client as GoogleMapsClient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js/';
import { ConfigService } from '@nestjs/config';
import { ResultResponse } from 'src/utils/Response/contract.response';

@Injectable()
export class PlacesService {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}

  async findPlaces(text: string) {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    return new ResultResponse<FindPlaceFromTextResponseData>().success({
      message: 'Place ID encontrado com sucesso',
      output: data,
    });
  }
}