import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {SohoadonService } from './sohoadon.service';
import { CreateSohoadonDto } from './dto/create-sohoadon.dto';
import { UpdateSohoadonDto } from './dto/update-sohoadon.dto';
@Controller('sohoadon')
export class SohoadonController {
  constructor(private readonly sohoadonService:SohoadonService) {}

  @Post()
  create(@Body() createSohoadonDto: CreateSohoadonDto) {
    return this.sohoadonService.create(createSohoadonDto);
  }
  @Get()
  async findAll() {
    return await this.sohoadonService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.sohoadonService.findid(id);
  }
  @Get('sltheothang/:thang')
  async findThang(@Param('thang') thang: any) {
    return await this.sohoadonService.findThang(thang);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.sohoadonService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.sohoadonService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.sohoadonService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSohoadonDto: UpdateSohoadonDto) {
    return this.sohoadonService.update(id, updateSohoadonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sohoadonService.remove(id);
  }
}