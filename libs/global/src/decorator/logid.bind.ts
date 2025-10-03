import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ApiId = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  request.apiId = data;  // Attach the custom ID to the request object
  return data;  // Return the ID if needed elsewhere
});
