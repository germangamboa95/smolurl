import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  AfterLoad,
  AfterInsert,
} from "typeorm";
import { HitRepository } from "./link.repository";

@Entity()
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  original_url: string;

  @Column()
  @Index({ unique: true })
  hash: string;

  @Column({ nullable: true })
  webhook: string;

  @Column({ type: "simple-json", nullable: true })
  webhook_meta: object;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  hits?: number;

  short_link?: string;

  @AfterLoad()
  async loadHits() {
    try {
      this.hits = await HitRepository().count({
        link_id: this.id,
      });
    } catch (error) {
      this.hits = 0;
    }
  }

  @AfterLoad()
  loadShortLink() {
    this.short_link = `${process.env.HOST}${this.hash}`;
  }
}
