import { ImagesRepository } from './repositories/implementations/images.repository';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { S3 } from 'aws-sdk';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(
    private readonly configService: ConfigService,
    private repo: ImagesRepository,
  ) {}

  async uploadImages(images: Array<Express.Multer.File>) {
    const s3 = new S3();
    let image;

    for (const x in images) {
      const dataBuffer = images[x].buffer;
      const fileName = images[x].originalname;
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Body: dataBuffer,
          Key: `${uuidV4()}-${fileName}`,
        })
        .promise();
      image = await this.repo.create({
        key: uploadResult.Key,
        url: uploadResult.Location,
      });
    }

    return image;
  }
}
