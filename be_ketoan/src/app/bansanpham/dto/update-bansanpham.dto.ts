import { PartialType } from '@nestjs/mapped-types';
import { CreateBansanphamDto } from './create-bansanpham.dto';

export class UpdateBansanphamDto extends PartialType(CreateBansanphamDto) {}
