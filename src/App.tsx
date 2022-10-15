import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"}></Route>
                <Route path={"/tv"}></Route>
                <Route path={"/search"}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
