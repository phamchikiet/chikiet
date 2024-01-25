import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDonhangDto } from './dto/create-donhang.dto';
import { UpdateDonhangDto } from './dto/update-donhang.dto';
import { DonhangEntity } from './entities/donhang.entity';
import { GiohangService } from '../giohang/giohang.service';
import { KhachhangService } from '../khachhang/khachhang.service';
@Injectable()
export class DonhangService {
  constructor(
    @InjectRepository(DonhangEntity)
    private DonhangRepository: Repository<DonhangEntity>,
    private _GiohangService: GiohangService,
    private _KhachhangService: KhachhangService,
  ) { }
  async create(data: any) {
    const Khachhang = await this._KhachhangService.create(data.Khachhang)
    const InitGiohang:any ={}  
    InitGiohang.idKH = Khachhang.id
    InitGiohang.Total =data.Giohangs.reduce((acc: any, item: any) => acc + item.Soluong * item.Giachon?.gia, 0) || 0;
    InitGiohang.Sanpham = data.Giohangs
    InitGiohang.Khachhang = data.Khachhang
    const Giohang = await this._GiohangService.create(InitGiohang)
    delete data.Giohangs
    delete data.Khachhang
    const Donhang:any=data
    Donhang.idKH = Khachhang.id
    Donhang.idGiohang = Giohang.id
    this.DonhangRepository.create(Donhang);
    return await this.DonhangRepository.save(Donhang);
    //return { error: 1001, data: "Trùng Dữ Liệu" }
    // const check = await this.findSHD(data)
    // if(!check) {
    //   this.DonhangRepository.create(data);
    //   return await this.DonhangRepository.save(data);
    // }
    // else {
    //   return { error: 1001, data: "Trùng Dữ Liệu" }
    // }

  }

  async findAll() {
    return await this.DonhangRepository.find();
  }
  async findid(id: string) {
    return await this.DonhangRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.DonhangRepository.findOne({
      where: {
        Type: data.Type
      },
    });
  }
  async findslug(SHD: any) {
    return await this.DonhangRepository.findOne({
      where: { Status: SHD },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.DonhangRepository.count();
    const donhangs = await this.DonhangRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: donhangs,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.DonhangRepository.createQueryBuilder('donhang');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('donhang.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('donhang.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateDonhangDto: UpdateDonhangDto) {
    this.DonhangRepository.save(UpdateDonhangDto);
    return await this.DonhangRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.DonhangRepository.delete(id);
    return { deleted: true };
  }
}
