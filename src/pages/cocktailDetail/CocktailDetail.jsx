import React, {useEffect, useState, useContext} from 'react'
import { useLocation } from 'react-router-dom'
import charlotte from "../../assests/charlotte.png"
import giancarlo from "../../assests/giancarlo.png"
import julia from "../../assests/julia.png"
import { explanation } from "../../explanation/explanation";
import { GlobalContext } from "../../context/GlobalState";
import lemonVideo from "../../assests/lemon.m4v"
import "./cocktailDetail.css"

const CocktailDetail = () => {
  const [data, setData] = useState(null)
  const location = useLocation()
  const id = location.state
  const{changeBartender, bartender} = useContext(GlobalContext)
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
    <div className="container center">
      <video className="backgroundVideo" src={lemonVideo} autoPlay loop muted></video>
      <div className="videoOverlay"></div>
      <main className="appContainer center">
        <h1 className="appTitle">Vodafone Ziggo Bar</h1>
        
        <section className="explanationSection">
            <div className="bartenderImgBig">
              <img src={bartender==="Charlotte"?charlotte:(bartender==="Giancarlo"?giancarlo:julia)} alt="" />
            </div>
            <div className='cocktail'>
              <h1>{data&&data.strDrink}</h1>
              <div className='center'>
                <table>
                  <thead>
                    <tr>
                      <th>Ingredints</th>
                      <th>Measure</th>
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
                <img className='drinkImg' src={data&&data.strDrinkThumb} alt={data&&data.strDrink} />
              </div>
              <div>
                <p>{data&&data.strInstructions}</p>
              </div>
              
            </div>
        </section>
        
        
      </main>    
    </div> 

  )
}

export default CocktailDetail