import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ResultResponse } from 'src/utils/Response/contract.response';
import { FindPlaceFromTextResponseData } from '@googlemaps/google-maps-services-js';

@Controller('v1/places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async findPlaces(@Query('text') text: string) {
    const result = await this.placesService.findPlaces(text);

    return new ResultResponse<FindPlaceFromTextResponseData>().success({
      message: 'Place ID encontrado com sucesso',
      output: result,
    });
  }
}
