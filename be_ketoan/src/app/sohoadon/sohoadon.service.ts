import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateSohoadonDto } from './dto/create-sohoadon.dto';
import { UpdateSohoadonDto } from './dto/update-sohoadon.dto';
import { SohoadonEntity } from './entities/sohoadon.entity';
@Injectable()
export class SohoadonService {
  constructor(
    @InjectRepository(SohoadonEntity)
    private SohoadonRepository: Repository<SohoadonEntity>
  ) { }
  async create(CreateSohoadonDto: any) {
    console.log(CreateSohoadonDto);
    
    const item = await this.findSHD(CreateSohoadonDto.shdon)
    console.log(item);
    
    if (item) {
      return {res:"Trùng SHD"}
    }
    else {
      this.SohoadonRepository.create(CreateSohoadonDto);
      return await this.SohoadonRepository.save(CreateSohoadonDto);
    }
  }

  async findAll() {
    return await this.SohoadonRepository.find();
  }
  async findSHD(shdon: any) {
    return await this.SohoadonRepository.findOne({
      where: { shdon: shdon },
    });
  }
  async findid(id: string) {
    return await this.SohoadonRepository.findOne({
      where: { id: id },

    });
  }
  async findThang(thang: any) {
    return await this.SohoadonRepository.find({
      where: { thang: thang },

    });
  }
  async findslug(shdon: any) {
    return await this.SohoadonRepository.findOne({
      where: { shdon: shdon },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.SohoadonRepository.count();
    const sohoadons = await this.SohoadonRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: sohoadons,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.SohoadonRepository.createQueryBuilder('sohoadon');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('sohoadon.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('sohoadon.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateSohoadonDto: UpdateSohoadonDto) {
    this.SohoadonRepository.save(UpdateSohoadonDto);
    return await this.SohoadonRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.SohoadonRepository.delete(id);
    return { deleted: true };
  }
}

