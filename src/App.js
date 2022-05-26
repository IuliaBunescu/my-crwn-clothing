import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";


const Shop = () => {
  return (
    <div>
      <h1>I am the Shop.</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* index: when match the path, use this as a child component */}
        <Route index element={<Home />} /> 
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
