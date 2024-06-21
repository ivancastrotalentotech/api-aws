import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { NeoPool } from './pg.pool';
import { EnvConfiguration } from './config/app.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        load: [ EnvConfiguration ]
      }
    ),
    LoginModule
  ],
  controllers: [],
  providers: [NeoPool],
})
export class AppModule {
  
  private readonly logger = new Logger('AppModule');
  private nodeBd: string = process.env.FRONTAL;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.nodeBd = configService.get<string>('nodeBd');
    this.logger.debug(`Inicializando  ${this.nodeBd}`);
  }

}
