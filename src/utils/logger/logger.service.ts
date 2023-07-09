import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {

  log(message: any, className: any, MethodName: any) {
    console.log(`logTime:`, Date.now(), `{message: ${message}, className: ${className}, methodName: ${MethodName}}`)
  };

  error(message: any, className: any, MethodName: any) {
    console.log(`errorTime:`, Date.now(), `{message: ${message}, className: ${className}, methodName: ${MethodName}}`)
  };

  warn(message: any, className: any, MethodName: any) {
    console.log(`warnTime:`, Date.now(), `{message: ${message}, className: ${className}, methodName: ${MethodName}}`)
  };

  debug?(message: any, className: any, MethodName: any) {
    console.log(`debugTime:`, Date.now(), `{message: ${message}, className: ${className}, methodName: ${MethodName}}`)
  };

  verbose?(message: any, className: any, MethodName: any) {
    console.log(`verboseTime:`, Date.now(), `{message: ${message}, className: ${className}, methodName: ${MethodName}}`)
  };

}
