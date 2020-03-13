import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class HolderEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true
    })
    taxpayerRegistry!: string;

    @Column()
    name!: string;

    @Column()
    country!: string;

}