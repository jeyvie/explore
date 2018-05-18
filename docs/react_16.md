# react 16 探索


 

## 新的调度方法

为了应对不同的设备情况和网络情况，开发了新的调度方法。有两个方面：
	
1. `time slicing`  这个是应对设备情况的。把任务分级，优先渲染用户感知的(利用 `requestIdleCallback`)。

2. `suspense` 这个处理的是网络情况，拿到数据后再渲染

参见

1. [Sneak Peek: Beyond React 16](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)
2. [Beyond React 16 by Dan Abramov](https://www.youtube.com/watch?v=v6iR3Zk4oDY) 介绍上面两点的视频

## 生命周期函数变动

据称因为异步渲染和大家使用姿势不符合官方预期，以下三个生命周期函数会被移除

* componentWillMount
* componentWillReceiveProps
* componentWillUpdate



新增了两个：

1. getDerivedStateFromProps

	
	```
	class Example extends React.Component {
	  static getDerivedStateFromProps(nextProps, prevState) {
	    // ...
	  }
	}
	```
	
	静态方法，组件
	
	1. 被实例化
	2. 或接受新参数时调用

	返回对象来更新 `state`, 或则 `null` 标明不需要更新
	
	可以用它取代 `componentWillReceiveProps`。能取代 `componentWillMount` 吗？待考察。
	
2. getSnapshotBeforeUpdate



	```
	class Example extends React.Component {
	  getSnapshotBeforeUpdate(prevProps, prevState) {
	    // ...
	  }
	}
	```

	在 `DOM` 更新前调用。返回值会作为`componentDidUpdate` 的第三个参数。可以代替 `componentWillUpdate`
	

## context API

[参见](./context.md)

### 参考

[Update on Async Rendering](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)	


