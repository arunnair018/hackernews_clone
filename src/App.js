import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/body";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Body />
      </Router>
    </>
  );
}

export default App;
