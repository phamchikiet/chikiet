import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {BanrachitietService } from './banrachitiet.service';
import { CreateBanrachitietDto } from './dto/create-banrachitiet.dto';
import { UpdateBanrachitietDto } from './dto/update-banrachitiet.dto';
@Controller('banrachitiet')
export class BanrachitietController {
  constructor(private readonly banrachitietService:BanrachitietService) {}

  @Post()
  create(@Body() createBanrachitietDto: CreateBanrachitietDto) {
    return this.banrachitietService.create(createBanrachitietDto);
  }
  @Get()
  async findAll() {
    return await this.banrachitietService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.banrachitietService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.banrachitietService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.banrachitietService.findPagination(page,perPage);
    }
  @Get('findquery')
    async findQuery(@Query('query') query: string){
      return await this.banrachitietService.findQuery(query);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanrachitietDto: UpdateBanrachitietDto) {
    return this.banrachitietService.update(id, updateBanrachitietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banrachitietService.remove(id);
  }
}