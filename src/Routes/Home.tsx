import {useQuery} from "@tanstack/react-query";
import {getMovies, IGetMoviesResult} from "../api";
import {makeImagePath} from "../utils";
import {AnimatePresence, useScroll} from "framer-motion";
import {useState} from "react";
import {useMatch, useNavigate} from "react-router-dom";
import {
    Info,
    Row,
    CommonStyled,
    Wrapper,
    offset,
    Loader,
    Banner,
    Title,
    Overview,
    rowVariants, Box, infoVariants, boxVariants, Overlay, BigPanel, BigCover, BigTitle, BigOverView
} from "./CommonStyled/CommonStyled";

function Home() {
    const history = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    const { scrollY } = useScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies","nowPlaying"],
        getMovies
    );
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const incraseIndex = () => {
        if(leaving) return;
        toggleLeaving();
        const totalMovies = data!.results.length;
        const maxIndex = Math.floor(totalMovies / offset) - 1;
        setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    };
    const toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (movieId: number) => {
        history(`movies/${movieId}`);
    };
    const onOverlayClick = () => history("");
    const clickedMovie =
        bigMovieMatch?.params.movieId &&
        data?.results.find(movie => String(movie.id) === bigMovieMatch.params.movieId);
    return (
        <Wrapper>
            {isLoading? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        onClick={incraseIndex}
                        bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <CommonStyled>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                                variants={rowVariants}
                                initial={"hidden"}
                                animate={"visible"}
                                exit={"exit"}
                                transition={{ type: "tween", duration: 1 }}
                                key={index}
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(offset * index, offset * index + offset)
                                    .map(movie => (
                                        <Box
                                            layoutId={movie.id + ""}
                                            key={movie.id}
                                            whileHover={"hover"}
                                            initial={"normal"}
                                            variants={boxVariants}
                                            onClick={() => onBoxClicked(movie.id)}
                                            transition={{ type: "tween" }}
                                            bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                        >
                                            <Info variants={infoVariants}>
                                                <h4>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </CommonStyled>
                    <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    exit={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                                <BigPanel
                                    style={{ top: scrollY.get() + 100 }}
                                    layoutId={bigMovieMatch.params.movieId}
                                >
                                    {clickedMovie && <>
                                        <BigCover
                                            style={{
                                                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                    clickedMovie.backdrop_path, 
                                                    "w500"
                                                )})`,
                                            }}
                                        />
                                        <BigTitle>{clickedMovie.title}</BigTitle>
                                        <BigOverView>{clickedMovie.overview}</BigOverView>
                                    </>}
                                </BigPanel>
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Home;