// Example from https://beta.reactjs.org/learn
import './index.scss'

const PageEvent = ({loadingInfo, ...otherProps}) => {




  function ready() {
    console.log('----DOM is ready------');
    alert('----DOM is ready------');
    let img=document.getElementById("img");
    
  
    // 图片目前尚未加载完成（除非已经被缓存），所以图片的大小为 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);


    img.onload = function () {
      console.log('img loaded')
    }
  }
  document.addEventListener("DOMContentLoaded", ready);



  window.addEventListener("load", function() {
    // Code to be executed after the page has finished loading
    // For example, manipulating DOM elements, making API calls, etc.
  
    // Accessing and manipulating DOM elements
    var element = document.getElementById("myElement");
    element.innerHTML = "Page loaded successfully!";
  
    // Making API calls or performing other actions
    
  });


  window.addEventListener("beforeunload", (event) => {
    // 可以在这里提示用户保存未保存的数据，或离开前确认提示
    event.preventDefault();
  
    // Prompt the confirmation message
    event.returnValue = ""; // Some browsers require a non-empty string
  
    // Return the confirmation message
    return "Are you sure you want to leave this page 是否确认离开?";
  });

  window.addEventListener("unload", function() {
    alert(`unload event triggered`)
  });


  return (
    <div className="css-center-section">
      <img id="img" src="/images/golden-retriever.png" />
      <div id="myElement" className='p-2 bg-gray-200 mt-1'>default content, the text should be changed to "Page loaded successfully!"</div>
    </div>
  );
};

export default PageEvent;

