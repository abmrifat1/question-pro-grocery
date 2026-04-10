import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../../common/entity/users/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username?: string, password?: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password || '', user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({
      where: { username: registerDto.username }
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password || '', 10);

    const user = await this.userModel.create({
      username: registerDto.username,
      password: hashedPassword,
      role: registerDto.role,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const { password, ...result } = user.toJSON();

    return {
      message: 'User registered successfully',
      user: result
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(
      loginDto.username,
      loginDto.password,
    );

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}