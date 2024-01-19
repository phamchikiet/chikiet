import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SanphamEntity } from './entities/sanpham.entity';
@Injectable()
export class SanphamService {
  constructor(
    @InjectRepository(SanphamEntity)
    private SanphamRepository: Repository<SanphamEntity>
  ) {}
  async create(CreateSanphamDto: any) {
    this.SanphamRepository.create(CreateSanphamDto);
    return await this.SanphamRepository.save(CreateSanphamDto);
  }

  async findAll() {
    return await this.SanphamRepository.find();
  }
  async findid(id: string) {
    return await this.SanphamRepository.findOne({
      where: { id: id },

    });
  }
  async findslug(slug: any) {
    return await this.SanphamRepository.findOne({
      where: { Slug: slug},
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.SanphamRepository.count();
    const sanphams = await this.SanphamRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: sanphams,
    };
  }
  async findQuery(params: any) {
    const queryBuilder = this.SanphamRepository.createQueryBuilder('sanpham');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('sanpham.CreateAt BETWEEN :startDate AND :endDate', {
        startDate:params.Batdau,
        endDate:params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('sanpham.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.Slug) {
      queryBuilder.andWhere('sanpham.Slug LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    const [items, totalCount] = await queryBuilder
    .limit(params.pageSize || 10) // Set a default page size if not provided
    .offset(params.pageNumber * params.pageSize || 0)
    .getManyAndCount();
  return { items, totalCount };
  }
  async update(id: string, UpdateSanphamDto: any) {
    this.SanphamRepository.save(UpdateSanphamDto);
    return await this.SanphamRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.SanphamRepository.delete(id);
    return { deleted: true };
  }
}
