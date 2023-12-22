import { PartialType } from '@nestjs/mapped-types';
import { CreateMuavaochitietDto } from './create-muavaochitiet.dto';

export class UpdateMuavaochitietDto extends PartialType(CreateMuavaochitietDto) {}
