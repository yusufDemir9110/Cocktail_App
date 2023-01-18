import React, { useContext } from "react";
import "./home.css"
import { GlobalContext } from "../../context/GlobalState";

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
          <h3>Get the categories</h3>
          <div></div>
          <h3>Choose for me</h3>
          <div></div>
          <h3>Search for a specific cocktail</h3>
          <div>
            <input type="text" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
