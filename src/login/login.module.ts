import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { NeoPool } from '../pg.pool';

@Module({
  controllers: [LoginController],
  providers: [LoginService, NeoPool]
})
export class LoginModule {}
