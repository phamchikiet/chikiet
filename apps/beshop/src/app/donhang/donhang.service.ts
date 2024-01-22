import { Injectable } from '@nestjs/common';
import { CreateDonhangDto } from './dto/create-donhang.dto';
import { UpdateDonhangDto } from './dto/update-donhang.dto';

@Injectable()
export class DonhangService {
  create(createDonhangDto: CreateDonhangDto) {
    return 'This action adds a new donhang';
  }

  findAll() {
    return `This action returns all donhang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donhang`;
  }

  update(id: number, updateDonhangDto: UpdateDonhangDto) {
    return `This action updates a #${id} donhang`;
  }

  remove(id: number) {
    return `This action removes a #${id} donhang`;
  }
}
