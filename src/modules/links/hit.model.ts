import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from "typeorm";

@Entity()
export class Hit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index()
  link_id: string;

  @Column("simple-json")
  meta: object;
  
  @Column()
  sample:string;
  
  @CreateDateColumn()
  created_at: Date;
}
