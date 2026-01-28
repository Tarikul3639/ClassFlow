import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('auth') // base route: /auth
export class AuthController {
  
  // GET /auth/test
  @Get('test')
  getTest() {
    return { message: "Auth controller is working!" };
  }

  // POST /auth/sign-in
  @Post('sign-in')
  signIn(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    // এখানে তুমি auth service ব্যবহার করে login logic লিখবে
    return { message: `User ${email} logged in (demo)` };
  }

  // POST /auth/sign-up
  @Post('sign-up')
  signUp(@Body() body: { name: string; email: string; password: string }) {
    const { name, email, password } = body;
    // এখানে sign-up logic/service call হবে
    return { message: `User ${name} registered (demo)` };
  }

  // GET /auth/:id
  @Get(':id')
  getUser(@Param('id') id: string) {
    // এখানে id অনুযায়ী user fetch করা হবে
    return { id, name: 'Demo User' };
  }
}
