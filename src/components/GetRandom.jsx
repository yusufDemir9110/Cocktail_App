import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState';
import LittleInfo from './LittleInfo';

const GetRandom = () => {
  const {bartender} = useContext(GlobalContext)
    const [data,setData]=useState(null)
    const [littleInfo, setLittleInfo] = useState({
      imgSrc:"",
      drinkName:"",
      display:"none",
      positionX:"",
      positionY:""
    })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const getRandom =()=>{
        fetchData();
    }
    const fetchData = async () => {
      setIsLoading(true)
      try{
        const res = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/random.php',
        );
        const json = await res.json();
        setData(json.drinks[0]);
      }catch(error){
        setError(error.toString())
        setIsLoading(false)
      }
      setIsLoading(false)
    };
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

    const getLittleInfoData =(data)=>{
      setLittleInfo((prev)=>({...prev, display:"flex"}))
      const imgSrc = data.strDrinkThumb
      setLittleInfo((prev)=>({...prev, imgSrc}))
      const drinkName = data.strDrink
      setLittleInfo((prev)=>({...prev, drinkName}))
    }
    
  return (
    <div className='dataPullingContainer'>
        <button className='btn' onClick={()=>getRandom()}>{bartender==="Charlotte"?"Get Random Drink":bartender==="Giancarlo"?"Ottieni una bevanda casuale":"Holen Sie sich ein zufälliges Getränk"}</button>
         <ul> 
            {isLoading&&<li className='loading'>...Loading</li>}
            {error!==null&&<li className='error'>Something went wrong! {error}</li>}     
            <li className='center' onMouseOver={()=>getLittleInfoData(data)} onMouseLeave={(prev)=>setLittleInfo({...prev, display:"none"})}>
              <LittleInfo littleInfo={littleInfo}/>
              <Link to={"/cocktail-detail"} state={data&&data.idDrink}>
                {
                  data!==null&&data.strDrink
                }
              </Link> 
            </li>        
        </ul>      
    </div>
  )
}

export default GetRandom