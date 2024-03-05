import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ArgsType, Field } from 'type-graphql'

const passwordRegExp = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
)

@ArgsType()
export class SignUpArgs {
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
  @Matches(passwordRegExp, {
    message:
      'Password should have at least 1 number, lower, upper & special char and have at least 8 characters',
  })
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

@ArgsType()
export class SignInArgs {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string
}
