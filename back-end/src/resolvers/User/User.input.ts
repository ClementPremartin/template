import { IsEmail, MaxLength, MinLength } from 'class-validator'
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
  firstname: string

  @Field()
  @MinLength(1, {
    message: 'Lastname must be at least one character long',
  })
  @MaxLength(20, {
    message: 'Lastname must be a maximum of 20 characters long',
  })
  lastname: string

  @Field()
  @IsEmail()
  email: string
}
