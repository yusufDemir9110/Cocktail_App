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
    <div className='dataPullingContainer'>
        <button className='btn' onClick={()=>getRandom()}>Get Random</button>
         <ul>      
            <li className='center'>
              <Link to={"/cocktail-detail"} state={data&&data[0].idDrink}>
                {
                  data!==null&&data[0].strDrink
                }
              </Link> 
            </li>        
        </ul>      
    </div>
  )
}

export default GetRandom