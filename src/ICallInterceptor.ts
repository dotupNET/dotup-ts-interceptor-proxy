export declare interface ICallInterceptor<T> {
  kind: 'ICallInterceptor';
  callback<K extends keyof T>(typeOfKey: string, target: T, key: K, value: T[K]): void;
}

// tslint:disable-next-line: no-any
export function isICallInterceptor<T>(object: any): object is ICallInterceptor<T> {
  // tslint:disable-next-line: no-unsafe-any
  return object.kind === 'ICallInterceptor';
}

// function isIAnyCallInterceptor(object: any): object is IAnyCallInterceptor {
//   return object.kind === 'IAnyCallInterceptor';
// }
