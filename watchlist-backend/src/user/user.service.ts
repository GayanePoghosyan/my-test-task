import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email })
  }

  async findBy(field: any): Promise<User | null> {
    return await this.userModel.findOne(field)
  }

  async validateUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ userId });

      if (!user) {
        throw new NotFoundException(`User not found. UserId: ${userId}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error.toString());

      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException({
        message: 'Unable to get user due to an unknown error',
        error
      });
    }
  }

  validatePassword(password: string, currentPassword: string): Promise<boolean> {
    return compareSync(password, currentPassword || '');
  }

  private hashPassword(password: string) {
    try {
      return hashSync(password, 10);
    } catch (error) {
      this.logger.error(error.toString());
      throw error;
    }
  }

  async create(body: Partial<User>): Promise<User> {
    try {

      const createdUser = new this.userModel({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email?.toLowerCase().trim(),
        password: this.hashPassword(body.password),
        googleId:body.googleId??''
      });

      const validationErrors = await validate(createdUser);

      if (validationErrors.length > 0) {
        throw new UnprocessableEntityException({
          success: false,
          errors: validationErrors
        });
      }
      const user = createdUser.save()
      return user;
    } catch (error) {
      this.logger.error(error.toString());

      if (error instanceof UnprocessableEntityException) {
        throw error
      }
      throw new InternalServerErrorException('Unable to register a new user due to an unknown error');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findById({ id });

      if (!user) {
        throw new NotFoundException(`User with the specified Id: ${id} was not found`);
      }
      const updatedUser = new this.userModel({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        email: updateUserDto.email.toLowerCase().trim(),
      });

      const validationErrors = await validate(updatedUser, {
        skipUndefinedProperties: true
      });

      if (validationErrors.length > 0) {
        throw new UnprocessableEntityException({
          success: false,
          errors: validationErrors
        });
      }

      return await this.userModel.findByIdAndUpdate(id, updatedUser);

    } catch (error) {
      this.logger.error(error.toString());
      if (error instanceof NotFoundException || error instanceof UnprocessableEntityException) {
        throw error;
      }

      throw new InternalServerErrorException('Unable to update user data due to an unknown error');
    }
  }
}