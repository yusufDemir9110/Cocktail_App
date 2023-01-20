import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const GetCategories = () => {
    const [categoryData,setCategoryData]=useState([])
    const [drinksData, setDrinksData] = useState([])
    const [listVisibility, setListVisibility] = useState(0)
    const [scroll, setScroll] = useState("none")
    const getCategories =()=>{
        fetchCategoryData();
        setScroll("scroll")
    }
    const fetchCategoryData = async () => {
      const res = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      );
      const json = await res.json();
      setCategoryData(json.drinks);
    };
    const getDrinks =(data)=>{
        const filter = data.strCategory.replace(" ","_")
        fetchData2(filter);
        setListVisibility(1)
    }
    const fetchData2 = async (filter) => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`,
      );
      const json2 = await res.json();
      setDrinksData(json2.drinks);
    };
    
  return (
    <div className='dataPullingContainer'>
        <button className='btn' onClick={()=>getCategories()}>Get the categories</button>
        {
          listVisibility===0&&
          <ul style={{overflowY:scroll}}>
            {
           categoryData.map(data=>(
                <li key={data.strCategory} onClick={()=>getDrinks(data)}>
                        {data.strCategory}
                </li>))
            }
        </ul>
        }
        {
          listVisibility===1&&
          <ul style={{overflowY:scroll}}>
            {drinksData&&
            drinksData.map(data=>(
                <li key={data.idDrink}>
                    <Link to={"/cocktail-detail"} state={data.idDrink}>
                        {data.strDrink}
                    </Link> 
                </li>))
            }
        </ul>
        }
        
    </div>
  )
}

export default GetCategories