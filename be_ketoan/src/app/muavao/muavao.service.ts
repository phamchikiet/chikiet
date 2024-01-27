import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { CreateMuavaoDto } from './dto/create-muavao.dto';
import { UpdateMuavaoDto } from './dto/update-muavao.dto';
import { MuavaoEntity } from './entities/muavao.entity';
@Injectable()
export class MuavaoService {
  constructor(
    @InjectRepository(MuavaoEntity)
    private MuavaoRepository: Repository<MuavaoEntity>
  ) {}
  async create(CreateMuavaoDto: any) {
    const item = await this.findSHD(CreateMuavaoDto)
    if(item)
    {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }
    else {
      this.MuavaoRepository.create(CreateMuavaoDto);
      return await this.MuavaoRepository.save(CreateMuavaoDto);
    }
  }

  async findAll() {
    return await this.MuavaoRepository.find();
  }
  async findid(id: string) {
    return await this.MuavaoRepository.findOne({
      where: { id: id },

    });
  }
  async findslug(slug: any) {
    return await this.MuavaoRepository.findOne({
      where: { Slug: slug},
    });
  }
  async findSHD(data: any) {
    return await this.MuavaoRepository.findOne({
      where: { 
        SHD: data.SHD
      },
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.MuavaoRepository.count();
    const muavaos = await this.MuavaoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: muavaos,
    };
  }
  async finddate(data:any){
    const startDate = new Date(data.begin);
    const endDate = new Date(data.end);
    console.error(startDate);
    console.error(endDate);
    
    return await this.MuavaoRepository.find({
      where:  {
        Ngaytao: Between(startDate, endDate),
      },
    });
  }
  async findQuery(params: any) {
    const queryBuilder = this.MuavaoRepository.createQueryBuilder('muavao');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('muavao.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('muavao.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.Thang) {
      queryBuilder.andWhere('muavao.Thang =:Thang', { Thang: `${params.Thang}` });
    }
    if (params.Type) {
      queryBuilder.andWhere('muavao.Type LIKE :Type', { Type: `${params.Type}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateMuavaoDto: UpdateMuavaoDto) {
    this.MuavaoRepository.save(UpdateMuavaoDto);
    return await this.MuavaoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.MuavaoRepository.delete(id);
    return { deleted: true };
  }
}
