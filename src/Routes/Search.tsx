import {useLocation} from "react-router-dom";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    return <h1>Tv</h1>;
}

export default Search;