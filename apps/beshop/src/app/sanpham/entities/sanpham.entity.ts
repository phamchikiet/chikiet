import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('sanpham', {orderBy: { CreateAt: 'DESC' } })
export class SanphamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idDM: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  id_cat: string;
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
  @Column({ default: 0 })
  Banchay: number;
  @Column({ default: 0 })
  Noibat: number;
  @Column({ default: 1 })
  Moi: number;
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