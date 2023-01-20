import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState';

const GetRandom = () => {
  const {bartender} = useContext(GlobalContext)
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
        <button className='btn' onClick={()=>getRandom()}>{bartender==="Charlotte"?"Get Random Drink":bartender==="Giancarlo"?"Ottieni una bevanda casuale":"Holen Sie sich ein zufälliges Getränk"}</button>
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