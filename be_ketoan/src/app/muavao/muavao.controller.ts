import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {MuavaoService } from './muavao.service';
import { CreateMuavaoDto } from './dto/create-muavao.dto';
import { UpdateMuavaoDto } from './dto/update-muavao.dto';
@Controller('muavao')
export class MuavaoController {
  constructor(private readonly muavaoService:MuavaoService) {}

  @Post()
  create(@Body() createMuavaoDto: CreateMuavaoDto) {
    return this.muavaoService.create(createMuavaoDto);
  }
  @Get()
  async findAll() {
    return await this.muavaoService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.muavaoService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.muavaoService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.muavaoService.findPagination(page,perPage);
  }
  @Post('finddate')
  async finddate(@Body() data:any){
    console.log(data);
    
       return await this.muavaoService.finddate(data);
  }
  @Get('findquery')
    async findQuery(@Query('query') query: string){
      return await this.muavaoService.findQuery(query);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuavaoDto: UpdateMuavaoDto) {
    return this.muavaoService.update(id, updateMuavaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.muavaoService.remove(id);
  }
}