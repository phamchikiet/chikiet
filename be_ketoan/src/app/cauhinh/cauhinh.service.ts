import { Injectable } from '@nestjs/common';
import { CreateCauhinhDto } from './dto/create-cauhinh.dto';
import { UpdateCauhinhDto } from './dto/update-cauhinh.dto';

@Injectable()
export class CauhinhService {
  create(createCauhinhDto: CreateCauhinhDto) {
    return 'This action adds a new cauhinh';
  }

  findAll() {
    return `This action returns all cauhinh`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cauhinh`;
  }

  update(id: number, updateCauhinhDto: UpdateCauhinhDto) {
    return `This action updates a #${id} cauhinh`;
  }

  remove(id: number) {
    return `This action removes a #${id} cauhinh`;
  }
}
