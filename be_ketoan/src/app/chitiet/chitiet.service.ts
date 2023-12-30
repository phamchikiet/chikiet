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
    const item = await this.findSHD(CreateChitietDto.idChitiet)
    console.log(item);
    if (item) {
      return {res:"Trùng SHD"}
    }
    else {
      this.ChitietRepository.create(CreateChitietDto);
      return await this.ChitietRepository.save(CreateChitietDto);
    }
  }

  async findAll() {
    return await this.ChitietRepository.find();
  }
  async findid(id: string) {
    return await this.ChitietRepository.findOne({
      where: { id: id },

    });
  }
  async findSHD(idChitiet: any) {
    return await this.ChitietRepository.findOne({
      where: { idChitiet: idChitiet},
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