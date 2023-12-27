import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { CreateHoadonbanraDto } from './dto/create-hoadonbanra.dto';
import { UpdateHoadonbanraDto } from './dto/update-hoadonbanra.dto';
import { hoadonbanraEntity } from './entities/hoadonbanra.entity';
@Injectable()
export class hoadonbanraService {
  constructor(
    @InjectRepository(hoadonbanraEntity)
    private hoadonbanraRepository: Repository<hoadonbanraEntity>
  ) {}
  async create(Data: any) {
    const item = await this.findSHD(Data.SHD)
    console.error(item?.SHD);
    
    if(item)
    {
      return "Trùng SHD"
    }
    else {
      this.hoadonbanraRepository.create(Data);
      return await this.hoadonbanraRepository.save(Data);
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
  async finddate(begin: any, end: any){
    const startDate = new Date(begin);
    const endDate = new Date(end);
    return await this.hoadonbanraRepository.find({
      where:  {
        Ngaytao: Between(startDate, endDate),
      },
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
