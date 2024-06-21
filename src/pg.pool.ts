import { Injectable, OnModuleInit, Provider } from '@nestjs/common';
import * as process from 'process';
import { Pool } from 'pg';
// @ts-ignore
@Injectable()
export class NeoPool extends Pool {
  constructor() {
    super({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: parseInt(process.env.PG_PORT, 10),
      ssl: {
        rejectUnauthorized: false // Asegúrate de tener certificados configurados si lo necesitas
      }
    });

    this.on('error', (err, client) => {
      console.error('Error:', err);
    });

    this.on('connect', (client) => {
      console.log('Client connected');
    });
  }

  async release() {
    try {
      await this.end(); 
      console.log('NeoPool has been released');
    } catch (error) {
      console.error('Error releasing NeoPool:', error);
    }
  }

}