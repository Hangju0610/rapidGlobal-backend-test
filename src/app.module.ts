import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RateLimitInterCeptor } from './common/interceptor/rate-limit.interceptor';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [
    AppService,
    // 전역 Interceptor 구현
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimitInterCeptor,
    },
  ],
})
export class AppModule {}
