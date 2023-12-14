// Example from https://beta.reactjs.org/learn
import * as styles from './index.module.css'

const CssEffect = ({loadingInfo, ...otherProps}) => {
  return (
    <div className='css-center-section'>
     

      <section className='mt-10 p-2'>
        <h4 className='my-2'>css box shadow</h4>
        <p>The box-shadow property creates a rectangular shadow behind an element’s entire box. </p>
        <div className="flex gap-5 flex-col justify-center items-center h-auto parent bg-white p-4 shadow">
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
       
        <div className="flex gap-5 flex-col justify-center items-center h-auto parent bg-white p-4 shadow">

          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-sm</p>
            <svg className="drop-shadow-sm h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow</p>
            <svg className="drop-shadow h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-md</p>
            <svg className="drop-shadow-md h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-lg</p>
            <svg className="drop-shadow-lg h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-xl</p>
            <svg className="drop-shadow-xl h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <p className="font-medium text-sm text-slate-500 font-mono text-center mb-3">drop-shadow-2xl</p>
            <svg className="drop-shadow-2xl h-28 w-28" viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0992 77L2.19922 42.5L22.0992 8H61.8992L81.7992 42.5L61.8992 77H22.0992Z" fill="#fff"></path>
            </svg>
          </div>

          
        </div>
      </section>
      <section>
        <div className="relative rounded-xl overflow-auto p-8">
          <div className="flex items-center justify-center">
            <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 !cursor-not-allowed" disabled="">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </button>
          </div>
        </div>
      </section>
  

    </div>
  );
};

export default CssEffect;

