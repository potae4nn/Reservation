import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Equipment } from '../../equipments/entities/equipment.entity';

export enum ENUMSTATUS {
  NotBorrowed = 'not_borrowed',
  Borrow = 'borrow',
  Return = 'return',
}

@Table
export class DetailsEquip extends Model<DetailsEquip> {
  @Column({
    allowNull: false,
    // unique: true,
  })
  detailsEquipId: string;

  @Column({
    allowNull: false,
  })
  year: Date;

  @Column({
    allowNull: false,
  })
  details: string;

  @Column({
    allowNull: false,
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ENUMSTATUS)),
    defaultValue: 'not_borrowed',
  })
  status: ENUMSTATUS;

  @ForeignKey(() => Equipment)
  @Column
  equipmentId: number;

  @BelongsTo(() => Equipment)
  equipment: Equipment;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
