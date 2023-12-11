// Example from https://beta.reactjs.org/learn
import * as styles from './index.module.css'

const CssEffect = ({loadingInfo, ...otherProps}) => {
  return (
    <div className='css-center-section'>
     

      <section className='mt-10 p-2'>
        <h4 className='my-2'>css box shadow</h4>
        <p>The box-shadow property creates a rectangular shadow behind an element’s entire box. </p>
        <div class="flex gap-5 flex-col justify-center items-center h-auto parent bg-white p-4 shadow">
          <p className='w-1/3 p-2 bg-grey-400 shadow-sm'>
            .shadow-sm
          </p>
          <p className='w-1/3 p-2 bg-grey-400 shadow'>
            .shadow
          </p>
          <p className='w-1/3 p-2 bg-grey-400 shadow-md'>
            .shadow-md
          </p>
          <p className='w-1/3 p-2 bg-grey-400 shadow-lg'>
            .shadow-lg
          </p>
          <p className='w-1/3 p-2 bg-grey-400 shadow-xl'>
            .shadow-xl
          </p>
          <p className='w-1/3 p-2 bg-grey-400 shadow-2xl'>
            .shadow-2xl
          </p>
          <p className='w-1/3 p-2 bg-grey-400 shadow-inner'>
            .shadow-inner
          </p>
          <p className='w-1/3 p-2 bg-grey-400 shadow-none'>
            .shadow-none
          </p>
          
        </div>
      </section>
      <section className='mt-10 p-2'>
        <h4 className='my-2'>CSS Drop Shadow</h4>
        <p>Using drop-shadow allows us to add a shadow to an element that doesn’t correspond to its bounding box, but instead uses the element’s alpha mask. We could add a drop shadow to a transparent PNG or SVG logo</p>
       
        <div class="flex gap-5 flex-col justify-center items-center h-auto parent bg-white p-4 shadow">

          <div class="flex flex-col items-center shrink-0">
            <p class="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-sm</p>
            <svg class="drop-shadow-sm h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div class="flex flex-col items-center shrink-0">
            <p class="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow</p>
            <svg class="drop-shadow h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div class="flex flex-col items-center shrink-0">
            <p class="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-md</p>
            <svg class="drop-shadow-md h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div class="flex flex-col items-center shrink-0">
            <p class="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-lg</p>
            <svg class="drop-shadow-lg h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div class="flex flex-col items-center shrink-0">
            <p class="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-xl</p>
            <svg class="drop-shadow-xl h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div class="flex flex-col items-center shrink-0">
            <p class="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-2xl</p>
            <svg class="drop-shadow-2xl h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>

          
        </div>
      </section>
  

    </div>
  );
};

export default CssEffect;

