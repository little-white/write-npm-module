# 发布一个npm module

前端的同学在项目中经常会用到各种npm modules，那如何写一个自己的npm module呢？本文从零教大家一步步写一个自己的npm module。

* [创建一个账号](#account)
* [命令行登录](#login)
* [创建npm module目录](#create)
* [写一个简单的module](#write)
* [单元测试](#test)
* [发布](#publish)
* [全局包](#global)
* [项目包验证](#local-test)
* [全局包验证](#global-test)

### <a name="account"></a>创建一个账号

访问[npm官网](https://www.npmjs.com/)注册账号，如果已注册就登录进去。

### <a name="login"></a>命令行登录

```shell
npm login // 输入账号、密码、邮箱
npm whoami // 我这里输出了supershy
```

### <a name="create"></a>创建npm module的目录

```shell
mkdir getRandomInt && cd getRandomInt
npm init -y //初始化package.json
```

### <a name="write"></a>写一个简单的module

新建index.js并写入以下代码

```javascript
/* 推理过程
  1. n < foo() < m 两边同时减去m
  2. 0 < foo() - m < m - n 两边同时除以m-n
  3. 0 < (foo() - m)/(m - n) < 1
  4. 0 < Math.random() < 1
  5. Math.random() = (foo() - m)/(m - n)
  6. foo() = Math.random()*(m - n) + m

  根据指定区间返回随机数
  @param {number} max
  @param {number} min
  @return {number}
*/
function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min) + max);
}

module.exports = getRandomInt;
```

到了这就已经可以发布了，但为了养成良好的编码习惯，我们需要对这个npm module加入测试代码。

### <a name="test"></a>单元测试

```
npm install -S jest
```

**创建index.test.js文件**

```javascript
var getRandomInt = require('./index');
test('getRandomInt(20, 10)返回10到20内的一个整数', () => {
  expect(getRandomInt(20, 10)).toBeGreaterThan(10);
  expect(getRandomInt(20, 10)).toBeLessThan(20);
});
```

**验证**

```shell
npm test
```

### <a name="publish"></a>发布

```shell
npm publish
```

> **ps：发布的时候遇到了个小坑，npm module的名字不支持驼峰，在发布的时候会报invalid的错误，需要在package.json中将name改为get-random-int即可发布。**

发布成功后可以在https://www.npmjs.com/~你的username找到你的npm module，我的这个包的地址是https://www.npmjs.com/package/get-random-int

### <a name="global"></a>支持全局

我们先看一个简单的例子，首先新建个global

```javascript
#!/usr/bin/env node
console.log(process.argv.slice(2))
```

第一行表明global.js的执行环境是node，当我们给它一定的权限就变成了可执行文件

```shell
chmod 777 global # 加上可执行权限
./global 20 10 # ['20', '10']
```

我们把global文件移动到我们的xxx/bin（我用了nvm来控制node的版本，我这里的是/Users/supershy/.nvm/versions/node/v9.4.0/bin）下，并也加上可执行的权限，此时当我们在任意目录访问输入global 20 10时，它可以打印出['20', '10']，也就是变成了全局的可执行命令了。

用npm中其实是一样的，我们需要在package.json中需要指定bin的执行文件，当全局安装了npm module会在我们的xxx/bin下创建这个执行文件，这样全局的npm module就创建成功了！

**在getRandomInt/bin目录下创建index.js文件，内容如下**

```javascript
#!/usr/bin/env node
var getRandomInt = require('../index')
var arguments = process.argv.slice(2)
console.log(getRandomInt(parseInt(arguments[0]), parseInt(arguments[1])))
```

**在package.json中加入bin的配置**

```json
{
    ...
    "main": "index.js",
    "bin": "./bin/index.js",
    ...
}
```

现在再次发布即可

```shell
npm version patch # 每次发布需要修改version的值，当然也可以手动更改
npm publish
```

### <a name="local-test"></a>项目包验证

```shell
mkdir local-test && cd local-test
npm install -S get-rarndom-int
```

```javascript
// local-test/test.js
var getRandomInt = require('get-rarndom-int');
console.log(getRandomInt(10, 5))
```

```shell
node test.js # 6 or 7 or 8 or 9
```

### <a name="global-test"></a>全局包验证

```shell
mkdir global-test && cd global-test
npm install -g get-rarndom-int
get-rarndom-int 10 5 # 6 or 7 or 8 or 9
```