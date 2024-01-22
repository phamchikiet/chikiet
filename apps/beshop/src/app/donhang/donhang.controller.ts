import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { CreateDonhangDto } from './dto/create-donhang.dto';
import { UpdateDonhangDto } from './dto/update-donhang.dto';

@Controller('donhang')
export class DonhangController {
  constructor(private readonly donhangService: DonhangService) {}

  @Post()
  create(@Body() createDonhangDto: CreateDonhangDto) {
    return this.donhangService.create(createDonhangDto);
  }

  @Get()
  findAll() {
    return this.donhangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donhangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonhangDto: UpdateDonhangDto) {
    return this.donhangService.update(+id, updateDonhangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donhangService.remove(+id);
  }
}
