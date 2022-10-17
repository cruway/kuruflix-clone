import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home />}>
                    <Route path={"movies/:category/:movieId"} element={<Home />} />
                </Route>
                <Route path={"/tv"} element={<Tv />}>
                    <Route path={"tvs/:category/:tvId"} element={<Tv />} />
                </Route>
                <Route path={"/search"} element={<Search />}>
                    <Route path={":movieId"} element={<Search />}></Route>
                    <Route path={":tvId"} element={<Search />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
