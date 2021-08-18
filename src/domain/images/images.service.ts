import { DeleteImageException } from './../../shared/errors/deleteImage.exception';
import { UploadImageException } from './../../shared/errors/uploadImage.exception';
import { Images } from './entities/images.entity';
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

  async uploadImages(images: Array<Express.Multer.File>): Promise<Images[]> {
    const s3 = new S3();
    const imgs: Images[] = [];
    for (const x in images) {
      const dataBuffer = images[x].buffer;
      const fileName = images[x].originalname;
      try {
        const uploadResult = await s3
          .upload({
            Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${uuidV4()}-${fileName}`,
          })
          .promise();
        imgs[x] = await this.repo.create({
          key: uploadResult.Key,
          url: uploadResult.Location,
        });
      } catch (e) {
        throw new UploadImageException();
      }
    }
    return imgs;
  }

  async deleteImage(imageId: string) {
    const img = await this.repo.find(imageId);

    try {
      const s3 = new S3();
      await s3
        .deleteObject({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Key: img.key,
        })
        .promise();
      await this.repo.delete(imageId);
    } catch (e) {
      throw new DeleteImageException();
    }
  }
}
