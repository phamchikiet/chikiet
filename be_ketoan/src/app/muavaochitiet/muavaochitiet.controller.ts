import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {MuavaochitietService } from './muavaochitiet.service';
import { CreateMuavaochitietDto } from './dto/create-muavaochitiet.dto';
import { UpdateMuavaochitietDto } from './dto/update-muavaochitiet.dto';
@Controller('muavaochitiet')
export class MuavaochitietController {
  constructor(private readonly muavaochitietService:MuavaochitietService) {}

  @Post()
  create(@Body() createMuavaochitietDto: CreateMuavaochitietDto) {
    return this.muavaochitietService.create(createMuavaochitietDto);
  }
  @Get()
  async findAll() {
    return await this.muavaochitietService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.muavaochitietService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.muavaochitietService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.muavaochitietService.findPagination(page,perPage);
    }
  @Get('findquery')
    async findQuery(@Query('query') query: string){
      return await this.muavaochitietService.findQuery(query);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuavaochitietDto: UpdateMuavaochitietDto) {
    return this.muavaochitietService.update(id, updateMuavaochitietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.muavaochitietService.remove(id);
  }
}