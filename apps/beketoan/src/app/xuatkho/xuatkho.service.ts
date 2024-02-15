import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { XuatkhoEntity } from './entities/xuatkho.entity';
@Injectable()
export class XuatkhoService {
  constructor(
    @InjectRepository(XuatkhoEntity)
    private XuatkhoRepository: Repository<XuatkhoEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.XuatkhoRepository.create(data);
      return await this.XuatkhoRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.XuatkhoRepository.find();
  }
  async findid(id: string) {
    return await this.XuatkhoRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.XuatkhoRepository.findOne({
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
    return await this.XuatkhoRepository.findOne({
      where: { SHD: SHD },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.XuatkhoRepository.count();
    const xuatkhos = await this.XuatkhoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: xuatkhos,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.XuatkhoRepository.createQueryBuilder('xuatkho');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('xuatkho.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('xuatkho.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Thang')) {
      queryBuilder.andWhere('xuatkho.Thang =:Thang', { Thang: `${params.Thang}` });
    }
    if (params.hasOwnProperty('Nam')) {
      queryBuilder.andWhere('xuatkho.Nam =:Nam', { Nam: `${params.Nam}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async findtensp(TenSP: any) {
    const queryBuilder = this.XuatkhoRepository.createQueryBuilder('xuatkho');
      queryBuilder.andWhere('xuatkho.TenSP LIKE :TenSP', { TenSP: `%${TenSP}%` });
      const [items, totalCount] =await queryBuilder.getManyAndCount();
      const Soluong = items.reduce((total:any, item:any) => total + Number(item.Soluong), 0);
      const Tongcong = items.reduce((total:any, item:any) => total + Number(item.Tongtien), 0);

    return {items, totalCount,Soluong,Tongcong}
  }
  async update(id: string, UpdateXuatkhoDto: any) {
    this.XuatkhoRepository.save(UpdateXuatkhoDto);
    return await this.XuatkhoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.XuatkhoRepository.delete(id);
    return { deleted: true };
  }
}
