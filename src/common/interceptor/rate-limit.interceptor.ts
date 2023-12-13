import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { Observable } from 'rxjs';

export class RateLimitInterCeptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // Context를 통해 Request.headers.id를 받아옵니다.
    const httpContext = context.switchToHttp();
    const req: Request = httpContext.getRequest();
    const id = req.headers.id as string;

    const countById: number =
      ((await this.cacheManager.get(id)) as number) || 0;
    if (countById > 9) {
      await this.delayRequest(id, 100);
      return next.handle();
    } else {
      await this.cacheManager.set(id, (countById as number) + 1, 100);
      return next.handle();
    }
  }

  /**
   * Cache 값이 있을 시, 0.1초간 delay해주는 함수 구현
   * 재귀함수를 통해 트래픽이 몰려도, 0.1초간 delay를 해주는 기능
   * @param {string} id Header에 들어가는 UserID
   * @param {number} ms ms로 delay 시간을 입력받는다.
   * @returns
   */
  private async delayRequest(id: string, ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
    const countById = (await this.cacheManager.get(id)) as number;
    if (countById > 9) return await this.delayRequest(id, ms);
    await this.cacheManager.set(id, countById + 1, ms);
    return;
  }
}
