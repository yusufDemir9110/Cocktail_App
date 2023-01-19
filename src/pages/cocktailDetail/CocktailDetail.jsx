import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const CocktailDetail = () => {
  const [data, setData] = useState(null)
  const location = useLocation()
  const id = location.state
  const fetchData = async () => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const json = await res.json();
      setData(json.drinks[0]);
  };
  useEffect(()=>{
    const newData = fetchData()
    setData(newData)
  },[])

  return (
    <div>
        <h1>{data&&data.strDrink}</h1>
        <img src={data&&data.strDrinkThumb} alt="" />
    </div>
  )
}

export default CocktailDetail