import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMuavaochitietDto } from './dto/create-muavaochitiet.dto';
import { UpdateMuavaochitietDto } from './dto/update-muavaochitiet.dto';
import { MuavaochitietEntity } from './entities/muavaochitiet.entity';
@Injectable()
export class MuavaochitietService {
  constructor(
    @InjectRepository(MuavaochitietEntity)
    private MuavaochitietRepository: Repository<MuavaochitietEntity>
  ) {}
  async create(CreateMuavaochitietDto: any) {
    const item = await this.findSHD(CreateMuavaochitietDto.SHD)
    if(item)
    {
      return "Trùng SHD"
    }
    else {
      this.MuavaochitietRepository.create(CreateMuavaochitietDto);
      return await this.MuavaochitietRepository.save(CreateMuavaochitietDto);
    }

  }

  async findAll() {
    return await this.MuavaochitietRepository.find();
  }
  async findid(id: string) {
    return await this.MuavaochitietRepository.findOne({
      where: { id: id },

    });
  }
  async findslug(slug: any) {
    return await this.MuavaochitietRepository.findOne({
      where: { Slug: slug},
    });
  }
  async findSHD(slug: any) {
    return await this.MuavaochitietRepository.findOne({
      where: { SHD: slug},
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.MuavaochitietRepository.count();
    const muavaochitiets = await this.MuavaochitietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: muavaochitiets,
    };
  }
  async findQuery(query: string){
    return await this.MuavaochitietRepository.find({
      where: { Title: Like(`%query%`) },
    });
  }
  async update(id: string, UpdateMuavaochitietDto: UpdateMuavaochitietDto) {
    this.MuavaochitietRepository.save(UpdateMuavaochitietDto);
    return await this.MuavaochitietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.MuavaochitietRepository.delete(id);
    return { deleted: true };
  }
}
