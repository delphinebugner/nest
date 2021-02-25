import { registerAs } from '@nestjs/config';

export default registerAs('coffees', () => ({
  foo: 'bar',
  test: 3,
  arrivals: ['a', 'b'],
}));
