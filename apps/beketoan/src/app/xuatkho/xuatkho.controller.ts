import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {XuatkhoService } from './xuatkho.service';
@Controller('xuatkho')
export class XuatkhoController {
  constructor(private readonly xuatkhoService:XuatkhoService) {}

  @Post()
  create(@Body() data: any) {
    return this.xuatkhoService.create(data);
  }
  @Get()
  async findAll() {
    return await this.xuatkhoService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.xuatkhoService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.xuatkhoService.findslug(slug);
  }
  @Get('findtensp/:data')
  async findtensp(@Param('data') data: string) {
    return await this.xuatkhoService.findtensp(data);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.xuatkhoService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.xuatkhoService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.xuatkhoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xuatkhoService.remove(id);
  }
}