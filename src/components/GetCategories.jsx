import React, {useState} from 'react'

const GetCategories = () => {
    const [data,setData]=useState([])
    const getCategories =()=>{
        fetchData();
    }
    const fetchData = async () => {
      const res = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );
      const json = await res.json();
      setData(json.drinks);
    };
    
  return (
    <div>
        <h3 onClick={()=>getCategories()}>Get the categories</h3>
        <div>
            {
            data.map(data=>(<div>{data.strCategory}</div>))
            }
        </div>
    </div>
  )
}

export default GetCategories