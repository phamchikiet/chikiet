import { PartialType } from '@nestjs/mapped-types';
import { CreateMuasanphamDto } from './create-muasanpham.dto';

export class UpdateMuasanphamDto extends PartialType(CreateMuasanphamDto) {}
