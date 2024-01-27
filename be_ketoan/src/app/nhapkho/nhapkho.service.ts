import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { NhapkhoEntity } from './entities/nhapkho.entity';
@Injectable()
export class NhapkhoService {
  constructor(
    @InjectRepository(NhapkhoEntity)
    private NhapkhoRepository: Repository<NhapkhoEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.NhapkhoRepository.create(data);
      return await this.NhapkhoRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.NhapkhoRepository.find();
  }
  async findid(id: string) {
    return await this.NhapkhoRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.NhapkhoRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.NhapkhoRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.NhapkhoRepository.count();
    const nhapkhos = await this.NhapkhoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: nhapkhos,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.NhapkhoRepository.createQueryBuilder('nhapkho');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('nhapkho.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('nhapkho.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateNhapkhoDto: any) {
    this.NhapkhoRepository.save(UpdateNhapkhoDto);
    return await this.NhapkhoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.NhapkhoRepository.delete(id);
    return { deleted: true };
  }
}
