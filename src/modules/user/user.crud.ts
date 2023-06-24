import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../../database/entities/User.entity'
import { Repository } from 'typeorm'
import { GetUserByIdPayloadDTO, SaveUserPayloadDTO } from './dto/user-crud.dto'

@Injectable()
export class UserCrudService {
  constructor(
    @InjectRepository(UserEntity)
    protected userRepository: Repository<UserEntity>,
  ) {}

  public save(payload: SaveUserPayloadDTO) {
    return this.userRepository.save(payload)
  }

  public getById({ id }: GetUserByIdPayloadDTO): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  public getByParams(params: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: params })
  }
}
