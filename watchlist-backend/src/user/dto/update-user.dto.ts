import { UserDto } from './user.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateUserDto extends PickType(UserDto, ['firstName', 'lastName', 'email', 'googleId'] as const) { }
