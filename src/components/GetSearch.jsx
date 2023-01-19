import React, {useState} from 'react'

const GetSearch = () => {
    const [data,setData]=useState(null)
    const [keyword, setKeyword] = useState("")
    const getSearch =()=>{
        fetchData();
    }
    const fetchData = async () => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`,
      );
      const json = await res.json();
      setData(json.drinks);
    };
  return (
    <div>
        <h3>Search for a specific cocktail</h3>
          <div>
            <input type="text" onChange={(e)=>setKeyword(e.target.value)}/>
            <button type="button" onClick={()=>getSearch()}>Get</button>
          </div>
          <div>
            {
            data!==null?data.map(data=>(<div>{data.strDrink}</div>)):null
            }
        </div>
    </div>
  )
}

export default GetSearch