import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

type InitedDataBase = Database<sqlite3.Database, sqlite3.Statement>;

export class DBhelper {
  db: Promise<InitedDataBase>;
  static db: Database<sqlite3.Database, sqlite3.Statement>;

  static async initDB(path: string) {
    this.db = await open({
      filename: path,
      driver: sqlite3.Database,
    });
  }
  async getAlltables() {
    return await (
      await this.db
    ).all('SELECT name from sqlite_master where type= "table"');
  }
  async getAllDataFromTables() {
    const tables = await this.getAlltables();
    return await Promise.all(
      tables.map(async (table) => ({
        [table.name]: await (await this.db).all(`SELECT * FROM ${table.name}`),
      })),
    );
  }
  async deleteTable(name) {
    return await (await this.db).exec(`drop table if exists ${name}`);
  }
  async getAllColumnsTable(tableName) {
    return await (await this.db).all(`PRAGMA table_info('${tableName}')`);
  }
  async getDataTable(tableName: string) {
    return await (await this.db).all(`SELECT * FROM ${tableName};`);
  }
  async getAllTableNames(tableName) {
    return await (await this.db).all(`SELECT name FROM ${tableName};`);
  }
  async createTable({ tableName, columns }) {
    const columnParmas = columns.map(this.getColumn).join(',');
    try {
      (await this.db).exec(`CREATE TABLE ${tableName} (${columnParmas});`);
      return await this.getDataTable(tableName);
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  getColumn({ name, typeData, isNull, isUniq, isPrimaryKey }): string {
    const nullable = isNull ? 'NULL' : 'NOT NULL';
    const uniq = isUniq ? 'UNIQE' : '';
    const primaryKey = isPrimaryKey ? 'PRIMARY KEY' : '';
    return `${name} ${typeData} ${nullable} ${uniq} ${primaryKey}`;
  }
  async closeDB() {
    return await (await this.db).close();
  }
}
