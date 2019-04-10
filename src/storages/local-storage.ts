export interface ETStoreState<T> {
  indexes: string[];
  entities: {
    [key: string]: T[];
  };
}

const getInitETStoreState = () => ({
  indexes: [],
  entities: {}
});

export class LocalStorage<T> {
  private readonly state: ETStoreState<T>;

  constructor(
    private localStorage: Storage | undefined,
    private STORAGE_KEY: string,
    private getKey: (item: T) => string
  ) {
    if (!this.localStorage) {
      this.state = getInitETStoreState();

      return;
    }

    let savedStorage = this.localStorage.getItem(this.STORAGE_KEY);

    if (!savedStorage) {
      this.state = getInitETStoreState();

      return;
    }

    const { entities, indexes } = JSON.parse(savedStorage);

    this.state = {
      entities,
      indexes
    };
  }

  public store(item: T): void {
    const key = this.getKey(item);

    if (!this.state.entities[key]) {
      this.state.entities[key] = [];
      this.state.indexes.push(key);
    }

    this.state.entities[key].push(item);

    if (this.localStorage) {
      this.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    }
  }

  public getByItem(item: T): T[] {
    return this.state.entities[this.getKey(item)];
  }
}
