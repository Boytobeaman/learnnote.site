// Example from https://beta.reactjs.org/learn
import './index.scss'

import React, {useEffect} from 'react';

const PageEvent = ({loadingInfo, ...otherProps}) => {
  
  useEffect(()=>{

    console.log(`react useEffect called`)

  },[])


  return (
    <div className="css-center-section">
      <script
        dangerouslySetInnerHTML={{
          __html: `
          console.log('script in component runing')
          function ready() {
            console.log('----DOM is ready------');
            alert('----DOM is ready------');
            let img=document.getElementById("img");
        
            img.onload = function () {
              console.log('img loaded')
            }
          }
          document.addEventListener("DOMContentLoaded", ready);
        
        
          window.addEventListener("load", function() {
            // Code to be executed after the page has finished loading
            // For example, manipulating DOM elements, making API calls, etc.
            console.log('page load event triggered')
          
            // Accessing and manipulating DOM elements
            let element = document.getElementById("myElement");
            console.log(element)
            element.innerHTML = "Page loaded successfully!";
          
            // Making API calls or performing other actions
            
          });
        
        
          window.addEventListener("beforeunload", (event) => {
            // 可以在这里提示用户保存未保存的数据，或离开前确认提示
            event.preventDefault();
          
            // Prompt the confirmation message
            event.returnValue = "Are you sure you want to leave this page 是否确认离开?"; // Some browsers require a non-empty string
            //由于安全问题，window.onbeforeunload 已经不能自定义提示信息了，下面设置信息也是没用的
            // Return the confirmation message
            return "Are you sure you want to leave this page 是否确认离开?";
          });
        
          window.addEventListener("unload", function() {
            alert('unload event triggered')
          });
        `,
        }}
      />
      <img id="img" src="/images/golden-retriever.png" />
      <div id="myElement" className='p-2 bg-gray-200 mt-1'>default content, the text should be changed to "Page loaded successfully!"</div>
    </div>
  );
};

export default PageEvent;

