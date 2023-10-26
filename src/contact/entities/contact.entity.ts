import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
@ObjectType()
export class Contact {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String, { description: 'name contact' })
  nickname: string;

  @Column()
  @Field(() => String, { description: 'number phone' })
  phone: string;

  @Column()
  @Field(() => String, { description: 'email' })
  email: string;
}
