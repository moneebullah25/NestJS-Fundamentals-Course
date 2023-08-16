import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// index is provided on column name and type to speed up the search 
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
