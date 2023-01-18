import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import CocktailDetail from "./pages/cocktailDetail/CocktailDetail";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail-detail" element={<CocktailDetail />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
