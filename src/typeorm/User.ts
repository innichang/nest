import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  emailAddress: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
