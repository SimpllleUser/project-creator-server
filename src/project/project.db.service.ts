// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require('sqlite3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { open } = require('sqlite');

export class ProjectDBService {
  db: Promise<any>;

  constructor(projectId) {
    this.db = open({
      filename: `./files/projects/${projectId}/src/db.sqlite`,
      driver: sqlite3?.Database,
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
    const columnParams = Object.keys(columns)
      ?.map((key) => ({ name: key, ...columns[key] }))
      ?.map(this.getColumn)
      ?.join(',');
    console.log(columnParams);
    try {
      (await this.db).exec(`CREATE TABLE ${tableName} (${columnParams});`);
      return await this.getDataTable(tableName);
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async inserDataToTable(tableName: string, cols: string, values: string) {
    return (await this.db).exec(
      `INSERT INTO ${tableName} (${cols}) VALUES(${values});`,
    );
  }
  async deleteDataFromTable(tableName: string, row) {
    return (await this.db).exec(`
    DELETE FROM ${tableName}
    WHERE ${this.rowToSqlPramsAND(row)};`);
  }
  async updateDataFromTable(tableName: string, row, prevRow) {
    return (await this.db).exec(
      `UPDATE ${tableName} 
       SET ${this.rowToSqlPramsAND(row)}
       WHERE ${this.rowToSqlPramsAND(prevRow)};`,
    );
  }

  rowToSqlPramsAND(row) {
    return Object.keys(row)
      .map((key) => `${key}=${this.getColValue(row[key])}`)
      .join(' AND ');
  }

  getColValue(value) {
    typeof value === 'string' ? `'${value}'` : value;
  }

  getColumn({ name, type, isNull, isUniq, isPrimaryKey }): string {
    const nullable = isNull ? 'NULL' : 'NOT NULL';
    const uniq = isUniq ? 'UNIQE' : '';
    const primaryKey = isPrimaryKey ? 'PRIMARY KEY' : '';
    return `${name} ${type} ${nullable} ${uniq} ${primaryKey}`;
  }
  async closeDB() {
    return await (await this.db).close();
  }
}
