import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { GiohangsanphamEntity } from '../../giohang/entities/giohangsanpham.entity';
@Entity('sanpham', {orderBy: { CreateAt: 'DESC' } })
export class SanphamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idDM: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  id_cat: string;
  @OneToMany(type => GiohangsanphamEntity, giohangsanpham => giohangsanpham.giohang, { cascade: true })
  Giohangsanpham: GiohangsanphamEntity[];
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Danhmuc: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  SKU: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Noidung: string;
  @Column({ default: '' })
  Slug: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Giachon: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Giagoc: number;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Giaban: number;
  @Column({ type: 'bigint' })
  View: number;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Size: string;
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