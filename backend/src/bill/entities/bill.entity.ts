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
  BelongsToMany,
} from 'sequelize-typescript';
import { BorrowEquip } from 'src/borrow-equip/entities/borrow-equip.entity';

@Table
export class Bill extends Model<Bill> {

  @Column({
    allowNull: false,
  })
  billUUID: string
  
  @HasMany(() => BorrowEquip)
  borrowEquips: BorrowEquip[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
