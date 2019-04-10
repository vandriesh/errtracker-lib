import { ETStoreState, LocalStorage } from './local-storage';
import { getErrorEventId } from '../report-strategies/report-first-strategy';
import { ETErrorEvent } from '../core/ETErrorEvent';

describe('LocalStorage', () => {
  let instance: LocalStorage<ETErrorEvent>;
  let storageSpy: Storage;
  const item: ETErrorEvent = {
    lineno: 13,
    colno: 1,
    filename: 'qqq',
    error: { error: 'error' },
    message: 'message'
  };

  describe('with localStorage support', () => {
    beforeEach(() => {
      const getItem = jest.fn();
      const setItem = jest.fn();
      const removeItem = jest.fn();
      const clear = jest.fn();

      storageSpy = {
        getItem,
        setItem,
        removeItem,
        length: 0,
        clear,
        key: (index: number): any => {
          return null;
        }
      } as Storage;

      instance = new LocalStorage<ETErrorEvent>(storageSpy, 'MY_ID', getErrorEventId);
    });

    it('should be defined', function() {
      expect(instance.getByItem).toBeDefined();
      expect(instance.store).toBeDefined();
    });

    it('should return nothing (nothing stored)', function() {
      const out = instance.getByItem(item);

      expect(out).not.toBeDefined();
    });

    it('should store an item', function() {
      instance.store(item);
      const state: ETStoreState<ETErrorEvent> = {
        indexes: [],
        entities: {}
      };
      const id = getErrorEventId(item);
      state.entities[id] = [item];
      state.indexes.push(id);

      expect(storageSpy.setItem).toHaveBeenCalledWith('MY_ID', JSON.stringify(state));
    });

    it('should read storage value and init with it', function() {
      const initStore: ETStoreState<ETErrorEvent> = {
        indexes: [],
        entities: {}
      };

      const id = getErrorEventId(item);
      initStore.entities[id] = [item];
      initStore.indexes.push(id);

      storageSpy.getItem = jest.fn().mockReturnValue(JSON.stringify(initStore));
      instance = new LocalStorage<ETErrorEvent>(storageSpy, 'MY_ID', getErrorEventId);

      const out = instance.getByItem(item);
      expect(out).toEqual([item]);
    });
  });

  describe('without localstorage support', () => {
    instance = new LocalStorage<ETErrorEvent>(void 0, 'MY_ID', getErrorEventId);

    const out = instance.getByItem(item);
    expect(out).not.toBeDefined();

    instance.store(item);
    const out1 = instance.getByItem(item);
    expect(out1).toEqual([item]);
  });
});
