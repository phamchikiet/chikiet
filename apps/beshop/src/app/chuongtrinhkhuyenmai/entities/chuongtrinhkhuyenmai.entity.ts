import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  @Entity('chuongtrinhkhuyenmai', {orderBy: { CreateAt: 'DESC' } })
  export class ChuongtrinhkhuyenmaiEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Code: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Value: string;
    @Column()
    MinValue: number;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
    products: string;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    HSD: Date;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
    Image: string;
    @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
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