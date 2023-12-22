import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateHoadonbanraDto } from './dto/create-hoadonbanra.dto';
import { UpdateHoadonbanraDto } from './dto/update-hoadonbanra.dto';
import { hoadonbanraEntity } from './entities/hoadonbanra.entity';
@Injectable()
export class hoadonbanraService {
  constructor(
    @InjectRepository(hoadonbanraEntity)
    private hoadonbanraRepository: Repository<hoadonbanraEntity>
  ) {}
  async create(CreatehoadonbanraDto: any) {
    const item = await this.findSHD(CreatehoadonbanraDto.SHD)
    if(item)
    {
      return "Trùng SHD"
    }
    else {
      this.hoadonbanraRepository.create(CreatehoadonbanraDto);
      return await this.hoadonbanraRepository.save(CreatehoadonbanraDto);
    }
  }

  async findAll() {
    return await this.hoadonbanraRepository.find();
  }
  async findid(id: string) {
    return await this.hoadonbanraRepository.findOne({
      where: { id: id },

    });
  }
  async findslug(slug: any) {
    return await this.hoadonbanraRepository.findOne({
      where: { Slug: slug},
    });
  }
  async findSHD(slug: any) {
    return await this.hoadonbanraRepository.findOne({
      where: { SHD: slug},
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.hoadonbanraRepository.count();
    const hoadonbanras = await this.hoadonbanraRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: hoadonbanras,
    };
  }
  async findQuery(query: string){
    return await this.hoadonbanraRepository.find({
      where: { Title: Like(`%query%`) },
    });
  }
  async update(id: string, UpdatehoadonbanraDto: UpdateHoadonbanraDto) {
    this.hoadonbanraRepository.save(UpdatehoadonbanraDto);
    return await this.hoadonbanraRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.hoadonbanraRepository.delete(id);
    return { deleted: true };
  }
}
