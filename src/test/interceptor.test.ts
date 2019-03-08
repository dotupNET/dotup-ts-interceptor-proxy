// tslint:disable-next-line: no-implicit-dependencies
import { expect } from 'chai';
import { ICallInterceptor } from '../ICallInterceptor';
import { intercept } from '../Interceptor';
import { Interceptor, MethodInterceptor } from '../types';
import { Model } from './Model';

// tslint:disable: chai-vague-errors
// tslint:disable: newline-per-chained-call

// tslint:disable-next-line: no-any
function interceptModel(interceptors?: Interceptor<any>) {
  // @ts-ignore
  Model = intercept(Model, interceptors);
}

const name1 = 'MyName';

describe('intercept:', () => {

  it('should create a instance of the class', () => {
    interceptModel();
    const newModel = new Model();
    expect(newModel).not.equal(undefined);
  });

  it('should set internal var with "setName" method', () => {
    const nameInterceptor: MethodInterceptor<Model> = {
      setName: (name: string) => { }
    };

    interceptModel(nameInterceptor);

    const newModel = new Model();
    newModel.setName(name1);
    expect(newModel.name).equal(name1);
  });

  it('should intercept method call "setName"', () => {
    let newName: string;

    const nameInterceptor: MethodInterceptor<Model> = {
      setName: (name: string) => {
        newName = name;
      }
    };

    interceptModel(nameInterceptor);

    const newModel = new Model();
    newModel.setName(name1);
    expect(newName).equal(name1);
  });

  it('should intercept each method call', () => {
    // tslint:disable-next-line: one-variable-per-declaration : no-any
    let _typeOfKey, _target: any, _key, _value: any;

    const callInterceptor: ICallInterceptor<Model> = {
      kind: 'ICallInterceptor',
      // tslint:disable-next-line: no-any
      callback(typeOfKey: string, target: Model, key: keyof Model, value: any): void {
        _typeOfKey = typeOfKey;
        _target = target;
        _key = key;
        // tslint:disable-next-line: no-unsafe-any
        _value = value[0];
      }
    };

    interceptModel(callInterceptor);

    const newModel = new Model();
    newModel.setName(name1);

    expect(_typeOfKey).equal('function');
    expect(_target).instanceOf(Model);
    expect(_key).equal('setName');
    expect(_value).equal(name1);
  });

});
