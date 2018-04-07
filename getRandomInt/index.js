/* 推理过程
  1. n < foo() < m 两边同时减去n
  2. 0 < foo() - n < m - n 两边同时除以m-n
  3. 0 < (foo() - n)/(m - n) < 1
  4. 0 < Math.random() < 1
  5. Math.random() = (foo() - n)/(m - n)
  6. foo() = Math.random()*(m - n) + n

  根据指定区间返回随机数
  @param {number} max
  @param {number} min
  @return {number}
*/
function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

module.exports = getRandomInt;
