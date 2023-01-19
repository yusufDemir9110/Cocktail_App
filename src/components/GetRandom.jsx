import React, {useState} from 'react'

const GetRandom = () => {
    const [data,setData]=useState(null)
    const getRandom =()=>{
        fetchData();
    }
    const fetchData = async () => {
      const res = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      );
      const json = await res.json();
      setData(json.drinks);
    };
    
  return (
    <div>
        <h3 onClick={()=>getRandom()}>Get Random</h3>
        <div>
            {
            data!==null&&data[0].strDrink
            }
        </div>
    </div>
  )
}

export default GetRandom