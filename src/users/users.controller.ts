import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-users.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  getUsers(@Query() getUsersDto: GetUserDto): User[] {
    return this.userService.findAll(getUsersDto);
  }

  @ApiOkResponse({ type: User, description: 'The user' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): any {
    return this.userService.findById(id);
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): any {
    return this.userService.createUser(createUserDto);
  }
}
