import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { GiohangsanphamEntity } from './giohangsanpham.entity';
@Entity('giohang', {orderBy: { CreateAt: 'DESC' } })
export class GiohangEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @OneToMany(type => GiohangsanphamEntity, giohangsanpham => giohangsanpham.giohang, { cascade: true })
  Giohangsanpham: GiohangsanphamEntity[];
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