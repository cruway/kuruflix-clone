import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Routes/Components/Header";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Header />
            <Routes>
                <Route path={"/*"} element={<Home />}>
                    <Route path={"movies/:movieId"} element={<Home />} />
                </Route>
                <Route path={"tv/*"} element={<Tv />}>
                    <Route path={"tv/show/:tvId"} element={<Tv />} />
                </Route>
                <Route path={"search"} element={<Search />}/>
            </Routes>
        </Router>
    );
}

export default App;
