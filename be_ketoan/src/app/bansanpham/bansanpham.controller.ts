import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BansanphamService } from './bansanpham.service';
import { CreateBansanphamDto } from './dto/create-bansanpham.dto';
import { UpdateBansanphamDto } from './dto/update-bansanpham.dto';

@Controller('bansanpham')
export class BansanphamController {
  constructor(private readonly bansanphamService: BansanphamService) {}

  @Post()
  create(@Body() createBansanphamDto: CreateBansanphamDto) {
    return this.bansanphamService.create(createBansanphamDto);
  }

  @Get()
  findAll() {
    return this.bansanphamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bansanphamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBansanphamDto: UpdateBansanphamDto) {
    return this.bansanphamService.update(+id, updateBansanphamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bansanphamService.remove(+id);
  }
}
