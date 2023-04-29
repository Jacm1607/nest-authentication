import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Body } from '@nestjs/common/decorators';
import { UsersService } from './users/users.service';

export interface UserInterface {
  username: string,
  password: string
}

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('new')
  create(@Body() req:UserInterface) {
    try {
      this.userService.create(req);
      return { response: 200 }
    } catch (e) {
      return {error: 'error'}
    }
  }
}