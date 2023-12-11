// Example from https://beta.reactjs.org/learn
import React, {useState, useEffect} from 'react';
import * as styles from './index.module.css'
import { Input } from 'antd';

const FormatCurrency = () => {

  const [currency, setCurrency] = useState(12345.67)
  const [formattedCurrency, setFormattedCurrency] = useState('')


  function formatDollarValue(value) {
      value=Number(value);
      return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }


  const pageFun = `
    function formatDollarValue(value) {
      value=Number(value);
      return '$' + value.toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,');
    }

    function formatCurrency(val) {
      return val.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      });
    }
    // 中国元
    // num.toLocaleString("zh-CN", {style:"currency", currency:"CNY"});
  `


  useEffect(() => {
    if(currency){
      let output = formatDollarValue(currency);
      setFormattedCurrency(output)
    }

  },[currency])


  return (
    <div className='css-center-section'>
     

      <section className='mt-10 p-2'>
        <h4 className='my-2'>How to Format a Number as Currency in JavaScript</h4>
        
        <div class="flex gap-5 flex-col justify-center items-center h-auto parent bg-white p-4 shadow">
          <Input placeholder="Input currency" type='number' value={currency} onChange={(e)=> setCurrency(e.target.value)} />
          <p>{formattedCurrency}</p>
          <pre>
            {pageFun}
          </pre>
        </div>
      </section>

  

    </div>
  );
};

export default FormatCurrency;

