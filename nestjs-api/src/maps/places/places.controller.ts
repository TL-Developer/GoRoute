import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('v1/places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  findPlaces(@Query('text') text: string) {
    return this.placesService.findPlaces(text);
  }
}
