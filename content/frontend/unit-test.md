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

```

### 获取HTML元素
```
screen.getByText()
screen.getByText('Hello World') 

screen.getByRole('link', { name: /terms and conditions/i })
screen.getByRole('button', { name: /submit/i })
```



### 项目测试目录结构