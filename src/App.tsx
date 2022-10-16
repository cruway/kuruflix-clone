import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Routes/Components/Header";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path={"kuruflix-clone"} element={<Home />}/>
                <Route path={"kuruflix-clone/tv"} element={<Tv />}/>
                <Route path={"kuruflix-clone/search"} element={<Search />}/>
            </Routes>
        </Router>
    );
}

export default App;
