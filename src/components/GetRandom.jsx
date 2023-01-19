import React, {useState} from 'react'
import { Link } from 'react-router-dom'

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
         <Link to={"/cocktail-detail"} state={data&&data[0].idDrink}>
            {
                data!==null&&data[0].strDrink
            }
        </Link>  
    </div>
  )
}

export default GetRandom