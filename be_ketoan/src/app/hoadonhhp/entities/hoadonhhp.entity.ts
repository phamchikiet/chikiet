import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('hoadonhhp', {orderBy: { CreateAt: 'DESC' } })
export class HoadonhhpEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  SHD: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Thang: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Type: string;
  @Column({ default: 0 })
  Ordering: number;
  @Column({ default: 0 })
  Status: number;
  @CreateDateColumn()
  CreateAt: Date;
  @UpdateDateColumn()
  UpdateAt: Date;
  @DeleteDateColumn()
  DeleteAt: Date;
  @Column({ nullable: true })
  idCreate: string;
}