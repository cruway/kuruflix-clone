import {Types, TypeShows} from "./Routes/Utils";

const API_KEY = "af665a75a4cbba5a7d47cdb0ab8ed23e";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
    id: number;
    backdrop_path: string;
    overview: string;
    poster_path: string;
    title: string;
}

export interface IGetMoviesResult {
    results: IMovie[];
    total_pages: number;
}

export interface IGetMovieDetail {
    adult: boolean;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    id: number;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

interface ITvShow {
    backdrop_path: string;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
}

export interface ITvShows {
    page: number;
    results: ITvShow[];
    total_pages: number;
}

export interface ITvShowsDetail {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    last_air_date: string;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    vote_average: number;
}

export async function getMovies(type: Types) {
    return (
        await fetch(
            `${BASE_PATH}/movie/${type}?api_key=${API_KEY}&language=ja-JP&page=1&region=jp`
        )
    ).json();
}

export async function getMovieDetail(movieId: string | undefined) {
    return (
        await fetch(
            `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ja-JP`
        )
    ).json();
}

export async function getTvShows(type: TypeShows) {
    return (
        await fetch(
            `${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=ja-JP&page=1`
        )
    ).json();
}

export async function getTvShowsDetail(tvId: string | undefined) {
    return (
        await fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ja-JP`)
    ).json();
}

export async function getSearchResult({
    keyword,category,page,
    }: {
    keyword: string | null;
    category: string;
    page: number;
}) {
    return (
        await fetch(
            `${BASE_PATH}/search/${category}?api_key=${API_KEY}&language=ja-JP&query=${keyword}&page=${page}`
        )
    ).json();
}