const API_KEY = "af665a75a4cbba5a7d47cdb0ab8ed23e";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

interface ITv {
    id: number;
    backdrop_path: string;
    poster_path: string;
    name: string;
    overview: string;
}

export interface IGetTvResult {
    page: number;
    results: ITv[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        response => response.json()
    );
}

export function getTv() {
    return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
        response => response.json()
    );
}