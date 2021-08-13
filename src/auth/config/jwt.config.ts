import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export default class JWTConfig {
  static getJwtConfig(config: ConfigService): JwtModuleOptions {
    return {
      secret: config.get('JWT_SECRET'),
      signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
    };
  }
}

export const JWTConfigAsync: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService): Promise<JwtModuleOptions> =>
    JWTConfig.getJwtConfig(config),
  inject: [ConfigService],
};
