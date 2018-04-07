var getRandomInt = require('./index');
test('getRandomInt(20, 10)返回10到20内的一个整数', () => {
  expect(getRandomInt(20, 10)).toBeGreaterThan(10);
  expect(getRandomInt(20, 10)).toBeLessThan(20);
});
