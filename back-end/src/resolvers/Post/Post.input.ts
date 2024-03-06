import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class AddPostArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string

  @Field()
  @IsString()
  content?: string

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  published: boolean
}
