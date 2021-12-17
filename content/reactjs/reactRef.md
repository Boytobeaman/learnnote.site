---
title: "react Ref"
metaTitle: "react Ref, React.creatRef 的用法"
metaDescription: "react Ref, React.creatRef 的用法"
---

### 父组件 利用ref 控制子组件的元素

```
// 父组件
class Testc extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.ChildInputRef = React.createRef()
  }
  focusChildInput = () => {
    this.ChildInputRef.current.focusInput()
  }

  render(){
    return(
      <div className="container">
        <ChildInput ref={this.ChildInputRef} />
        <button onClick={this.focusChildInput}>Focus child input</button>
      </div>
    )
  }
}


//子组件
class ChildInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.inputRef = React.createRef();
  }
  focusInput () {
    this.inputRef.current.focus()
  }
  
  render(){
    return(
      <div className="container testc-wrap">
        <h1 className="">Test page c</h1>
        <input type="text" ref={this.inputRef}/>
      </div>
    )
  }
}

step:
1. 父组件 创建子组件的 ref 并传给子组件
this.ChildInputRef = React.createRef()
<input type="text" ref={this.inputRef}/>

2. 父组件自己的方法里就可以拿到子组件节点和子组件的方法，以控制子组件
focusChildInput = () => {
  this.ChildInputRef.current.focusInput()
}

3. 子组件自己在节点里可以定义自己的元素 ref,并写自己的方法控制它，父组件可以拿到子组件里面定义的方法 focusInput()
this.inputRef = React.createRef();
focusInput () {
  this.inputRef.current.focus()
}
<input type="text" ref={this.inputRef}/>

```
#### 注意
如果 ChildInputRef 在 modal里或者 在tab 里，没有实际渲染，
则 componentDidMount 里 this.ChildInputRef.current 为 null

### 父组件利用 forwardRef 直接控制 子组件的某个元素

```
//父组件
class FRParentInput extends Component {
  constructor(props){
    super(props)
    this.inputRef = React.createRef();
  }
  focusChildInput = () => {
    this.inputRef.current.focus()
  }
  render() {
    return (
      <div>
        <FRInput ref={this.inputRef} />
        <button onClick={this.focusChildInput}>Focus child input</button>
      </div>
    );
  }
}

//子组件
const FRInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  );
}) 

区别：
第一种是拿到子组件的ref,进而控制子组件的方法,子组件的方法控制子组件的元素
第二种是 父组件直接控制了子组件的某个元素，父组件创建的ref 直接赋给了子组件的元素input


问题：如何传递多个ref 到子组件？
// Parent
ref={{
    ref1: this.ref1,
    ref2: this.ref2
}}

// Child
export default React.forwardRef((props, ref) => {
  const { ref1, ref2 } = ref;

  return (
    <Child1
      {...props}
      ref={ref1}
    />
    <Child2
      {...props}
      ref={ref2}
    />
  );
});

```


### ref 如何绑定到 ant design HOC 内 form 组件, 以便父组件里直接调用子组件的方法，使用 wrappedComponentRef 属性


比如父组件调用 HOC 包裹的子组件内部的 方法

#### 父组件
```
import HeikForm from './haikeForm'


class IOTCertification extends React.Component {
  constructor(props) {
		super(props);
		this.state = {

		}
		this.HaiKeRef = React.createRef();
	}
  haikeCertification = () => {
		if(this.HaiKeRef.handleSubmit){
			this.HaiKeRef.handleSubmit()
			.then( res => {
				
			})
			.catch( err => {

			})
		}
	}

  render() {
    return (
      <HeikForm 
        haikeCertification={this.haikeCertification}
        wrappedComponentRef={(inst)=>this.HaiKeRef = inst} 
      />
    )
  }
}




```
#### 被HOC 包裹的子组件 HaikeForm
```
class HaikeForm extends React.Component {
  handleSubmit = e => {
    // e.preventDefault();
  };
}

const HOCForm = Form.create({ name: 'normal_login' })(HaikeForm);


export default connect(
	({ IOTDataModel }) => ({}),
	(dispatch) => ({
		IOTPointAuthGET(cb) {
			dispatch({ "type": "IOTDataModel/IOTPointAuthGET", cb })
		},
	})
)(HOCForm);
```


#### 如何直接传 ref 让HOC 里面的form 接收到
```
//HOC 组件

const WrappedForm = Form.create({ name: 'saveAsIOTComForm' })(App);

const theWrappedForm = (props) =>{
  const {forwardedRef, ...otherProps} = props
  return <WrappedForm {...otherProps} ref={forwardedRef} />
}

const HOC = withTranslation()(theWrappedForm)


export default React.forwardRef((props, ref) => {
  return <HOC {...props} forwardedRef={ref} />;
});


// 父组件可以直接传ref
// 原理是子组件（HOC）使用 forwardRef 可以接收到父组件传来的ref,然后 传递赋值到 具体的form ref中。

<SaveAsIOTComForm 
  ref={SaveAsIOTComFormRef} 
  visible={showSaveAsComponentModal} 
  IOTcheckKeys={IOTcheckKeys} 
/>



```