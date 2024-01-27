import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMuasanphamDto } from './dto/create-muasanpham.dto';
import { UpdateMuasanphamDto } from './dto/update-muasanpham.dto';
import { MuasanphamEntity } from './entities/muasanpham.entity';
@Injectable()
export class MuasanphamService {
  constructor(
    @InjectRepository(MuasanphamEntity)
    private MuasanphamRepository: Repository<MuasanphamEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.MuasanphamRepository.create(data);
      return await this.MuasanphamRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.MuasanphamRepository.find();
  }
  async findid(id: string) {
    return await this.MuasanphamRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.MuasanphamRepository.findOne({
      where: {
        SHD: data.SHD,
        Type: data.Type
      },
    });
  }
  async findslug(SHD: any) {
    return await this.MuasanphamRepository.findOne({
      where: { SHD: SHD },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.MuasanphamRepository.count();
    const muasanphams = await this.MuasanphamRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: muasanphams,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.MuasanphamRepository.createQueryBuilder('muasanpham');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('muasanpham.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('muasanpham.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateMuasanphamDto: UpdateMuasanphamDto) {
    this.MuasanphamRepository.save(UpdateMuasanphamDto);
    return await this.MuasanphamRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.MuasanphamRepository.delete(id);
    return { deleted: true };
  }
}
