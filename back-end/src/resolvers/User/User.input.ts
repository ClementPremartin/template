import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class AddUserArgs {
  @Field()
  @MinLength(1, {
    message: 'Firstname must be at least one character long',
  })
  @MaxLength(20, {
    message: 'Firstname must be a maximum of 20 characters long',
  })
  @IsString()
  firstname: string

  @Field()
  @MinLength(1, {
    message: 'Lastname must be at least one character long',
  })
  @MaxLength(20, {
    message: 'Lastname must be a maximum of 20 characters long',
  })
  @IsString()
  lastname: string

  @Field()
  @IsEmail()
  @IsString()
  email: string

  @Field()
  @IsString()
  password: string
}

@ArgsType()
export class UpdateUserArgs {
  @Field()
  @IsNotEmpty()
  id: string

  @Field()
  @MinLength(1, {
    message: 'Firstname must be at least one character long',
  })
  @MaxLength(20, {
    message: 'Firstname must be a maximum of 20 characters long',
  })
  @IsString()
  firstname?: string

  @Field()
  @MinLength(1, {
    message: 'Lastname must be at least one character long',
  })
  @MaxLength(20, {
    message: 'Lastname must be a maximum of 20 characters long',
  })
  @IsString()
  lastname?: string

  @Field()
  @IsEmail()
  @IsString()
  email?: string
}
