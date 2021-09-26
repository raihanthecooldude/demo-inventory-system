import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
@Unique(['phone'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  phone: number;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar' })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'varchar' })
  salt: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  toJSON() {
    return classToPlain(this);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
