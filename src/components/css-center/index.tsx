// Example from https://beta.reactjs.org/learn
import * as styles from './index.module.css'

const CssCenter = ({loadingInfo, ...otherProps}) => {
  return (
    <div className='css-center-section'>
      <h3 className={styles.heading}>css center</h3>
      <h4 className='my-2'>最常见的水平垂直居中实现方案</h4>
     

      <section className='mt-10 bg-gray-400 p-2'>
        <h4 className='my-2'>使用 flex布局, flex 居中</h4>
        <p>.parent class: flex justify-center items-center h-80</p>
        <p>.child class:</p>
        <div class="flex justify-center items-center h-80 parent bg-gray-100 p-4 ">
          <p className='w-1/3 bg-cyan-400'>Chind content, In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.</p>
        </div>
      </section>
  

      <h4 className='my-2'>To horizontally center a block element, use margin: auto; 水平居中</h4>
      <p>.parent class: </p>
      <p>.child class: m-auto w-20</p>
      <div class="parent bg-gray-100 p-4">
        <div class="child bg-teal-600 m-auto w-20">
          <p>Hello World!</p>
        </div>
      </div>

      <h4 className='my-2'>Center an Image, set left and right margin to auto and make it into a block element:</h4>
      <p>.parent class: </p>
      <p>.child class: m-auto w-1/2 block</p>
      <div class="parent bg-gray-100 p-4">
        <img src="/images/graphql/graphql_operation_types.jpg" class="child bg-teal-600 m-auto w-1/2 block" alt="center" />
      </div>

      <h4 className='my-2'> Left and Right Align - Using position:</h4>
      <p>.parent class: relative</p>
      <p>.child class: absolute w-1/3 right-0</p>
      <div class="parent bg-gray-100 p-4 relative">
        <p className='absolute w-1/3 right-0 bg-cyan-400 opacity-75'>Chind content, In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.</p>
      </div>
      <p className='bg-yellow-300'>Note: Absolute positioned elements are removed from the normal flow, and can overlap elements.</p>
      <p className='bg-yellow-200 w-72'>Note: Absolute positioned elements are removed from the normal flow, and can overlap elements.</p>
      

      <section className=''>
        <h4 className='my-2'> Left and Right Align - Using float</h4>
        <p>.parent class:</p>
        <p>.child class: float-right w-1/3</p>
        <div class="parent bg-gray-100 p-4">
          <p className='float-right w-1/3 bg-cyan-400 opacity-75'>Chind content, In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.</p>
        </div>
      </section>
      
      <section className='mt-52 bg-gray-400 p-2'>
        <h4 className='my-2'> clearfix hack/ flow-root</h4>
        <p className='my-2 bg-yellow-300'> Note: If an element is taller than the element containing it, and it is floated, it will overflow outside of its container. You can use the "clearfix hack" to fix this (see example below).</p>
        <p>In tailwind, the clearfix class has been removed since flow-root is a simpler solution to the same problem in modern browsers.</p>
        <p>.parent class: flow-root</p>
        <p>.child class: float-right w-1/3</p>
        <div class="parent bg-gray-100 p-4 flow-root">
          <p className='float-right w-1/3 bg-cyan-400 opacity-75'>Chind content, In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.</p>
        </div>
      </section>

      <section className='mt-52 bg-gray-400 p-2'>
        <h4 className='my-2'>Center Vertically - Using position & transform</h4>
        <p>.parent class: relative h-80</p>
        <p>.child class: absolute w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2</p>
        <div class="relative h-80 parent bg-gray-100 p-4">
          <p className='absolute w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400'>Chind content, In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.</p>
        </div>
      </section>

      


     
      
    </div>
  );
};

export default CssCenter;

