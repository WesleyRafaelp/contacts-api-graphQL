import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateContactInput {
  @IsString()
  @Length(3, 30)
  @Field(() => String, { description: 'name contact' })
  nickname: string;

  @IsString()
  @Field(() => String, { description: 'number phone' })
  phone: string;

  @IsEmail()
  @IsString()
  @Field(() => String, { description: 'email' })
  email: string;
}
