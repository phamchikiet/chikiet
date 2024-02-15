import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {HoadonhhpService } from './hoadonhhp.service';
import { CreateHoadonhhpDto } from './dto/create-hoadonhhp.dto';
import { UpdateHoadonhhpDto } from './dto/update-hoadonhhp.dto';
@Controller('hoadonhhp')
export class HoadonhhpController {
  constructor(private readonly hoadonhhpService:HoadonhhpService) {}

  @Post()
  create(@Body() createHoadonhhpDto: CreateHoadonhhpDto) {
    return this.hoadonhhpService.create(createHoadonhhpDto);
  }
  @Get()
  async findAll() {
    return await this.hoadonhhpService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.hoadonhhpService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.hoadonhhpService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.hoadonhhpService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.hoadonhhpService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoadonhhpDto: UpdateHoadonhhpDto) {
    return this.hoadonhhpService.update(id, updateHoadonhhpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoadonhhpService.remove(id);
  }
}