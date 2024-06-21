import { Logger } from '@nestjs/common';
import { format } from 'date-fns';
import { CODIGO_ERRORS, ResponseErrorTipo } from '../interface/IResponse';
import { Response as ExpressResponse } from 'express';

export class ControllerMaster {

    public readonly logger = new Logger('ControllerMaster');

    public responderErrorV2 = (mensaje: string, mensajeError: string ,response: ExpressResponse) => {
        this.responderV2(CODIGO_ERRORS.PETICION_HTTP_INTERNAL, typeof mensaje !== 'undefined' ? mensaje : 'ERROR GENERAL', ResponseErrorTipo.BUSSINES, 500, response, mensajeError);
    }
    
    public responderV2 = (codigo: number, mensaje: string, tipo: string, statusCode: number, response: ExpressResponse, mensajeError: string = '') => {
        let json: any =
            statusCode === 200 || statusCode == 201
            ? {
                mensaje: mensaje,
                fechaProceso: format(new Date(), "yyyy-MM-dd HH:mm:ss")
            }
            : {
                codigoError: codigo + '',
                tipoError: tipo,
                mensaje: mensaje,
                mensajeError:mensajeError,
                fechaProceso: format(new Date(), "yyyy-MM-dd HH:mm:ss")
            }

        if (statusCode === 201 || statusCode === 200) {
            this.logger.log(json);
        } else {
            this.logger.error(json);
        }
                
        response.status(statusCode).json(json);

        return json;
    }

}