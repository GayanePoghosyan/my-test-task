import { ExecutionContext } from '@nestjs/common';
import { Dictionary } from 'code-config';
import { User } from '../user/schema/user.schema';

export interface IClient {
  headers: Dictionary<string>;
  user: User;
}

export const getClient = (ctx: ExecutionContext) => {
  switch (ctx.getType()) {
    case 'ws':
      return ctx.switchToWs().getClient().handshake;
    case 'http':
      return ctx.switchToHttp().getRequest();
    default:
      return;
  }
};