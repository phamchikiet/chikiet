import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {hoadonbanraService } from './hoadonbanra.service';
import { CreateHoadonbanraDto } from './dto/create-hoadonbanra.dto';
import { UpdateHoadonbanraDto } from './dto/update-hoadonbanra.dto';
@Controller('banra')
export class hoadonbanraController {
  constructor(private readonly hoadonbanraService:hoadonbanraService) {}

  @Post()
  create(@Body() createhoadonbanraDto: CreateHoadonbanraDto) {
    return this.hoadonbanraService.create(createhoadonbanraDto);
  }
  @Get()
  async findAll() {
    return await this.hoadonbanraService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.hoadonbanraService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.hoadonbanraService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.hoadonbanraService.findPagination(page,perPage);
    }
    @Get('finddate')
    async finddate(@Query('begin') begin: any,@Query('end') end: any){
         return await this.hoadonbanraService.finddate(begin,end);
    }
    @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.hoadonbanraService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatehoadonbanraDto: UpdateHoadonbanraDto) {
    return this.hoadonbanraService.update(id, updatehoadonbanraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoadonbanraService.remove(id);
  }
}