import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CauhinhService } from './cauhinh.service';
import { CreateCauhinhDto } from './dto/create-cauhinh.dto';
import { UpdateCauhinhDto } from './dto/update-cauhinh.dto';
@Controller('cauhinh')
export class CauhinhController {
  Authorization:any = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1OTAwNDI4OTA0IiwidHlwZSI6MiwiZXhwIjoxNzAyODkzODkzLCJpYXQiOjE3MDI4MDc0OTN9.YlThzF8xmysiSHOsfy3PwNW60srXenuy_g_AEl3pGJH1jLyfvaM88BtwHrJOb9HeIEfwQFTp3enSEDq7p5cCkg'
  constructor(private readonly cauhinhService: CauhinhService) {}
  @Get('listbanra')
  async listbanra(@Body() data: any) {
      const headers = new Headers({ Authorization: this.Authorization });
      let URL:any;
      if(data.state)
      {
        URL = "https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&state="+data.state+"&search=tdlap=ge=01/"+data.thang+"/2023T00:00:00;tdlap=le=31/"+data.thang+"/2023T23:59:59"
      }
      else{
        URL = "https://hoadondientu.gdt.gov.vn:30000/query/invoices/sold?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50&search=tdlap=ge=01/"+data.thang+"/2023T00:00:00;tdlap=le=31/"+data.thang+"/2023T23:59:59"
      }
      const response = await fetch(URL, {
        method: "GET",
        headers,
      });
      const result = await response.json();
      return result
    }
  @Post()
  create(@Body() createCauhinhDto: CreateCauhinhDto) {
    return this.cauhinhService.create(createCauhinhDto);
  }

  @Get()
  findAll() {
    return this.cauhinhService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cauhinhService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCauhinhDto: UpdateCauhinhDto) {
    return this.cauhinhService.update(+id, updateCauhinhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cauhinhService.remove(+id);
  }
}
