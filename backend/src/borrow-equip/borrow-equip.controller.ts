import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BorrowEquipService } from './borrow-equip.service';
import { CreateBorrowEquipDto } from './dto/create-borrow-equip.dto';
import { UpdateBorrowEquipDto } from './dto/update-borrow-equip.dto';

@Controller('borrow-equip')
export class BorrowEquipController {
  constructor(
    private readonly borrowEquipService: BorrowEquipService,
  ) {}

  @Post()
  async create(
    @Body() createBorrowEquipDto: CreateBorrowEquipDto[],
  ): Promise<any> {
    await this.borrowEquipService.create(createBorrowEquipDto)
    return { message: 'success' };
  }

  @Get()
  findAll() {
    return this.borrowEquipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowEquipService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBorrowEquipDto: UpdateBorrowEquipDto,
  ) {
    return this.borrowEquipService.update(+id, updateBorrowEquipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowEquipService.remove(+id);
  }
}
