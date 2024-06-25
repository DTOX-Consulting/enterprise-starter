import { BehaviorSubject } from 'rxjs';

type StateValue = Record<string, unknown>;

export class State<T extends StateValue> {
  private state: BehaviorSubject<T>;

  constructor(initialState: T = {} as T) {
    this.state = new BehaviorSubject<T>(initialState);
  }

  public getState = () => this.state;

  public get = () => this.state.getValue();

  public observe = () => this.state.asObservable();

  public set = (value: T) => this.state.next(value);

  public getValue = <K extends keyof T>(key: K): T[K] => this.get()[key];

  public setValue = <K extends keyof T>(key: K, value: T[K]) =>
    this.state.next({
      ...this.get(),
      [key]: value
    });
}
