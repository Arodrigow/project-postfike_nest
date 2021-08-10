import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { DatabaseModule } from '../providers/database/database.module';
import { tagProvider } from '../providers/tag/tag.provider';
import { TagsRepository } from './repositories/implementations/tag.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [TagService, ...tagProvider, TagsRepository],
})
export class TagModule {}
