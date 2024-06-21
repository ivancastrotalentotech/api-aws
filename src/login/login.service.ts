import { Injectable, Logger } from '@nestjs/common';
import { NeoPool } from '../pg.pool';
import { Response as ExpressResponse } from 'express';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

import { ControllerMaster } from '../common/ControllerMaster';
import { query } from '../common/querys/querys';
import { CODIGO_RESPUESTA, ResponseErrorTipo, MENSAJES, CODIGO_ERRORS } from '../interface/IResponse';

@Injectable()
export class LoginService {

  private readonly logger = new Logger('LoginService');
  private response = new ControllerMaster();;

  constructor(
    private readonly neoPool: NeoPool,
  ){}


  async create(createLoginDto: CreateLoginDto, response: ExpressResponse) {
    try {
      const { rows } = await this.neoPool.query(query); 
      const { id, user, password, email } = rows[0];
      this.logger.debug(`id: ${id}, user: ${user}, password: ${password}, email: ${email}`);
      return this.response.responderV2(CODIGO_ERRORS.PETICION_HTTP_OK, MENSAJES.PETICION_HTTP_OK, ResponseErrorTipo.BUSSINES, 201, response);    

    } catch (error) {
      this.logger.debug(`error: ${error.message}`);
      return this.response.responderErrorV2(MENSAJES.PETICION_HTTP_ERROR, error.message, response);   
    }
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
