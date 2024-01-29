import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {XuatnhaptonService } from './xuatnhapton.service';
@Controller('xuatnhapton')
export class XuatnhaptonController {
  constructor(private readonly xuatnhaptonService:XuatnhaptonService) {}

  @Post()
  create(@Body() data: any) {
    return this.xuatnhaptonService.create(data);
  }
  @Get()
  async findAll() {
    return await this.xuatnhaptonService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.xuatnhaptonService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.xuatnhaptonService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.xuatnhaptonService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.xuatnhaptonService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.xuatnhaptonService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xuatnhaptonService.remove(id);
  }
}