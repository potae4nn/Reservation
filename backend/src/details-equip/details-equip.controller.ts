import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailsEquipService } from './details-equip.service';
import { CreateDetailsEquipDto } from './dto/create-details-equip.dto';
import { UpdateDetailsEquipDto } from './dto/update-details-equip.dto';

@Controller('details-equip')
export class DetailsEquipController {
  constructor(private readonly detailsEquipService: DetailsEquipService) {}

  @Post()
  create(@Body() createDetailsEquipDto: CreateDetailsEquipDto) {
    return this.detailsEquipService.create(createDetailsEquipDto);
  }

  @Get()
  findAll() {
    return this.detailsEquipService.findAll();
  }

  @Get('stock')
  findAllStock() {
    return this.detailsEquipService.findAllStock();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailsEquipService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDetailsEquipDto: UpdateDetailsEquipDto) {
  //   return this.detailsEquipService.update(+id, updateDetailsEquipDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateDetailsEquipDto: UpdateDetailsEquipDto) {
  //   return this.detailsEquipService.updateStatus(+id, updateDetailsEquipDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailsEquipService.remove(+id);
  }
}
