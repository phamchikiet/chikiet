import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {DonhangService } from './donhang.service';
import { CreateDonhangDto } from './dto/create-donhang.dto';
import { UpdateDonhangDto } from './dto/update-donhang.dto';
@Controller('donhang')
export class DonhangController {
  constructor(private readonly donhangService:DonhangService) {}

  @Post()
  create(@Body() data: any) {
    return this.donhangService.create(data);
  }
  @Get()
  async findAll() {
    return await this.donhangService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.donhangService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.donhangService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.donhangService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.donhangService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonhangDto: UpdateDonhangDto) {
    return this.donhangService.update(id, updateDonhangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donhangService.remove(id);
  }
}