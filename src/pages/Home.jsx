import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import GetCategories from "../components/GetCategories";
import GetRandom from "../components/GetRandom";
import GetSearch from "../components/GetSearch";
import lemonVideo from "../assests/lemon.m4v"
import charlotte from "../assests/charlotte.png"
import giancarlo from "../assests/giancarlo.png"
import julia from "../assests/julia.png"
import english from "../assests/United-Kingdom-Flag-icon.png"
import italian from "../assests/Italy-Flag-icon.png"
import german from "../assests/Germany-Flag-icon.png"
import { explanation } from "../explanation/explanation";
import "../style.css"
import { useLocation } from "react-router-dom";

const Home = () => {
  const {changeBartender, bartender, changeUserName, userName} = useContext(GlobalContext)
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(location.state?location.state:0)
  const [explanationVisible, setExplanationVisible] = useState("none")
  const [explanation2Visible, setExplanation2Visible] = useState("none")
  const [answer,setAnswer] = useState("")
  
  const selectBartender =(bartender)=>{
    changeBartender(bartender)
    setActiveSection(1)
  }
  const gotoPrevious=()=>{
    setActiveSection(activeSection-1)
    setExplanationVisible("none")
    setExplanation2Visible("none")
    changeUserName("Customer")
  }
  const clickYes=()=>{
    setExplanation2Visible("block")
    setAnswer("yes")
  }
   const clickNo=()=>{
    setExplanation2Visible("block")
    setAnswer("no")
  }
  return (
    <div className="container">
      <video className="backgroundVideo" src={lemonVideo} autoPlay loop muted></video>
      <div className="videoOverlay"></div>
      <main className="appContainer">
        {
          activeSection!==0&&
          <button className="btn topLeftBtn" onClick={()=>gotoPrevious()}>{bartender==="Charlotte"?"Previous":bartender==="Giancarlo"?"Precedente":"Vorherige"}</button>
        }   
        <h1 className="appTitle">Vodafone Ziggo Bar</h1>      
        {
          activeSection===0&&
          <section className="selectBartender">
          <h3 className="bartenderTitle">Please Select Bartender</h3>
            <div>
              <div onClick={()=>selectBartender("Charlotte")}>
                <div className="bartenderImg">
                  <img src={charlotte} alt="Bartender Charlotte" />
                </div>             
                <h2>Charlotte</h2>
                <div className="language">
                  <h4>English </h4>
                  <img src={english} className="flagImg" alt="United Kingdom Flag" /> 
                </div>            
              </div>
          <div onClick={()=>selectBartender("Giancarlo")}>
            <div className="bartenderImg">
              <img src={giancarlo} alt="Bartender Giancarlo" />
            </div>            
            <h2>Giancarlo</h2>
            <div className="language">
              <h4>Italian </h4>
              <img src={italian} className="flagImg" alt="Italy Flag" />
            </div>            
          </div>
          <div onClick={()=>selectBartender("Julia")}>
            <div className="bartenderImg">
              <img src={julia} alt="Bartender Julia" />
            </div>    
            <h2>Julia</h2>
            <div className="language">
              <h4>German </h4>
              <img src={german} className="flagImg" alt="German Flag" />
            </div>
          </div>
          </div>
          
        </section>
        }
        {
          activeSection===1&&
          <section className="explanationSection">
            <div className="bartenderImgBig">
              <img src={bartender==="Charlotte"?charlotte:(bartender==="Giancarlo"?giancarlo:julia)} alt={bartender} />
            </div>
            <div className="explanation">
              <p>{bartender==="Charlotte"?explanation.english[0]:bartender==="Giancarlo"?explanation.italian[0]:explanation.german[0]}</p>
              <input type="text" className="input" placeholder={bartender==="Charlotte"?"Enter your name...":bartender==="Giancarlo"?"Inserisci il tuo nome...":"gib deinen Namen ein"} onChange={(e)=>changeUserName(e.target.value)}/>
              <button className="btn" onClick={()=>setExplanationVisible("block")}>{bartender==="Charlotte"?"Say":bartender==="Giancarlo"?"Dire":"Sagen"}</button>
              <div style={{display:explanationVisible}}>
                 <p>{userName}, {bartender==="Charlotte"?explanation.english[1]:bartender==="Giancarlo"?explanation.italian[1]:explanation.german[1]}</p>
                 <button className="btn noBtn" onClick={()=>clickNo()}>{bartender==="Julia"?"Nein":"No"}</button>
                 <button className="btn yesBtn" onClick={()=>clickYes()}>{bartender==="Charlotte"?"Yes":bartender==="Giancarlo"?"Si":"Ja"}</button>                
              </div>
              <div style={{display:explanation2Visible}}>
                 <p>{answer==="yes"?(bartender==="Charlotte"?explanation.english[3]:bartender==="Giancarlo"?explanation.italian[3]:explanation.german[3]):answer==="no"&&(bartender==="Charlotte"?explanation.english[2]:bartender==="Giancarlo"?explanation.italian[2]:explanation.german[2])}</p>
                 <button className="btn" onClick={()=>setActiveSection(2)}>{bartender==="Charlotte"?"Let's Try!":bartender==="Giancarlo"?"Proviamo":"Versuchen"}</button>
              </div>
            </div>
          </section>
        }
        {
          activeSection===2&&
          <section className="dataSection">
              <GetCategories/>
              <GetRandom/>
              <GetSearch/>
        </section>
        }
      </main>    
    </div> 
  );
};

export default Home;
