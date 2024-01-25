import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('giohang', {orderBy: { CreateAt: 'DESC' } })
export class GiohangEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idKH: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Sanpham: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Khachhang: string;
  @Column({ type: 'bigint' })
  Total: number;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
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