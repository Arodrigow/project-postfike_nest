import { ImagesRepository } from './repositories/implementations/images.repository';
import { imagesProvider } from './../../providers/images/images.provider';
import { DatabaseModule } from './../../providers/database/database.module';
import { ImagesService } from './images.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ImagesService, ...imagesProvider, ImagesRepository],
})
export class ImagesModule {}
