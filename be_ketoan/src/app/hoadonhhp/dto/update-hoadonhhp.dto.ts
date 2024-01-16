import { PartialType } from '@nestjs/mapped-types';
import { CreateHoadonhhpDto } from './create-hoadonhhp.dto';

export class UpdateHoadonhhpDto extends PartialType(CreateHoadonhhpDto) {}
