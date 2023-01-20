import React, { useContext, useState } from "react";
import "./home.css"
import { GlobalContext } from "../../context/GlobalState";
import GetCategories from "../../components/GetCategories";
import GetRandom from "../../components/GetRandom";
import GetSearch from "../../components/GetSearch";
import lemonVideo from "../../assests/lemon.m4v"
import charlotte from "../../assests/charlotte.png"
import giancarlo from "../../assests/giancarlo.png"
import anette from "../../assests/anette.png"
import english from "../../assests/United-Kingdom-Flag-icon.png"
import italian from "../../assests/Italy-Flag-icon.png"
import french from "../../assests/France-Flag-icon.png"
import { explanation } from "../../explanation/explanation";

const Home = () => {
  const{changeBartender, bartender} = useContext(GlobalContext)
  const [activeSection, setActiveSection] = useState(0)
  const [userName, setUserName]= useState("customer")
  const [explanationVisibility, setExplanationVisibility] = useState("none")
  const selectBartender =(bartender)=>{
    changeBartender(bartender)
    setActiveSection(1)
  }
  return (
    <div className="container center">
      <video className="backgroundVideo" src={lemonVideo} autoPlay loop muted></video>
      <div className="videoOverlay"></div>
      <main className="appContainer center">
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
          <div onClick={()=>selectBartender("Anette")}>
            <div className="bartenderImg">
              <img src={anette} alt="Bartender Anette" />
            </div>    
            <h2>Anette</h2>
            <div className="language">
              <h4>French </h4>
              <img src={french} className="flagImg" alt="French Flag" />
            </div>
          </div>
          </div>
          
        </section>
        }
        {
          activeSection===1&&
          <section className="explanationSection">
            <div className="bartenderImgBig">
              <img src={bartender==="Charlotte"?charlotte:(bartender==="Giancarlo"?giancarlo:anette)} alt="" />
            </div>
            <div className="explanation">
              <p>{bartender==="Charlotte"?explanation.english[0]:bartender==="Giancarlo"?explanation.italian[0]:explanation.french}</p>
              <input type="text" onChange={(e)=>setUserName(e.target.value)}/>
              <button onClick={()=>setExplanationVisibility("block")}>Say</button>
              <div style={{display:explanationVisibility}}>
                 <p>{explanation.english[1]}</p>
                 <button onClick={()=>setActiveSection(2)}>Got it!</button>
              </div>
             
            </div>
          </section>
        }
        {
          activeSection===2&&
          <section className="center dataSection">
            <div className="bartenderImg">
              <img src={charlotte} alt="Bartender Charlotte" />
            </div>
            <div className="center">
              <GetCategories/>
              <GetRandom/>
              <GetSearch/>
            </div>
          
        </section>
        }
      </main>    
    </div> 
  );
};

export default Home;
