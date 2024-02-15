import { PartialType } from '@nestjs/mapped-types';
import { CreateBanrachitietDto } from './create-banrachitiet.dto';

export class UpdateBanrachitietDto extends PartialType(CreateBanrachitietDto) {}
