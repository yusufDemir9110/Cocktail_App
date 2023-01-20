import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const GetSearch = () => {
    const [data,setData]=useState(null)
    const [keyword, setKeyword] = useState("")
    const [inputVisible, setInputVisible] = useState(false)
    const [scroll, setScroll] = useState("none")
    const getSearch =()=>{
        fetchData();
        setScroll("scroll")
    }
    const fetchData = async () => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`,
      );
      const json = await res.json();
      setData(json.drinks);
    };
  return (
    <div className='dataPullingContainer searchContainer'>
        <button className='btn searchSpecific' onClick={()=>setInputVisible(true)}>Search for a specific cocktail</button>
        {
          inputVisible&&
          <div className='center'>
            <input type="text" className='input' placeholder='Enter cocktail name...' onChange={(e)=>setKeyword(e.target.value)}/>
            <button type="button" className='btn' onClick={()=>getSearch()}>Get</button>
          </div>
        }   
          <ul style={{overflowY:scroll}}>
            {
              data!==null?data.map(data=>(
                <li key={data.idDrink}>
                  <Link to="/cocktail-detail" state={data.idDrink}>
                    {data.strDrink}
                  </Link>
                </li>
              )):null
            }
        </ul>
    </div>
  )
}

export default GetSearch