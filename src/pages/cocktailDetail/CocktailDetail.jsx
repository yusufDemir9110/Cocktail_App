import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const CocktailDetail = () => {
  const [data, setData] = useState(null)
  const location = useLocation()
  const keyword = location.state
  useEffect(() => {
  const fetchData = async () => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${keyword}`,
      );
      const json = await res.json();
      setData(json.drinks[0]);
      console.log(data)
    };
    fetchData()
  }, [])
  
  return (
    <div>
      <div>
        {data.idDrink}
      </div>
      
      </div>
  )
}

export default CocktailDetail