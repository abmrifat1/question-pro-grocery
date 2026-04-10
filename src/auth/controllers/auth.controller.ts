import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../dto/register.dto";

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}