import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
@Entity('banrachitiet', {orderBy: { CreateAt: 'DESC' } })
export class BanrachitietEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idDM: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  SHD: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Dulieu: string;
  @Column({ nullable: true })
  Ngaytao: Date;
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