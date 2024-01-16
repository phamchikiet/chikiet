import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateChitietDto } from './dto/create-chitiet.dto';
import { UpdateChitietDto } from './dto/update-chitiet.dto';
import { ChitietEntity } from './entities/chitiet.entity';
@Injectable()
export class ChitietService {
  constructor(
    @InjectRepository(ChitietEntity)
    private ChitietRepository: Repository<ChitietEntity>
  ) {}
  async create(CreateChitietDto: any) {
    console.log(CreateChitietDto);
    const item = await this.findSHD(CreateChitietDto)
    console.log(item);
    if (item) {
      return {res:"Trùng SHD"}
    }
    else {
      this.ChitietRepository.create(CreateChitietDto);
      return await this.ChitietRepository.save(CreateChitietDto);
    }
  }
  async findThang(data: any) {
    const items = await this.ChitietRepository.find({
      where: { 
        thang: data.thang,
        nam: data.nam,
        Loai:data.Loai
      },
    });
    const totalCount = items.length 
    return { items, totalCount };
  }
  // async findThang(params: any) {
  //   const queryBuilder = this.ChitietRepository.createQueryBuilder('chitiet');
  //     queryBuilder.andWhere('chitiet.thang BETWEEN :startDate AND :endDate', {
  //       startDate:"01",
  //       endDate:"11",
  //     });
  //     queryBuilder.andWhere('chitiet.nam = "2023"');
  //     queryBuilder.andWhere('chitiet.Loai = "Nhap"');
  //   const [items, totalCount] = await queryBuilder.getManyAndCount();
  // return { items, totalCount };
  // }
  // async findThang(data: any) {
  //   return await this.ChitietRepository.find({
  //     where: { 
  //       thang: data.thang,
  //       nam: data.nam,
  //       Loai:data.Loai
  //     },
  //   });
  // }
  async findAll() {
    return await this.ChitietRepository.find();
  }
  async findid(id: string) {
    return await this.ChitietRepository.findOne({
      where: { id: id },

    });
  }
  async findSHD(data: any) {
    return await this.ChitietRepository.findOne({
      where: { 
        idChitiet: data.idChitiet,
        Loai:data.Loai
      },
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.ChitietRepository.count();
    const chitiets = await this.ChitietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: chitiets,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.ChitietRepository.createQueryBuilder('chitiet');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('chitiet.CreateAt BETWEEN :startDate AND :endDate', {
        startDate:params.Batdau,
        endDate:params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('chitiet.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
    .limit(params.pageSize || 10) // Set a default page size if not provided
    .offset(params.pageNumber * params.pageSize || 0)
    .getManyAndCount();
  return { items, totalCount };
  }
  async update(id: string, UpdateChitietDto: UpdateChitietDto) {
    this.ChitietRepository.save(UpdateChitietDto);
    return await this.ChitietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.ChitietRepository.delete(id);
    return { deleted: true };
  }
}
