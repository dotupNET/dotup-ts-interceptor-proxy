import { isICallInterceptor } from './ICallInterceptor';
import { Interceptor } from './types';

// tslint:disable
export function proxyGenerator(obj: any, interceptors?: Interceptor<any>[]) {
  const inter = interceptors === undefined ? undefined : (Array.isArray(interceptors) ? interceptors : [interceptors]);
  const handler = {
    interceptors: inter,
    get(target: any, propKey: any, receiver: any) {
      const targetValue = Reflect.get(target, propKey, receiver);
      const ou = this;
      if (typeof targetValue === 'function') {
        const origMethod = target[propKey];
        return function (...args: any[]) {
          const result = origMethod.apply(target, args);
          ou.callInterceptors(ou.interceptors, typeof targetValue, target, propKey, args);
          return result;
        };
      }
      else {
        this.callInterceptors(ou.interceptors, typeof targetValue, target, propKey, targetValue);
        return targetValue;
      }
    },
    callInterceptors(interceptors: Interceptor<any>[], typeOfKey: string, target: any, propKey: any, ...targetValue: any[]) {
      if (interceptors) {
        interceptors.forEach(inter => {
          // if (isIAnyCallInterceptor(inter)) {
          //   (<Function>(<any>inter).callback).apply(target, [target, propKey, ...targetValue]);
          // } else 
          if (isICallInterceptor(inter)) {
            (<Function>(<any>inter).callback).apply(target, [typeOfKey, target, propKey, ...targetValue]);
          }
          else {
            const ja = Object.keys(inter).includes(propKey);
            if (ja) {
              (<any>inter)[propKey].apply(target, ...targetValue);
            }
          }
        });
      }
    }
  };
  const x = new obj.oldCtor();
  return new Proxy(x, handler);
}
