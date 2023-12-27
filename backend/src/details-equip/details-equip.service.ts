import { Inject, Injectable } from '@nestjs/common';
import { CreateDetailsEquipDto } from './dto/create-details-equip.dto';
import { UpdateDetailsEquipDto } from './dto/update-details-equip.dto';
import { DetailsEquip, ENUMSTATUS } from './entities/details-equip.entity';
import { Equipment } from '../equipments/entities/equipment.entity';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class DetailsEquipService {
  constructor(
    @Inject('DETAILSEQUIP_REPOSITORY')
    private readonly detailsEquipRepository: typeof DetailsEquip,
  ) {}

  create(createDetailsEquipDto: CreateDetailsEquipDto) {
    return 'This action adds a new detailsEquip';
  }

  async findAllStock() {
    return await this.detailsEquipRepository.findAll({
      include: { model: Equipment },
      group: 'equipmentId',
      attributes: [
        'equipmentId',
        [Sequelize.fn('count', Sequelize.col('equipmentId')), 'totalStock'],
      ],
      where: { status: 'not_borrowed' },
    });
  }

  async findAll() {
    return await this.detailsEquipRepository.findAll({
      include: { model: Equipment },
      order: [['detailsEquipId', 'ASC']],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} detailsEquip`;
  }

  async updateStatusBorrow(id: number, status: string, limit: number) {
    return await this.detailsEquipRepository.update(
      {
        status: status == 'borrow' ? ENUMSTATUS.Borrow : ENUMSTATUS.NotBorrowed,
      },
      {
        where: { [Op.or]: { equipmentId: id }, status: ENUMSTATUS.NotBorrowed },
        limit: limit,
      },
    );
  }

  async updateStatusReturn(id: number, status: string, limit: number) {
    return await this.detailsEquipRepository.update(
      {
        status:
          status !== 'not_borrowed'
            ? ENUMSTATUS.Borrow
            : ENUMSTATUS.NotBorrowed,
      },
      {
        where: { [Op.or]: { equipmentId: id }, status: ENUMSTATUS.Borrow },
        limit: limit,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} detailsEquip`;
  }
}
