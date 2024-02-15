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
    const item = await this.findSHD(Data)    
    if(item)
    {
      return { error: 1001, data: "Trùng Dữ Liệu" }
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
  async findSHD(data: any) {
    return await this.hoadonbanraRepository.findOne({
      where: { 
        SHD: data.SHD,
        Thang:data.Thang,
        Nam:data.Nam,
        Type:data.Type,
      },
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
  async findQuery(params: any) {
    const queryBuilder = this.hoadonbanraRepository.createQueryBuilder('hoadonbanra');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('hoadonbanra.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('hoadonbanra.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Thang')) {
      queryBuilder.andWhere('hoadonbanra.Thang =:Thang', { Thang: `${params.Thang}` });
    }
    if (params.hasOwnProperty('Nam')) {
      queryBuilder.andWhere('hoadonbanra.Nam =:Nam', { Nam: `${params.Nam}` });
    }
    if (params.Type) {
      queryBuilder.andWhere('hoadonbanra.Type LIKE :Type', { Type: `${params.Type}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
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
