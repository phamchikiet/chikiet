import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { SanphamEntity } from './entities/sanpham.entity';
import { DanhmucService } from '../danhmuc/danhmuc.service';
@Injectable()
export class SanphamService {
  constructor(
    @InjectRepository(SanphamEntity)
    private SanphamRepository: Repository<SanphamEntity>,
    private _DanhmucService: DanhmucService
  ) {}
  async create(CreateSanphamDto: any) {
    this.SanphamRepository.create(CreateSanphamDto);
    return await this.SanphamRepository.save(CreateSanphamDto);
  }

  async findAll() {
    return await this.SanphamRepository.find();
  }
  async findid(id: string) {
    const Sanpham =  await this.SanphamRepository.findOne({where: { id: id }});
    const Danhmuc = await this._DanhmucService.findAll()
    Sanpham.Danhmuc = Danhmuc.find((v1:any)=>v1.id_cat ==Sanpham.id_cat)?.Title
    return Sanpham
  }
  async findslug(slug: any) {
    const Sanpham =  await this.SanphamRepository.findOne({where: { Slug: slug}});
    const Danhmuc = await this._DanhmucService.findAll()
    Sanpham.Danhmuc = Danhmuc.find((v1:any)=>v1.id_cat ==Sanpham.id_cat)?.Title
    return Sanpham
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
    if (params.hasOwnProperty('Danhmuc')) {
      const userIdsToFind = params.Danhmuc;
      //queryBuilder.andWhere(new In('sanpham.id_cat', params.Danhmuc));
      queryBuilder.where('sanpham.id_cat IN (:...userIdsToFind)', { userIdsToFind });
      // queryBuilder.andWhere('sanpham.Title LIKE :Title', { Title: `%${params.Query}%` })
      // .orWhere('sanpham.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      // .orWhere('sanpham.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.hasOwnProperty('Query')) {
      queryBuilder.andWhere('sanpham.Title LIKE :Title', { Title: `%${params.Query}%` })
      .orWhere('sanpham.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      .orWhere('sanpham.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('sanpham.CreateAt BETWEEN :startDate AND :endDate', {
        startDate:params.Batdau,
        endDate:params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('sanpham.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('sanpham.Slug LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    if (params.hasOwnProperty('Status')) {
      queryBuilder.andWhere('sanpham.Status = :Status', { Status: `${params.Status}` });
    }
    if (params.hasOwnProperty('CreateAt')) {
      queryBuilder.orderBy('sanpham.CreateAt', params.CreateAt);
    }
    const [items, totalCount] = await queryBuilder
    .limit(params.pageSize || 10) // Set a default page size if not provided
    .offset(params.pageNumber * params.pageSize || 0)
    .getManyAndCount();
    const Danhmuc = await this._DanhmucService.findAll()
    items.forEach((v)=>{
      v.Danhmuc = Danhmuc.find((v1:any)=>v1.id_cat ==v.id_cat)?.Title
    })
  return { items, totalCount };
  }
  async update(id: string, data: any) {
    console.log(id,data);
    
    this.SanphamRepository.save(data);
    return await this.SanphamRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.SanphamRepository.delete(id);
    return { deleted: true };
  }
}
