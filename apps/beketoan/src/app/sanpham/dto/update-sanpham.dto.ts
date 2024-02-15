import { PartialType } from '@nestjs/mapped-types';
import { CreateSanphamDto } from './create-sanpham.dto';

export class UpdateSanphamDto extends PartialType(CreateSanphamDto) {}
