import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('sanpham', {orderBy: { idSP: 'ASC' } })
export class SanphamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({default:null})
  idSP: number;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idDM: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  TenSP: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  TenSP1: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  TenSP2: string;
  @Column({nullable:true, type: 'text', collation: 'utf8_general_ci' })
  DVT: string;
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