import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
  @Entity('tonkho', {orderBy: { CreateAt: 'DESC' } })
  export class TonkhoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    idCT: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    TenSP: string;
    @Column({nullable:true, type: 'text', collation: 'utf8_general_ci' })
    DVT: string;
    @Column({nullable:true, type: 'bigint'})
    Soluong: number;
    @Column({nullable:true, type: 'bigint'})
    Giaxuat: number;
    @Column({nullable:true, type: 'bigint'})
    Giavon: number;
    @Column({nullable:true, type: 'bigint'})
    Tongtien: number;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    SHD: string;
    @Column({nullable:true})
    Thang: number;
    @Column({nullable:true})
    Nam: number;
    @Column({ nullable: true })
    Ngaytao: Date;
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