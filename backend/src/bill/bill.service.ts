import { Inject, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @Inject('BILL_REPOSITORY')
    private readonly billRepository: typeof Bill,
  ) {}
  async create(createBillDto: any) {
    return await this.billRepository.create(
      { billUUID: createBillDto.billId },
      { transaction: createBillDto.t },
    );
  }

  findAll() {
    return `This action returns all bill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
