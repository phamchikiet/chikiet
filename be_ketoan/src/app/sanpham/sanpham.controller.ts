import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {SanphamService } from './sanpham.service';
import { CreateSanphamDto } from './dto/create-sanpham.dto';
import { UpdateSanphamDto } from './dto/update-sanpham.dto';
@Controller('sanpham')
export class SanphamController {
  constructor(private readonly sanphamService:SanphamService) {}

  @Post()
  create(@Body() createSanphamDto: CreateSanphamDto) {
    return this.sanphamService.create(createSanphamDto);
  }
  @Post('chung')
  createchung(@Body() data: any) {
    return this.sanphamService.createchung(data);
  }
  @Get()
  async findAll() {
    return await this.sanphamService.findAll();
  }
  @Get('chung')
  async findAllchung() {
    return await this.sanphamService.findAllchung();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.sanphamService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.sanphamService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.sanphamService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.sanphamService.findQuery(SearchParams);
  }
  @Post('searchchung')
    async findQuerychung(@Body() SearchParams: any){
      return await this.sanphamService.findQuerychung(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSanphamDto: UpdateSanphamDto) {
    return this.sanphamService.update(id, updateSanphamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanphamService.remove(id);
  }
}