# Testing

```bash
npm run test # for unit test
npm run test:cov # for converage test
npm run test:e2e # for e2e test
```

## Unit Testing

For each controller or service file, there exists a .spec file for unit testing the component

## e2e Testing

For end-to-end testing we put the test directory in side of src directory.
For e2e testing file extension **_e2e-spec.ts_**. The end-to-end system tests the higher level features such as user interaction with the application

## .spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from '../services/coffees.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

// test filename can be .spec or .test
describe('CoffeesService', () => {
  let service: CoffeesService;

  // function passed into the beforeEach hook is executed before every test [SETUP PHASE]
  beforeEach(async () => {
    // The Test class is userful for providing the an application ExecutionContext that mocks the Nest runtime and gives hooks to tweak with the Mock Nest runtime
    // Test.createTestingModule takes the same object we pass to the @Module Decorator to manage dependencies same time we do here.
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // BAD Practice, We could provide the required providers in the providers array which are used by CoffeesService. Hence the isolation unit test best practices would be violated
        CoffeesService,
        //   constructor(
        //     @InjectRepository(Coffee)
        //     private readonly coffeeRepository: Repository<Coffee>,

        //     @InjectRepository(Flavor)
        //     private readonly flavorRepository: Repository<Flavor>,

        //     private readonly connection: Connection,
        // ) {}
        // Since in the constructor of the CoffeesService we use the following dependencies from typeorm we define them there to mock there values
        // Mocking Values
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
      ],
    }).compile();
    // Compile is similar to bootstraping the mock Nest runtime by compiling the root module and link the entire application and call listen on each endpoint.
    // Compile method returns us the TestingModule instance which gives us access to the

    // By default this will provide the Default scope for provider which is Singleton based class instance
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
    service = module.get<CoffeesService>(CoffeesService);
    // @Injectable({ scope: Scope.REQUEST }) We can change the default before like below
    // service = await module.resolve<CoffeesService>(CoffeesService);
  });

  // Other helper functions are beforeAll, afterEach, afterAll

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Seperate name for each of the service to determine which test is this
  describe('findOne', () => {
    // success case
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const extectedCoffee = {};

        coffeeRepository.findOne.mockReturnValue(extectedCoffee);

        // If we run without the above line we will get error stating that `this.coffeeRepository.findOne is not a function`
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(extectedCoffee);
      });
    });
    // fail case
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';

        coffeeRepository.findOne.mockReturnValue(undefined); // We mock the return value for findOne to be undefined

        try {
          await service.findOne(coffeeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
```

## CLI Commands

test:watch run unit test in watch mode and run test if file change.

```bash
npm run test:watch -- user.service
```

## Scopes in NestJS Application

A provider can have any of the following scopes:

- DEFAULT A single instance of the provider is shared across the entire application. The instance lifetime is tied directly to the application lifecycle. Once the application has bootstrapped, all singleton providers have been instantiated. Singleton scope is used by default.
- REQUEST A new instance of the provider is created exclusively for each incoming request. The instance is garbage-collected after the request has completed processing.
- TRANSIENT Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new, dedicated instance.
