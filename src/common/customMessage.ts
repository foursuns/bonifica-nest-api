import { ResponseDto } from '../api/interfaces/response';

function customMessage(statusCode: number, message: string, token: string, data = {}): ResponseDto {
  return {
    statusCode: statusCode,
    message: message,
    token: token,
    data: data,
  };
}

export default customMessage;
