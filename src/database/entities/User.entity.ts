import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base-entities/base'

@Entity()
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  public email: string

  @Column({
    unique: true,
    nullable: false,
  })
  public cognitoId: string

  @Column({
    nullable: true,
  })
  public firstName: string

  @Column({
    nullable: true,
  })
  public lastName: string
}
