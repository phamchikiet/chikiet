import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {MuasanphamService } from './muasanpham.service';
import { CreateMuasanphamDto } from './dto/create-muasanpham.dto';
import { UpdateMuasanphamDto } from './dto/update-muasanpham.dto';
@Controller('muasanpham')
export class MuasanphamController {
  constructor(private readonly muasanphamService:MuasanphamService) {}

  @Post()
  create(@Body() createMuasanphamDto: CreateMuasanphamDto) {
    return this.muasanphamService.create(createMuasanphamDto);
  }
  @Get()
  async findAll() {
    return await this.muasanphamService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.muasanphamService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.muasanphamService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.muasanphamService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.muasanphamService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuasanphamDto: UpdateMuasanphamDto) {
    return this.muasanphamService.update(id, updateMuasanphamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.muasanphamService.remove(id);
  }
}