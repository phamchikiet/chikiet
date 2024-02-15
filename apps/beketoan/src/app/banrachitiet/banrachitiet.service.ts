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
      return { error: 1001, data: "Trùng Dữ Liệu" }
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
        Thang:data.Thang,
        Nam:data.Nam,
        Type:data.Type,
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
  async findQuery(params: any) {
    const queryBuilder = this.BanrachitietRepository.createQueryBuilder('banrachitiet');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('banrachitiet.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('banrachitiet.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Thang')) {
      queryBuilder.andWhere('banrachitiet.Thang =:Thang', { Thang: `${params.Thang}` });
    }
    if (params.hasOwnProperty('Nam')) {
      queryBuilder.andWhere('banrachitiet.Nam =:Nam', { Nam: `${params.Nam}` });
    }
    if (params.Type) {
      queryBuilder.andWhere('banrachitiet.Type LIKE :Type', { Type: `${params.Type}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
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
