import React, { useContext } from "react";
import "./home.css"
import { GlobalContext } from "../../context/GlobalState";
import GetCategories from "../../components/GetCategories";
import GetRandom from "../../components/GetRandom";
import GetSearch from "../../components/GetSearch";

const Home = () => {
  const{changeLanguage, language} = useContext(GlobalContext)
  return (
    <>
      <main className="appContainer">
        <h1>Vodafone Ziggo Bar</h1>
        <h3>Please Select Bartander</h3>
        <section className="selectBartender">
          <div onClick={()=>changeLanguage("English")}>
            <h3>Charlotte</h3>
          </div>
          <div onClick={()=>changeLanguage("Italian")}>
            <h3>Giancarlo</h3>
          </div>
          <div onClick={()=>changeLanguage("French")}>
            <h3>Lyam</h3>
          </div>
          <h3>{language}</h3>
        </section>
        <section>
          <GetCategories/>
          <GetRandom/>
          <GetSearch/>
        </section>
      </main>
    </>
  );
};

export default Home;
