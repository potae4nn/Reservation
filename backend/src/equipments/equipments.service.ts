import { Inject, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { Sequelize } from 'sequelize';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class EquipmentsService {
  constructor(
    @Inject('EQUIPMENT_REPOSITORY')
    private readonly equipmentRepository: typeof Equipment,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      return await this.equipmentRepository.create<Equipment>(
        createEquipmentDto,
      );
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async findAll() {
    try {
      return await this.equipmentRepository.findAll<Equipment>({
        include: { model: Category },
      });
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.equipmentRepository.findByPk<Equipment>(id, {
        include: { model: Category },
      });
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const t = await this.sequelize.transaction();
    try {
      await this.equipmentRepository.update<Equipment>(updateEquipmentDto, {
        where: { id },
        transaction: t,
      });
      await t.commit();
      return { message: 'success' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.equipmentRepository.destroy<Equipment>({
        where: { id },
      });
    } catch (error) {
      return error.errors[0].message;
    }
  }
}
