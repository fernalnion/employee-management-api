import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Config } from 'src/interfaces/config.interface';
import { AuthDto } from "src/models/auth.dto";
import { CreateUserDto } from "src/models/create-user.dto";
import { HarshService } from './hash.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _hashService: HarshService,
    private readonly _jwtService: JwtService,
    private readonly _tokenService: TokenService,
    private readonly _configService: ConfigService<Config>,
  ) { }
  singUp = async (createUserDto: CreateUserDto) => {
    // check if user exist
    const userExists = await this._userService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists.');
    }

    // hash password
    const hash = await this._hashService.hashData(createUserDto.password);
    const newUser = await this._userService.create({
      ...createUserDto,
      password: hash,
    });

    const tokens = await this.getTokens(newUser._id, newUser.email);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  };

  updateRefreshToken = async (userId: string, refreshToken: string) => {
    const hashedRefreshToken = await this._hashService.hashData(refreshToken);
    await this._userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  };

  getTokens = async (userId: string, email: string) => {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this._configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this._jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  };

  singIn = async (data: AuthDto) => {
    // check user exist
    const user = await this._userService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exists');

    const passwordMatches = await this._hashService.compareData(
      data.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    await this._tokenService.save(user._id, tokens.accessToken);
    return tokens;
  };

  refreshTokens = async (userId: string, refreshToken: string) => {
    const user = await this._userService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await this._hashService.compareData(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this._tokenService.save(user._id, tokens.accessToken);
    return tokens;
  };

  logout = async (userId: string) => {
    await this._tokenService.disable(userId);
    return this._userService.update(userId, { refreshToken: undefined });
  };
}
