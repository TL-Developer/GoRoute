import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { ResultResponse } from 'src/utils/Response/contract.response';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
// import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('v1/routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
    private routesDriverService: RoutesDriverService,
  ) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Post(':id/process-route')
  processRoute(
    @Param('id') id: string,
    @Body() payload: { lat: number; lng: number },
  ) {
    return this.routesDriverService.processRoute({
      route_id: id,
      lat: payload.lat,
      lng: payload.lng,
    });
  }

  @Post(':id/start')
  startRoute(@Param('id') id: string) {
    return this.routesService.startRoute(id);
  }

  @Get()
  async findAll() {
    const result = await this.routesService.findAll();

    return new ResultResponse<any>().success({
      message: 'Rotas geradas com sucesso',
      output: result,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.routesService.findOne(id);

    return new ResultResponse<any>().success({
      message: 'Rotas geradas com sucesso',
      output: result,
    });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
  //   return this.routesService.update(+id, updateRouteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.routesService.remove(+id);
  // }
}
