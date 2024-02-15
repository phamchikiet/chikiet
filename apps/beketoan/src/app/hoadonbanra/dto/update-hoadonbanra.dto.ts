import { PartialType } from '@nestjs/mapped-types';
import { CreateHoadonbanraDto } from './create-hoadonbanra.dto';

export class UpdateHoadonbanraDto extends PartialType(CreateHoadonbanraDto) {}
