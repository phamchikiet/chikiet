import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';
import { BaivietEntity } from './entities/baiviet.entity';
@Injectable()
export class BaivietService {
  constructor(
    @InjectRepository(BaivietEntity)
    private BaivietRepository: Repository<BaivietEntity>
  ) { }
  async create(data: any) {
    const check = await this.findslug(data.slug)
    if(!check) {
      this.BaivietRepository.create(data);
      return await this.BaivietRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.BaivietRepository.find();
  }
  async findid(id: string) {
    return await this.BaivietRepository.findOne({ where: { id: id } });
  }
  // async findSHD(data: any) {
  //   return await this.BaivietRepository.findOne({
  //     where: {
  //       SHD: data.SHD,
  //       Type: data.Type
  //     },
  //   });
  // }
  async findslug(slug: any) {
    return await this.BaivietRepository.findOne({
      where: { Slug: slug },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.BaivietRepository.count();
    const baiviets = await this.BaivietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: baiviets,
    };
  }
  async findQuery(params: any) {
    const queryBuilder = this.BaivietRepository.createQueryBuilder('baiviet');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('baiviet.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('baiviet.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateBaivietDto: UpdateBaivietDto) {
    this.BaivietRepository.save(UpdateBaivietDto);
    return await this.BaivietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.BaivietRepository.delete(id);
    return { deleted: true };
  }
}
