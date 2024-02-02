
# window-callback
> window回调函数管理

## 安装

```bash
# npm
npm install window-callback
# yarn
yarn add window-callback
# pnpm
pnpm add window-callback
```

## 使用

```js
  const { callbackManager } = require('window-callback');
  const handleDemo = () => {
    console.log('demo')
  };
  // 原来的方式，这样会多次声明会被覆盖
  // window.demo = handleDemo;
  // 添加事件回调
  callbackManager.add('demo', handleDemo);
  // 删除某个事件回调
  callbackManager.remove('demo', handleDemo);
  // 清空事件回调
  callbackManager.clear('demo')
```

## 需要自定义事件类型

```js
  const { callbackManager } = require('window-callback');
  const handleDemo = (data) => {
    console.log('demo', data)
  };
  const type = 1
  // 自定义注册事件
  callbackManager.register('demo', (dispatch) => {
    if (type === 1) {
      window.demo1 = (...data) => {
        dispatch('demo', ...data);
      }
    } else {
      window.demo2 = (...data) => {
        dispatch('demo', ...data)
      }
    }
  })
  callbackManager.add('demo', handleDemo);
```

