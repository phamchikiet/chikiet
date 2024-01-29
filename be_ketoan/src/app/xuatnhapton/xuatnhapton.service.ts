import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { XuatnhaptonEntity } from './entities/xuatnhapton.entity';
@Injectable()
export class XuatnhaptonService {
  constructor(
    @InjectRepository(XuatnhaptonEntity)
    private XuatnhaptonRepository: Repository<XuatnhaptonEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.XuatnhaptonRepository.create(data);
      return await this.XuatnhaptonRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.XuatnhaptonRepository.find();
  }
  async findid(id: string) {
    return await this.XuatnhaptonRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.XuatnhaptonRepository.findOne({
      where: {
        SHD: data.SHD,
        Giaxuat:  Number(data.Giaxuat),
        Thang: Number(data.Thang),
        Soluong:  Number(data.Soluong),
        TenSP: data.TenSP,
      },
    });
  }
  async findslug(SHD: any) {
    return await this.XuatnhaptonRepository.findOne({
      where: { SHD: SHD },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.XuatnhaptonRepository.count();
    const xuatnhaptons = await this.XuatnhaptonRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: xuatnhaptons,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.XuatnhaptonRepository.createQueryBuilder('xuatnhapton');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('xuatnhapton.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('xuatnhapton.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.Thang) {
      queryBuilder.andWhere('xuatnhapton.Thang = :Thang', { Thang: `${params.Thang}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateXuatnhaptonDto: any) {
    this.XuatnhaptonRepository.save(UpdateXuatnhaptonDto);
    return await this.XuatnhaptonRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.XuatnhaptonRepository.delete(id);
    return { deleted: true };
  }
}
