export class Model {
  public count: number;
  public name: string;

  getCount(): number {
    return this.count;
  }

  setName(name: string) {
    this.name = name;
  }
}
