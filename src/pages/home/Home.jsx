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

const Home = () => {
  const{changeLanguage, language} = useContext(GlobalContext)
  const [selectBarVisibility, setSelectBartenderVisibility] = useState(true)
  return (
    <div className="container center">
      <video className="backgroundVideo" src={lemonVideo} autoPlay loop muted></video>
      <div className="videoOverlay"></div>
      <main className="appContainer center">
        <h1 className="appTitle">Vodafone Ziggo Bar</h1>
        <h3 className="bartenderTitle">Please Select Bartender</h3>
        {
          selectBarVisibility&&
          <section className="selectBartender">
          <div onClick={()=>changeLanguage("English")}>
            <div className="bartenderImg">
              <img src={charlotte} alt="Bartender Charlotte" />
            </div>             
            <h2>Charlotte</h2>
            <div className="language">
              <h4>English </h4>
              <img src={english} className="flagImg" alt="United Kingdom Flag" /> 
            </div>            
          </div>
          <div onClick={()=>changeLanguage("Italian")}>
            <div className="bartenderImg">
              <img src={giancarlo} alt="Bartender Giancarlo" />
            </div>            
            <h2>Giancarlo</h2>
            <div className="language">
              <h4>Italian </h4>
              <img src={italian} className="flagImg" alt="Italy Flag" />
            </div>            
          </div>
          <div onClick={()=>changeLanguage("French")}>
            <div className="bartenderImg">
              <img src={anette} alt="Bartender Anette" />
            </div>    
            <h2>Anette</h2>
            <div className="language">
              <h4>French </h4>
              <img src={french} className="flagImg" alt="French Flag" />
            </div>
          </div>
        </section>
        }
        {
          !selectBarVisibility&&
          <section>
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
