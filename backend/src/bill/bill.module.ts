import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { DatabaseModule } from '../database/database.module';
import { billProviders } from './bill.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [BillController],
  providers: [BillService,...billProviders],
  exports: [BillService],
})
export class BillModule {}
