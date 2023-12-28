import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBanrachitietDto } from './dto/create-banrachitiet.dto';
import { UpdateBanrachitietDto } from './dto/update-banrachitiet.dto';
import { BanrachitietEntity } from './entities/banrachitiet.entity';
@Injectable()
export class BanrachitietService {
  constructor(
    @InjectRepository(BanrachitietEntity)
    private BanrachitietRepository: Repository<BanrachitietEntity>
  ) {}
  async create(data: any) {
    const item = await this.findSHD(data)
    if(item)
    {
      return "Trùng SHD"
    }
    else {
      this.BanrachitietRepository.create(data);
      return await this.BanrachitietRepository.save(data);
    }
  }
  async findAll() {
    return await this.BanrachitietRepository.find();
  }
  async findid(id: string) {
    return await this.BanrachitietRepository.findOne({
      where: { id: id },

    });
  }
  async findslug(slug: any) {
    return await this.BanrachitietRepository.findOne({
      where: { Slug: slug},
    });
  }
  async findSHD(data: any) {
    return await this.BanrachitietRepository.findOne({
      where: { 
        SHD: data.SHD,
        Ngaytao:new Date(data.Ngaytao)
      },
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.BanrachitietRepository.count();
    const banrachitiets = await this.BanrachitietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: banrachitiets,
    };
  }
  async findQuery(query: string){
    return await this.BanrachitietRepository.find({
      where: { Title: Like(`%query%`) },
    });
  }
  async update(id: string, UpdateBanrachitietDto: UpdateBanrachitietDto) {
    this.BanrachitietRepository.save(UpdateBanrachitietDto);
    return await this.BanrachitietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.BanrachitietRepository.delete(id);
    return { deleted: true };
  }
}
