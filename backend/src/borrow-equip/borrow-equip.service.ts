import { Inject, Injectable } from '@nestjs/common';
import { CreateBorrowEquipDto } from './dto/create-borrow-equip.dto';
import { UpdateBorrowEquipDto } from './dto/update-borrow-equip.dto';
import { BorrowEquip } from './entities/borrow-equip.entity';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Sequelize } from 'sequelize';
import { BillService } from '../bill/bill.service';
import { DetailsEquipService } from '../details-equip/details-equip.service';
import { Bill } from 'src/bill/entities/bill.entity';

@Injectable()
export class BorrowEquipService {
  constructor(
    @Inject('BORROWEQUIP_REPOSITORY')
    private readonly borrowEquipRepository: typeof BorrowEquip,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly billService: BillService,
    private readonly detailsEquipService: DetailsEquipService,
  ) {}

  async create(createBorrowEquipDto: CreateBorrowEquipDto[]) {
    const t = await this.sequelize.transaction();
    try {
      let bill = await this.billService.create({
        ...createBorrowEquipDto[0],
        t,
      });
      const billId = bill.dataValues.id;
      const dataBorrowEquip = createBorrowEquipDto.map((res) => {
        return { ...res, billId };
      });

      await this.borrowEquipRepository
        .bulkCreate<BorrowEquip>(dataBorrowEquip, { transaction: t })
        .then(async () => {
          const validityFlags = await Promise.all(
            createBorrowEquipDto.map((res) => {
              this.detailsEquipService.updateStatusBorrow(
                res.equipmentId,
                'borrow',
                Number(res.amount_borrowed),
              );
            }),
          );
          let result = validityFlags.every(Boolean);
          return result;
        });
      await t.commit();
      return { message: 'success' };
    } catch (error) {
      await t.rollback();
      throw error;
      // return error.errors[0].message;
    }
  }

  async findAll() {
    return await this.borrowEquipRepository.findAll({
      include: [{ model: Equipment }, { model: Bill, order: ['id', 'ASC'] }],
      order: [['status', 'ASC']],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} borrowEquip`;
  }

  async update(id: number, updateBorrowEquipDto: UpdateBorrowEquipDto) {
    const t = await this.sequelize.transaction();
    try {
      await this.borrowEquipRepository
        .findOne({ where: { id }, transaction: t })
        .then((res) => {
          const amount_borrowed = res.dataValues.amount_borrowed;
          this.detailsEquipService.updateStatusReturn(
            res.dataValues.equipmentId,
            'not_borrowed',
            Number(amount_borrowed),
          );
        });
      await this.borrowEquipRepository
        .update<BorrowEquip>(updateBorrowEquipDto, {
          where: { id },
          transaction: t,
        })
        .then((res) => {
          console.log(res);
        });
      await t.commit();
      return { message: 'success' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} borrowEquip`;
  }
}
