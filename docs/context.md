# 新的 Context API

`react 16.3` 的特性里，更新了 `Context` `API`, 可以更方便地用于跨级组件通信。

## 旧的 Context 

这个 `API` 在 `16`之前已经存在了，其用法也很简单。


如组件 `MessageList` 定义了 `context`:

```
class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }
	
	...
}

MessageList.childContextTypes = {
  color: PropTypes.string
};

``` 

子组件就可以拿到这个值，而不必通过`props` 传值了。在组件嵌套复杂的情况下，能让代码更简洁些：


```
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

// 这个必须设置，否则获取不到 context 
Button.contextTypes = {
  color: PropTypes.string
};
```

完整代码：

```
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};
```

### 应用场景

如上，`context` 可以用于顶级组件向后代组件通信，通过设置函数，后代组件也可以向顶级组件通信。

如在顶级组件的 `context` 里定义一个函数 `helper`：

```
class MessageList extends React.Component {
  getChildContext() {
    return {
      color: "purple",
      helper: function (msg) {
        console.log(msg);
      }
    };
  }

	...
}

MessageList.childContextTypes = {
  color: PropTypes.string,
  helper: PropTypes.func
};

```


后代组件 `Button` 可以调用 `helper` 方法，向顶级组件传递数据:

```
class Button extends React.Component {
	
  render() {
    this.context.helper('button');
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string,
  helper: PropTypes.func
};
```

一些库如 `React Router V4` 也用到了这一特性。

### 注意点

更新组件 `context` 时，可能无法反馈到后代组件上，如果中间某个组件的 `shouldComponentUpdate` 返回 `false`。 

## 新 Context 

新的 `Context` 用法稍微复杂一些：

```
const {Provider, Consumer} = React.createContext('pink');

const ButtonWithNewContext = (props) => {
  return (
    <Consumer>
      {theme => <Button theme={theme}  {...props}/>}
    </Consumer>
  );
}

// 使用
// 这时使用的是默认值 `pink`
class App extends Component {
  render() {
    return (
      <div className="App">
			<ButtonWithNewContext/>
		</div>
	 )
  }
}

// 改写值为 `orange`
class App extends Component {
  render() {
    return (
      <div className="App">
			<Provider value="orange">
  				<ButtonWithNewContext/>
			</Provider>
		</div>
	 )
  }
}


// 这时无值
class App extends Component {
  render() {
    return (
      <div className="App">
			<Provider>
  				<ButtonWithNewContext/>
			</Provider>
		</div>
	 )
  }
}

```

与旧的 `context` 比，`context` 的值， 可以是实例的值了：

```
class App extends Component {
	construtor(props) {
	
		super(props);
		
		this.state = {
			context: {
				...
			}
		}	
	}
	
  render() {
    return (
      <div className="App">
			<Provider value={this.state.context}>
  				<ButtonWithNewContext/>
			</Provider>
		</div>
	 )
  }
}
```

可以更好地与组件实例结合，也不用设置静态类型检查了(但生产环境下标明下还是好些，方便以后阅读)。




## 新旧比较

1. `context` 单拎出来了， **组件化**了。

	这是最大的不同了吧。单提出来，成为独立的组件，方便日后的拓展和组合。
	
	这一点也是之后几点不同的基础吧。
	

2. 用法不一样。

	旧的用法
	
	```
	class MessageList extends React.Component {
	  getChildContext() {
	    return {color: "purple"};
	  }
		
		...
	}
	
	MessageList.childContextTypes = {
	  color: PropTypes.string
	};
	
	
	class Button extends React.Component {
	  render() {
	    return (
	      <button style={{background: this.context.color}}>
	        {this.props.children}
	      </button>
	    );
	  }
	}
	
	// 这个必须设置，否则获取不到 context 
	Button.contextTypes = {
	  color: PropTypes.string
	};
	```
	
	
	新的用法
	
	
	```
	const {Provider, Consumer} = React.createContext('pink');
	
	
	const example = (props) => {
		return (
			<Provider value="orange">
				<Consumer>
					{theme => <Button theme={theme} {...props}/>}
				</Consumer>
			</Provider>
		)
	}
	```
	
3. 新的 `API` 可以与实例结合，更方便更新了。参见上一节的最后的例子。


## 与 `redux` 比较  

1. `redux` 所指的不仅是 `reduxjs` 这个库， 也指的是它的生态，它不仅可以管理应用状态，还有对应的开发工具，相关的插件如 `redux-thunk` 和 `redux-saga` 等。
2. 在应用状态上， `context` 也可以做到。但相比 `redux`, 它还比较原始，没有相关的工具，至少当前是这样。


## 怎么选择

用 `context` 还是 `redux` ?

说实话，我也没想太清楚，也没见到。官方的例子说 `主题` `国际化` 或者 `用户信息` 可以放 `context` 里:

> Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

但就这些功能来说，用 `redux` 也不是不可以。

还有些人指出，`redux` 里要放真正属于应用的状态，跨终端的应用里，`redux` 里要存的是真正属于应用的状态。

> Ask yourself: can I use everything in my store to render an app elsewhere? A mobile app? A desktop app? A custom canvas UI? Is there anything I couldn't use in those? Then it probably doesn't belong in my store.

说得挺好的，但实际情况是，我们的应用，有这么复杂吗？需要跨终端吗？


我的理解是，结合业务场景与技术特点，选择合适就好 (像不像一句废话，哈哈)

1. `redux` 把应用的状态 `state` 和 `view` 分离开来了，方便代码管理和维护。也有丰富的开发工具，社区也有很多例子可够参考。如果目前想要一个状态管理库，可以选 `redux`;
2. 新的 `context` ，更组件化了，它能解决方便地多层组件通信问题。可用于处理应用级的状态。
3. 当然上面说的 `redux` 也能解决。看你更喜欢用哪个了。
4. 最后，还是看使用者的能否掌握得住 `context` 或 `redux`。如果用任意一个，能高效的解决问题，选谁都没问题。

目前而言，`redux` 更成熟些。但 `context` 也值持续关注。

## 参考

1. [react 官网 context](https://reactjs.org/docs/context.html)
2. [Legacy Context](https://reactjs.org/docs/legacy-context.html)
3. [对比React 16.3的新Context API和Redux](https://zhuanlan.zhihu.com/p/33829066)

## 推荐

1. [Hot Reloading with Time Travel at react-europe 2015](https://www.youtube.com/watch?v=xsSnOQynTHs)， Dan Abramov 介绍 `redux` 的视频

