import { Sequelize } from 'sequelize';

import databaseConfig from '../config/database';

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);
  }
}

const database: Database = new Database();

export default database;