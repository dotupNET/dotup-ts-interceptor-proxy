import { logMethodCallInterceptor } from './BuildInInterceptor';
import { ICallInterceptor } from './ICallInterceptor';
import { intercept } from './Interceptor';
import { Model } from './test/Model';
import { MethodInterceptor } from './types';

const callInterceptor: ICallInterceptor<Model> = {
  kind: 'ICallInterceptor',
  callback(typeOfKey: string, target: Model, key: keyof Model, value: Model[keyof Model]): void {
    console.log('callInterceptor');
  }
};

const mi: MethodInterceptor<Model> = {
  getCount: () => {
    console.log('MethodInterceptor');

    return 4;
  },
  setName: (name: string) => {
    console.log(name);
  }
};

const nameInterceptor: MethodInterceptor<Model> = {
  setName: (name: string) => {
    const c = name;
  }
};

const myIntercepter = [logMethodCallInterceptor, callInterceptor, mi];

// @ts-ignore
// tslint:disable-next-line: no-unsafe-any
Model = intercept(Model, myIntercepter);

const model = new Model();
model.count = 7;
const count = model.getCount();
model.setName('oha');
console.log(model.name);
