import { Flavor } from 'src/coffees/entities/flavor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    //Sets cascades options for the given relation. If set to true then it means that related object can be allowed to be inserted or updated in the database. You can separately restrict cascades to insertion or updation using following syntax:
    // cascade: ["insert", "update", "remove", "soft-remove", "recover"] // include or exclude one of them
    cascade: true,
  })
  flavors: Flavor[];
}
