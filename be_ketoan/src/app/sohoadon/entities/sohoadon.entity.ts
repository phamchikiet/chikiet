import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('sohoadon', {orderBy: { CreateAt: 'DESC' } })
export class SohoadonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  thang: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  nam: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  nbmst: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  khhdon: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  shdon: string;
  @Column({ default:null })
  tdlap: Date;
  @Column({ default: '' })
  Type: string;
  @Column({ default: 1 })
  Ordering: number;
  @Column({ default: 0 })
  Status: number;
  @CreateDateColumn()
  CreateAt: Date;
}