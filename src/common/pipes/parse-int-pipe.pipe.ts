import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const integerValue = parseInt(value, 10);
    if (isNaN(integerValue)) {
      throw new BadRequestException(`${value} n'est pas un nombre !`);
    }
    return value;
  }
}
