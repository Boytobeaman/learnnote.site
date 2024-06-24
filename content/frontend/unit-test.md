---
title: "前端单元测试"
metaTitle: "前端单元测试，jest 框架"
metaDescription: "前端单元测试，jest 框架，如何使用前端单元测试，常见的前端单元测试框架jest"
---

### 前端框架jest

速度快
API 简单
易配置
容易生成覆盖率报告
Mock 丰富
等等


### TDD VS BDD


#### package.json script
```
{
  "scripts": {
    "test": "react-scripts test",//create react app 默认集成了jest
    "test": "jest", //自己安装 jest
    "test": "jest --coverage", //生成 coverage 报告，相当于 jest.config.js 里面配置 collectCoverage: true
    "test": "jest --watch", //开启watch 模式的 o 模式, 只测试改变的文件的相关测试，o 模式前提是项目安装git，只有这样才可以监控到那些代码改动了
    "test": "jest --watchAll", //开启watch 模式, Watch mode also enables to specify the name or path to a file to focus on a specific set of tests.
  },
}
```

#### 配置文件
```
根目录下
jest.config.js


module.exports = {

  // 是否生成测试率报告
  collectCoverage: true, 

  //测试率报告生成目录（跟目录下）
  coverageDirectory: "coverage", 

  // 测试代码环境，浏览器或者nodejs, The test environment that will be used for testing
  testEnvironment: "jsdom",

  // 指定覆盖率
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      lines: 80,
    },
    "src/componentA.ts": {
      branches: 100,
      lines: 0,
    },
    "src/componentB.ts": {
      branches: 92,
      lines: 92,
    },
  }
}

  
```

#### example
```
import { render, screen } from '@testing-library/react';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

####  Jest tests with coverage for one specific file
```
jest test-file-name --coverage

eg:
jest test/myTest.spec.ts --coverage


如果jest 只是安装在项目中，没有全局安装，可以使用npx 命令运行
npx jest tests/example.test.js  
```

#### 断言常用语句

[断言官方文档!](https://jestjs.io/docs/expect)
```
expect().toEqual()


const a = null;
expect(a).toBeNull()


```

#### Repeating Setup For Many Tests
```
//If you have some work you need to do repeatedly for many tests, you can use beforeEach and afterEach.
beforeEach( () => {
  console.log('before each------111')
})

afterEach( () => {
  console.log('after each-------222')
})



//In some cases, you only need to do setup once, at the beginning of a file.
beforeAll( () => {
  console.log('before ALL------111')
})

afterAll( () => {
  console.log('after ALL-------222')
})

```

#### Scoping 作用域
```
By default, the before and after blocks apply to every test in a file. You can also group tests together using a describe block. When they are inside a describe block, the before and after blocks only apply to the tests within that describe block.

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```


### 异步代码的测试方法
#### 回调函数类型
```
test('fetchData 返回结果为 。。。', (done) => {
  fetchData((data) => {
    expect(data.status).toEqual(200);
    //注意这里要调用一下done()才可以
    done();
  })
})

```
#### promise 类型
```
test('fetchDataPromise 返回结果为 。。。', () => {
  //前面加return
  return fetchDataPromise().then(response => {
    expect(response.status).toEqual(200)
  })
})


test('fetchDataPromiseError 返回结果为 。。。', () => {
  //测试接口返回404的场景，必须要走catch 里面的逻辑，要加expect.assertions(1),表示catch 里面的expect必须要执行到
  //不然fetchDataPromiseError 这个方法如果能返回正常，也是测试通过的，因为正常的话就走不到catch的逻辑

  expect.assertions(1);
  return fetchDataPromiseError().catch(e => {
    expect(e.toString().indexOf('404') > -1).toBe(true);
  })
})


// async await 方式

test('fetchDataPromise 返回结果(async await)为 。。。', async () => {
  const response = await fetchDataPromise();
  expect(response.status).toEqual(200)
})

test('fetchDataPromiseError 返回结果(async await)为 。。。', async () => {
  expect.assertions(1);
  try {
    await fetchDataPromiseError();
  } catch (e) {
    expect(e.toString().indexOf("404") > -1).toBe(true)
  }
})
```
### Mock
```
```

### 相关插件
```
vs code 编辑器可以安装 Jest 插件，这个插件安装后可以主动帮我们跑测试脚本，并且每个测试用例的通过状态都会直观显示出来，不用我们再yarn test 跑脚本了
```


### 相关名词
TDD (Test Driven Development) 测试驱动的开发
BDD (Behavior Driven Development) 行为驱动开发
E2E (End To End) 即端对端测试,属于黑盒测试,通过编写测试用例,自动化模拟用户操作,确保组件间通信正常,程序流数据传递如预期。

通常对于函数库，比如像lodash 这样的，一般用TDD 模式的单元测试，确保比较高的代码覆盖率；
对应前端业务代码，一般用BDD模式的集成测试， 确保核心逻辑、主流程功能正常


### 使用 enzyme 测试html 页面 元素
```
https://enzymejs.github.io/enzyme/


安装依赖
npm i --save-dev enzyme enzyme-adapter-react-16


Example:
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './index'

Enzyme.configure({ adapter: new Adapter() });

test('renders without crashing', () => {

  const wrapper = shallow(<App />)
  expect(wrapper.find('.app').length).toBe(2);
})

```

### 集成jest-enzyme
```
安装依赖
yarn add jest-enzyme --dev

配置 jest.config.js
setupFilesAfterEnv: [
  './node_modules/jest-enzyme/lib/index.js'
],


或者在package.json 里面配置 jest
// package.json
"jest": {
  "setupFilesAfterEnv": ['./node_modules/jest-enzyme/lib/index.js'],
}
```
### 获取HTML元素
```
screen.getByText()
screen.getByText('Hello World') 

screen.getByRole('link', { name: /terms and conditions/i })
screen.getByRole('button', { name: /submit/i })
```



### 项目测试目录结构