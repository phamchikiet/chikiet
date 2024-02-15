import { PartialType } from '@nestjs/mapped-types';
import { CreateMuavaoDto } from './create-muavao.dto';

export class UpdateMuavaoDto extends PartialType(CreateMuavaoDto) {}
