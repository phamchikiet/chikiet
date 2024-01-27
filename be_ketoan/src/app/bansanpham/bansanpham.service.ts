import { Injectable } from '@nestjs/common';
import { CreateBansanphamDto } from './dto/create-bansanpham.dto';
import { UpdateBansanphamDto } from './dto/update-bansanpham.dto';

@Injectable()
export class BansanphamService {
  create(createBansanphamDto: CreateBansanphamDto) {
    return 'This action adds a new bansanpham';
  }

  findAll() {
    return `This action returns all bansanpham`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bansanpham`;
  }

  update(id: number, updateBansanphamDto: UpdateBansanphamDto) {
    return `This action updates a #${id} bansanpham`;
  }

  remove(id: number) {
    return `This action removes a #${id} bansanpham`;
  }
}
