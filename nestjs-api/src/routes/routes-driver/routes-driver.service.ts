import { Injectable } from '@nestjs/common';
import { ProcessDriverRouteDto } from './dto/process-driver-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {
  constructor(private readonly prismaService: PrismaService) {}

  processRoute(dto: ProcessDriverRouteDto) {
    return this.prismaService.routeDriver.upsert({
      include: {
        route: true,
      },
      where: { route_id: dto.route_id },
      create: {
        route_id: dto.route_id,
        points: {
          set: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat: dto.lat,
              lng: dto.lng,
            },
          },
        },
      },
    });
  }
}
