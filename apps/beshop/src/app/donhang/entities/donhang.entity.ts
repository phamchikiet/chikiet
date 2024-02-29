import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('donhang', {orderBy: { CreateAt: 'DESC' } })
export class DonhangEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idKH: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  MaDonHang: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idGiohang: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idKM: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Thanhtoan: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Vanchuyen: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Diachis: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Ghichu: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Lydohuy: string;
  @Column({ type: 'bigint' })
  Total: number;
  @Column({ type: 'bigint' })
  SubTotal: number;
  @Column({ default: '' })
  Type: string;
  @Column({ default: 1 })
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