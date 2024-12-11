import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { ResultResponse } from 'src/utils/Response/contract.response';
import { TDirectionsResult } from 'src/types/directions';

@Controller('v1/directions')
export class DirectionsController {
  constructor(private readonly directionService: DirectionsService) {}

  @Get()
  async getDirections(
    @Query('originId') originId: string,
    @Query('destinationid') destinationid: string,
  ) {
    const result = await this.directionService.getDirections(originId, destinationid);

    return new ResultResponse<TDirectionsResult>().success({
      message: 'Direção montada com sucesso',
      output: result,
    });
  }
}
