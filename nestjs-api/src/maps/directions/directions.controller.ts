import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('v1/directions')
export class DirectionsController {
  constructor(private readonly directionService: DirectionsService) {}

  @Get()
  getDirections(
    @Query('originId') originId: string,
    @Query('destinationid') destinationid: string,
  ) {
    return this.directionService.getDirections(originId, destinationid);
  }
}
