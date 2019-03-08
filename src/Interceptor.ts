import { proxyGenerator } from './proxyGenerator';
import { Interceptor } from './types';

// export declare interface IAnyCallInterceptor {
//   kind: 'IAnyCallInterceptor'
//   callback(target: any, key: any, value: any): void;
// }

// tslint:disable
export function intercept<T>(o: T, interceptors?: Interceptor<T>[]): T {
  let obj = <any>o
  const oldProto = obj.prototype;
  const oldCtor = obj.prototype.constructor;
  obj = function () {
    return proxyGenerator(obj, interceptors);
  };
  obj.oldCtor = oldCtor;
  obj.prototype = oldProto;
  return obj;
}
