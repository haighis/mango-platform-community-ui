import * as API from '.';

describe('Public API', () => {
  const methods = [
    'funcName'
  ];

  Object.keys(API).forEach((method) => {
    test(`${method} is available in the Public API`, () => {
      expect(methods).toContain(method);
    });
  });
});
