import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { LoginBodyDTO, SignupBodyDTO } from './dto/user-controller.dto'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  public login(@Body() body: LoginBodyDTO) {
    return this.userService.login(body)
  }

  @Post('/signup')
  public signup(@Body() body: SignupBodyDTO) {
    return this.userService.signup(body)
  }

  @Post('/logout')
  public logout() {
    return this.userService.logout()
  }

  @Post('/refresh')
  public refresh() {
    return this.userService.refresh()
  }
}
