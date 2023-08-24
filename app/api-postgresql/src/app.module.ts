import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { CoffeeRatingModule } from 'src/coffee-rating/coffee-rating.module';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    // TypeORM provides type safety for MySQL, Microsoft SQL Server, SQLite, MongoDB, NoSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeesModule,
    CoffeeRatingModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Below is the example to implement pipes globally to all of our application endpoints
    // {
    //   provide: APP_PIPE,
    //   useValue: ValidationPipe,
    // },
  ],
})
export class AppModule {}
