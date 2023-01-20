import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const GetCategories = () => {
    const {bartender} = useContext(GlobalContext)
    const [categoryData,setCategoryData]=useState([])
    const [drinksData, setDrinksData] = useState([])
    const [listVisibility, setListVisibility] = useState(0)
    const [scroll, setScroll] = useState("none")
    const [activeBtn, setActiveBtn]=useState(0)
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