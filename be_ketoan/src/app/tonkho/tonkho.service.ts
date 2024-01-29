import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TonkhoEntity } from './entities/tonkho.entity';
@Injectable()
export class TonkhoService {
  constructor(
    @InjectRepository(TonkhoEntity)
    private TonkhoRepository: Repository<TonkhoEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.TonkhoRepository.create(data);
      return await this.TonkhoRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.TonkhoRepository.find();
  }
  async findid(id: string) {
    return await this.TonkhoRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.TonkhoRepository.findOne({
      where: {
        Thang: Number(data.Thang),
        Soluong:  Number(data.Soluong),
        TenSP: data.TenSP,
      },
    });
  }
  async findslug(SHD: any) {
    return await this.TonkhoRepository.findOne({
      where: { SHD: SHD },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.TonkhoRepository.count();
    const tonkhos = await this.TonkhoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: tonkhos,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.TonkhoRepository.createQueryBuilder('tonkho');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('tonkho.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('tonkho.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.Thang) {
      queryBuilder.andWhere('tonkho.Thang = :Thang', { Thang: `${params.Thang}` });
    }
    if (params.Nam) {
      queryBuilder.andWhere('tonkho.Nam = :Nam', { Nam: `${params.Nam}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateTonkhoDto: any) {
    this.TonkhoRepository.save(UpdateTonkhoDto);
    return await this.TonkhoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.TonkhoRepository.delete(id);
    return { deleted: true };
  }
}
