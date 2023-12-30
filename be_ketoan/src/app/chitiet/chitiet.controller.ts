import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {ChitietService } from './chitiet.service';
import { CreateChitietDto } from './dto/create-chitiet.dto';
import { UpdateChitietDto } from './dto/update-chitiet.dto';
@Controller('chitiet')
export class ChitietController {
  constructor(private readonly chitietService:ChitietService) {}

  @Post()
  create(@Body() createChitietDto: CreateChitietDto) {
    return this.chitietService.create(createChitietDto);
  }
  @Get()
  async findAll() {
    return await this.chitietService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.chitietService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.chitietService.findSHD(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.chitietService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.chitietService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChitietDto: UpdateChitietDto) {
    return this.chitietService.update(id, updateChitietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chitietService.remove(id);
  }
}