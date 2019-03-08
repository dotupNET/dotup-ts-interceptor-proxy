import { ICallInterceptor } from './ICallInterceptor';

export type Interceptor<T> = MethodInterceptor<T> | ICallInterceptor<T>;
// export type IInterceptor<T> = ICallInterceptor<T>; // | IAnyCallInterceptor;
// export type InterceptorFunction<T, K extends keyof T> = (target: T, key: K, value: T[K]) => void;
// export type CallInterceptor<T> = InterceptorFunction<T, keyof T>;
export type MethodInterceptor<T> = Partial<FunctionsOnly<T>>;
// export type PropertyInterceptor<T> = Partial<PropertiesOnly<T>>;
export declare type FunctionNamesOnly<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export declare type FunctionsOnly<T> = Pick<T, FunctionNamesOnly<T>>;
