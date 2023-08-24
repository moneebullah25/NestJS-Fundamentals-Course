import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Coffee, CoffeeSchema } from 'src/coffees/entities/coffee.entity';
import { EventSchema } from 'src/events/enities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  // useValue syntax is useful for injecting a constant value
  // class MockService {}
  // providers: [{provide: CoffeeService, useValue: new MockService()}]

})
export class CoffeesModule {}
