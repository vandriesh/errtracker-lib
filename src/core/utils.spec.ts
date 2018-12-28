import Utils from './utils';

describe('ErrTracker', () => {
  it('should be defined', () => {
    expect(Utils).toBeDefined();
    expect(Utils.toArray).toBeDefined();
  });

  it('should convert to array', () => {
    expect(Utils.toArray({ a: 1, b: 2 })).toEqual(['a: 1', 'b: 2']);
  });
});
