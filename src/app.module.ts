import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/users/user.controller';
import { AnalyticsController } from './controllers/analytics/analytics.controller';
import { UsersService } from './services/users/users.service';
import { AnalyticsService } from './services/analytics/analytics.service';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import AnalyticsRepository from './repositories/analytics.repository';
import { Visit, VisitSchema } from './schemas/visits.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }]),
  ],
  controllers: [UserController, AnalyticsController],
  providers: [
    UsersService,
    UserRepository,
    AnalyticsService,
    AnalyticsRepository,
  ],
})
export class AppModule {}
