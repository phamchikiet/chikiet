import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateHoadonhhpDto } from './dto/create-hoadonhhp.dto';
import { UpdateHoadonhhpDto } from './dto/update-hoadonhhp.dto';
import { HoadonhhpEntity } from './entities/hoadonhhp.entity';
@Injectable()
export class HoadonhhpService {
  constructor(
    @InjectRepository(HoadonhhpEntity)
    private HoadonhhpRepository: Repository<HoadonhhpEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.HoadonhhpRepository.create(data);
      return await this.HoadonhhpRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.HoadonhhpRepository.find();
  }
  async findid(id: string) {
    return await this.HoadonhhpRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.HoadonhhpRepository.findOne({
      where: {
        SHD: data.SHD,
        Thang: data.Thang,
        Type: data.Type
      },
    });
  }
  async findslug(SHD: any) {
    return await this.HoadonhhpRepository.findOne({
      where: { SHD: SHD },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.HoadonhhpRepository.count();
    const hoadonhhps = await this.HoadonhhpRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: hoadonhhps,
    };
  }
  async findQuery(params: any) {
    const queryBuilder = this.HoadonhhpRepository.createQueryBuilder('hoadonhhp');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('hoadonhhp.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('hoadonhhp.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.Thang) {
      queryBuilder.andWhere('hoadonhhp.Thang =:Thang', { Thang: `${params.Thang}` });
    }
    if (params.Type) {
      queryBuilder.andWhere('hoadonhhp.Type LIKE :Type', { Type: `${params.Type}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateHoadonhhpDto: UpdateHoadonhhpDto) {
    this.HoadonhhpRepository.save(UpdateHoadonhhpDto);
    return await this.HoadonhhpRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.HoadonhhpRepository.delete(id);
    return { deleted: true };
  }
}
