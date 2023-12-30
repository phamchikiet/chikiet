import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('chitiet', {orderBy: { CreateAt: 'DESC' } })
export class ChitietEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idChitiet: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  ten: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  shdon: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  sluong: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  dgia: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  thtien: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Loai: string;
  @Column({default:null })
  Ngay: Date;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  thang: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  nam: string;
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