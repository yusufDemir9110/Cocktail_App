import React, {useEffect, useState, useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import charlotte from "../assests/charlotte.png"
import giancarlo from "../assests/giancarlo.png"
import julia from "../assests/julia.png"
import { GlobalContext } from "../context/GlobalState";
import lemonVideo from "../assests/lemon.m4v"
import "../style.css"

const CocktailDetail = () => {
  const [data, setData] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const id = location.state
  const{bartender, userName, changeUserName} = useContext(GlobalContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = async () => {
    setIsLoading(true)
    try{
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const json = await res.json();
      setData(json.drinks[0]);
    }catch(error){
      setError(error.toString())
      setIsLoading(false)
    }
    setIsLoading(false) 
  };

  const gotoHome=()=>{
    changeUserName("Customer")
    navigate("/")
  }

  const gotoSelection =()=>{
    navigate("/",{state:2})
  }

  useEffect(()=>{
    const newData = fetchData()
    setData(newData)
  },[])

  return (
    <div className="container">
      <video className="backgroundVideo" src={lemonVideo} autoPlay loop muted></video>
      <div className="videoOverlay"></div>
      <main className="appContainer">
        <button className="btn topLeftBtn" onClick={()=>gotoSelection()}>{bartender==="Charlotte"?"Back to Selection":bartender==="Giancarlo"?"Torna alla Selezione":"Zurück zur Auswahl"}</button>
        <button className="btn topRightBtn" onClick={()=>gotoHome()}>{bartender==="Charlotte"?"Back to Home Page":bartender==="Giancarlo"?"Torna alla Iniziale":"Zurück zur Startseite"}</button>
        <h1 className="appTitle">Yusuf's Bar</h1>
        <section className="explanationSection">
            <div className="bartenderImgBig">
              <img src={bartender==="Charlotte"?charlotte:(bartender==="Giancarlo"?giancarlo:julia)} alt="" />
            </div>
            {isLoading&&<div className='loading'>Loading...</div>}
            {error!==null&&<div className='error'>Something went wrong! {error}</div>}
            {!isLoading&&error===null&&
            <div className='cocktail'>
              <h1 className='drinkTitle'>{data&&data.strDrink}</h1>
              <div className='tableIngredients'>
                <table>
                  <thead>
                    <tr>
                      <th>{bartender==="Charlotte"?"Ingredients":bartender==="Giancarlo"?"Ingredienti":"Zutaten"}</th>
                      <th>{bartender==="Charlotte"?"Measure":bartender==="Giancarlo"?"Misurare":"Messen"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data&&data.strIngredient1}</td>
                      <td>{data&&data.strMeasure1}</td>
                    </tr>
                    <tr>
                      <td>{data&&data.strIngredient2}</td>
                      <td>{data&&data.strMeasure2}</td>
                    </tr>
                    <tr>
                      <td>{data&&data.strIngredient3}</td>
                      <td>{data&&data.strMeasure3}</td>
                    </tr>
                    <tr>
                      <td>{data&&data.strIngredient4}</td>
                      <td>{data&&data.strMeasure4}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='cocktailImgContainer'>
                  <img className='drinkImg' src={data&&data.strDrinkThumb} alt={data&&data.strDrink} />
                </div> 
              </div>
              <div>
                <p>{userName}, {data&&bartender==="Charlotte"?(data.strInstructions):data&&bartender==="Giancarlo"?(data.strInstructionsIT):data&&(data.strInstructionsDE)}</p>
              </div>
              
            </div>
            }
            
        </section>
        
        
      </main>    
    </div> 

  )
}

export default CocktailDetail