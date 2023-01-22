import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const GetCategories = () => {
    const {bartender} = useContext(GlobalContext)
    const [categoryData,setCategoryData]=useState([])
    const [drinksData, setDrinksData] = useState([])
    const [listVisibility, setListVisibility] = useState(0)
    const [scroll, setScroll] = useState("none")
    const [activeBtn, setActiveBtn]=useState(0)
    const [littleInfoPosition, setLittleInfoPosition] = useState({
      x:"",
      y:""
    })
    const [littleInfoImgSrc, setLittleInfoImgSrc] =useState(null)
    const [littleInfoDrinkName, setLittleInfoDrinkName] =useState(null)
    const [littleInfoDisplay, setLittleInfoDisplay] = useState("none")
    const getCategories =()=>{
        fetchCategoryData();
        setScroll("scroll");
         setActiveBtn(1);
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
        setListVisibility(1);
        setActiveBtn(2);
    }
    const returnCategories=()=>{
      setListVisibility(0)
      setActiveBtn(1)
    }
    const fetchData2 = async (filter) => {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`,
      );
      const json2 = await res.json();
      setDrinksData(json2.drinks);
    };

    const getLittleInfoData =(data)=>{
      setLittleInfoDisplay("flex")
      const imgSrc = data.strDrinkThumb
      setLittleInfoImgSrc(imgSrc)
      const drinkName = data.strDrink
      setLittleInfoDrinkName(drinkName)
    }
    useEffect(() => {
      const handleMouseMove = (event)=>{
        setLittleInfoPosition({x:event.clientX-80, y:event.clientY-80})
      }
      window.addEventListener("mousemove", handleMouseMove)
      
      return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
    }, [])
    
    
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
              {drinksData&&
                drinksData.map(data=>(
                  <li key={data.idDrink} onMouseOver={()=>getLittleInfoData(data)} onMouseLeave={()=>setLittleInfoDisplay("none")}>
                    <div className='littleInfo' style={{display:littleInfoDisplay,top:`${littleInfoPosition.y}px`,left:`${littleInfoPosition.x}px`}}>
                      <img src={littleInfoImgSrc} alt="sc"/>
                      <h4>{littleInfoDrinkName}</h4>
                      
                    </div>
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