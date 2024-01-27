import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMuavaochitietDto } from './dto/create-muavaochitiet.dto';
import { UpdateMuavaochitietDto } from './dto/update-muavaochitiet.dto';
import { MuavaochitietEntity } from './entities/muavaochitiet.entity';
@Injectable()
export class MuavaochitietService {
  constructor(
    @InjectRepository(MuavaochitietEntity)
    private MuavaochitietRepository: Repository<MuavaochitietEntity>
  ) {}
  async create(data: any) {
    const item = await this.findSHD(data)
    if(item)
    {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }
    else {
      this.MuavaochitietRepository.create(data);
      return await this.MuavaochitietRepository.save(data);
    }

  }

  async findAll() {
    return await this.MuavaochitietRepository.find();
  }
  async findid(id: string) {
    return await this.MuavaochitietRepository.findOne({
      where: { id: id },

    });
  }
  async findslug(slug: any) {
    return await this.MuavaochitietRepository.findOne({
      where: { Slug: slug},
    });
  }
  async findSHD(data: any) {
    return await this.MuavaochitietRepository.findOne({
      where: { 
        SHD: data.SHD,
        Thang:data.Thang
      },
    });
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.MuavaochitietRepository.count();
    const muavaochitiets = await this.MuavaochitietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: muavaochitiets,
    };
  }
  async findQuery(params: any) {
    const queryBuilder = this.MuavaochitietRepository.createQueryBuilder('muavaochitiet');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('muavaochitiet.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('muavaochitiet.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.Thang) {
      queryBuilder.andWhere('muavaochitiet.Thang =:Thang', { Thang: `${params.Thang}` });
    }
    if (params.Type) {
      queryBuilder.andWhere('muavaochitiet.Type LIKE :Type', { Type: `${params.Type}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateMuavaochitietDto: UpdateMuavaochitietDto) {
    this.MuavaochitietRepository.save(UpdateMuavaochitietDto);
    return await this.MuavaochitietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.MuavaochitietRepository.delete(id);
    return { deleted: true };
  }
}
