import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState';
import LittleInfo from './LittleInfo';


const GetSearch = () => {
    const {bartender} = useContext(GlobalContext)
    const [data,setData]=useState(null)
    const [keyword, setKeyword] = useState("")
    const [inputVisible, setInputVisible] = useState(false)
    const [scroll, setScroll] = useState("none")
    const [littleInfo, setLittleInfo] = useState({
      imgSrc:"",
      drinkName:"",
      display:"none",
      positionX:"",
      positionY:""
    })
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
     useEffect(() => {
      const handleMouseMove = (event)=>{
        setLittleInfo((prev)=>({...prev, positionX:event.clientX-300, positionY:event.clientY-80}))
      }
      window.addEventListener("mousemove", handleMouseMove)
      
      return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
    }, [])

    const getLittleInfoData =(data)=>{
      setLittleInfo((prev)=>({...prev, display:"flex"}))
      const imgSrc = data.strDrinkThumb
      setLittleInfo((prev)=>({...prev, imgSrc}))
      const drinkName = data.strDrink
      setLittleInfo((prev)=>({...prev, drinkName}))
    }
  return (
    <div className='dataPullingContainer searchContainer'>
        <button className='btn searchSpecific' onClick={()=>setInputVisible(true)}>{bartender==="Charlotte"?"Search Drink":bartender==="Giancarlo"?"Cerca Bevanda":"Getränk suchen"}</button>
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
                <li key={data.idDrink} onMouseOver={()=>getLittleInfoData(data)} onMouseLeave={(prev)=>setLittleInfo({...prev, display:"none"})}>
                  <LittleInfo littleInfo={littleInfo}/>
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