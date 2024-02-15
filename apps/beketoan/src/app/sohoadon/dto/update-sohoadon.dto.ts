import { PartialType } from '@nestjs/mapped-types';
import { CreateSohoadonDto } from './create-sohoadon.dto';

export class UpdateSohoadonDto extends PartialType(CreateSohoadonDto) {}
