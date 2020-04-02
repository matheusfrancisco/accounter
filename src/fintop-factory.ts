import { MemoryHolderRepository } from './infrastructure/memory-holder-repository';
import { PostgresHolderRepository } from './infrastructure/postgres-holder-repository';
import HolderService from './application/holder-service';
import { CountryFactory } from './domain/country';
import { buildHolderController } from './view/holder-controller';
import { Connection, createConnection } from 'typeorm';
import { HolderRepository } from './domain/holder-repository';

export class FintopFactory {
  private static connection: Connection;

  public static async build(config: string = 'prod') {
    let holderRepository: HolderRepository;
    if (config === 'test') {
      holderRepository = new MemoryHolderRepository();
    } else {
      holderRepository = new PostgresHolderRepository(await this.createConnection());
    }
    const countryFactory = new CountryFactory();
    const holderService = new HolderService(holderRepository, countryFactory);
    const holderController = buildHolderController(holderService);
    return { holderController, holderService, holderRepository };
  }

  public static async createConnection() {
    if (!this.connection) {
      this.connection = await createConnection();
    }
    return this.connection;
  }
}
