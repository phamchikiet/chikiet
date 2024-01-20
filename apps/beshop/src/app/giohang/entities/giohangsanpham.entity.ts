import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { GiohangEntity } from './giohang.entity';
import { SanphamEntity } from '../../sanpham/entities/sanpham.entity';
@Entity('giohangsanpham', {orderBy: { CreateAt: 'DESC' } })
export class GiohangsanphamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(type => GiohangEntity, giohang => giohang.Giohangsanpham)
  giohang: GiohangEntity;
  @ManyToOne(type => SanphamEntity, sanpham => sanpham.Giohangsanpham)
  sanpham: SanphamEntity;
  @Column()
  quantity: number;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ default: '' })
  Slug: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
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