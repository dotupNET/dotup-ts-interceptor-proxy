import { ICallInterceptor } from '../ICallInterceptor';
import { MethodInterceptor } from '../types';
import { Model } from './Model';

export const callInterceptor: ICallInterceptor<Model> = {
  kind: 'ICallInterceptor',
  callback(typeOfKey: string, target: Model, key: keyof Model, value: Model[keyof Model]): void {
    console.log('callInterceptor');
  }
};

export const methodInterceptor: MethodInterceptor<Model> = {
  getCount: () => {
    console.log('MethodInterceptor');

    return 4;
  },
  setName: (name: string) => {
    console.log(name);
  }
};
