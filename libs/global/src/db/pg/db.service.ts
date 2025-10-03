import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { QueryBuilderService } from './query-builder.service';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import * as path from 'path';
import { schemaType } from '@app/global/interfaces/db.interface';

@Injectable()
export class DbService {
  private pool: Pool;

  private readonly logger = new Logger('query');
  constructor(public queryBuilder: QueryBuilderService, private configService: ConfigService) {
    let cfg: any = {
      // Connection configuration
      user: this.configService.get<string>('DB_USERNAME'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_DATABASE'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<Number>('DB_PORT'),
      max: this.configService.get<Number>('DB_MAX'),
      idleTimeoutMillis: this.configService.get<Number>('DB_TIMEOUT')
    }

    const sslConnection = this.configService.get<number>('DB_SSL')
    if (sslConnection > 0) { //process.env.NODE_ENV == 'production' &&
      cfg.ssl = {
        rejectUnauthorized: false, // Set to true if you want to validate the certificate fully
        // cert: fs.readFileSync(this.configService.get<string>('SSL_PG_CERT')).toString(), // The .crt file
      }
    }
    this.logger.warn(`SSL CONFIG ${sslConnection > 0 ? 'Y' : 'N'}`);
    this.pool = new Pool(cfg);

    this.pool.on('error', (err, client) => {
      this.logger.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async rowQuery(text: string, params?: any[]): Promise<any> {
    try {
      const start = Date.now();
      const res = await this.pool.query(text, params);
      this.logger.warn(text, params);
      return { success: true, data: res?.rows || [] };
    } catch (error) {
      this.logger.error('Error executing query', { text, error: error.message });
      // throw error; // Rethrow the error to be handled by the caller
      return { success: false, error: error.message };
    }
  }
  async query(text: string, params?: any[]): Promise<any> {
    // try {
    const start = Date.now();
    const res = await this.pool.query(text, params);
    const duration = Date.now() - start;
    // this.logger.log('executed query', { text, duration });
    return { success: true, data: res.filter(m => m.command == 'FETCH').map(a => a.rows) };
    // } catch (error) {
    //   this.logger.error('Error executing query', { text, error: error.message });
    //   // throw error; // Rethrow the error to be handled by the caller
    //   return { success: false, error: error.message };
    // }
  }




  async executeRef(fun_name: string, params: any, schema?: schemaType): Promise<any> {
    try {
      let refs = params.ref ? params.ref : 1;
      delete params.ref;
      let query = await this.queryBuilder.buildQuery(params, fun_name, refs, schema);
      // await fs.writeFile('query.txt', '\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r' +  query);

      try {
        let responce = await this.query(query);
        // this.insertfunlogs(fun_name, query, schema, params,responce);
        return responce;
      } catch (error) {
        this.logger.error('Error executing query', { query, error: error?.message });
        // this.insertfunlogs(fun_name, query, schema, params,null, true, error?.message);
        throw error;
      }

    } catch (error) {
      return { success: false, error: error };
    }
  }


  async insertfunlogs(fun_name: string, query: any, schema?: schemaType, params?: any, res?: any, isFailed?: boolean, error?: string): Promise<any> {
    try {
      await this.rowQuery(
        `INSERT INTO fun_logs (funname, fquery,fschema,fparms,"isFailed",error,res) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          'et_' + fun_name,
          query ?? {},
          schema || 'public',
          params,
          isFailed || false,
          error || '',
          res || ''
        ]
      );

    } catch (error) {
      console.log('Error inserting function logs', error);
    }
  }

}
