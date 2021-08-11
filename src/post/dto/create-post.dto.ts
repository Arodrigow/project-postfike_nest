export class CreatePostDto {
  title: string;
  description: string;
  details?: string;
  expiration?: Date;
}
