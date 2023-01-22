import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import LittleInfo from './LittleInfo';

const GetCategories = () => {
    const {bartender} = useContext(GlobalContext)
    const [categoryData,setCategoryData]=useState([])
    const [drinksData, setDrinksData] = useState([])
    const [listVisibility, setListVisibility] = useState(0)
    const [scroll, setScroll] = useState("none")
    const [activeBtn, setActiveBtn]=useState(0)
    const [littleInfo, setLittleInfo] = useState({
      imgSrc:"",
      drinkName:"",
      display:"none",
      positionX:"",
      positionY:""
    })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      const handleMouseMove = (event)=>{
        setLittleInfo((prev)=>({...prev, positionX:event.clientX-80, positionY:event.clientY-80}))
      }
      window.addEventListener("mousemove", handleMouseMove)
      
      return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
    }, [])
    
    const getCategories =()=>{
        fetchCategoryData();
        setScroll("scroll");
         setActiveBtn(1);
    }
    const fetchCategoryData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        );
        const categoryJson = await res.json();
        setCategoryData(categoryJson.drinks);
      } catch (error) {
        setError(error.toString())
        setIsLoading(false)
      }
      setIsLoading(false)
      
    };
    const getDrinks =(data)=>{
        const filter = data.strCategory.replace(" ","_")
        fetchDrinkData(filter);
        setListVisibility(1);
        setActiveBtn(2);
    }
    const returnCategories=()=>{
      setListVisibility(0)
      setActiveBtn(1)
    }
    const fetchDrinkData = async (filter) => {
      setIsLoading(true)
      try {
        const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`,
        );
        const drinkJson = await res.json();
        setDrinksData(drinkJson.drinks);
      } catch (error) {
        setIsLoading(false)
        setError(error.toString())
      }
      setIsLoading(false)
    };

    const getLittleInfoData =(data)=>{
      setLittleInfo((prev)=>({...prev, display:"flex"}))
      const imgSrc = data.strDrinkThumb
      setLittleInfo((prev)=>({...prev, imgSrc}))
      const drinkName = data.strDrink
      setLittleInfo((prev)=>({...prev, drinkName}))
    }
  return (
    <div className='dataPullingContainer'>
      {
        activeBtn===0?
        <button className='btn' onClick={()=>getCategories()}>{bartender==="Charlotte"?"Get Categories":bartender==="Giancarlo"?"Ottieni categorie":"Kategorien Erhalten"}</button>
        :activeBtn===1?
        <button className='btn'>{bartender==="Charlotte"?"Select from List":bartender==="Giancarlo"?"Selezionare dall'elenco":"Wählen Sie aus der Liste aus"}</button>
        :
        <button className='btn' onClick={()=>returnCategories()}>{bartender==="Charlotte"?"Return to Categories":bartender==="Giancarlo"?"Ritorna a Categorie":"Zurück zu den Kategorien"}</button>
      }
        
        
        {
          listVisibility===0&&
          <ul style={{overflowY:scroll}}>
            {isLoading&&<li className='loading'>...Loading</li>}
            {error!==null&&<li className='error'>Something went wrong! {error}</li>}
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
          <div>
            
            <ul style={{overflowY:scroll}}>
              {isLoading&&<li className='loading'>...Loading</li>}
              {error!==null&&<li className='error'>Something went wrong! {error}</li>}
              {
                drinksData&&
                drinksData.map(data=>(
                  <li key={data.idDrink} onMouseOver={()=>getLittleInfoData(data)} onMouseLeave={(prev)=>setLittleInfo({...prev, display:"none"})}>
                    <LittleInfo littleInfo={littleInfo}/>
                    <Link to={"/cocktail-detail"} state={data.idDrink}>
                        {data.strDrink}
                    </Link> 
                  </li>))
              }
            </ul>
          </div>
        }      
    </div>
  )
}

export default GetCategories