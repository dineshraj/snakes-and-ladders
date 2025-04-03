import hello from './';

describe('App', () => {
  it('returns hello', () => {
    const value = hello();

    expect(value).toBe('hello');
  })
})