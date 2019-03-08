import { ICallInterceptor } from './ICallInterceptor';

//tslint:disable
export const logMethodCallInterceptor: ICallInterceptor<any> = {
  kind: 'ICallInterceptor',
  callback(typeOfKey: string, target: any, key: any, value: any): void {
    console.log(`>${target.constructor.name}.${key}(${JSON.stringify(value).replace('[', '').replace(']', '')})`);
    console.log('callInterceptor');
  }
}