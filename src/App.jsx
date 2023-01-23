import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CocktailDetail from "./pages/CocktailDetail";
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
