import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const GetCategories = () => {
    const [data,setData]=useState([])
    const [drinksData, setDrinksData] = useState([])
    const getCategories =()=>{
        fetchData();
    }
    const fetchData = async () => {
      const res = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );
      const json = await res.json();
      setData(json.drinks);
      console.log(data)
    };
    const getDrinks =(data)=>{
        const filter = data.strCategory.replace(" ","_")
        console.log(filter)
        fetchData2(filter);
    }
    const fetchData2 = async (filter) => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`,
      );
      const json2 = await res.json();
      setDrinksData(json2.drinks);
      console.log(drinksData)
    };
    
  return (
    <div>
        <h3 onClick={()=>getCategories()}>Get the categories</h3>
        <ul>
            {
           data.map(data=>(
                <li key={data.strCategory} onClick={()=>getDrinks(data)}>
                        {data.strCategory}
                </li>))
            }
        </ul>
        <ul>
            {drinksData&&
            drinksData.map(data=>(
                <li key={data.idDrink}>
                    <Link to={"/cocktail-detail"} state={data.idDrink}>
                        {data.strDrink}
                    </Link> 
                </li>))
            }
        </ul>
    </div>
  )
}

export default GetCategories