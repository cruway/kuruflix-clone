import {useQuery} from "@tanstack/react-query";
import {makeImagePath} from "../utils";
import {AnimatePresence, useScroll} from "framer-motion";
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
import {useState} from "react";
import {getTv, IGetTvResult} from "../api";

function Tv() {
    const history = useNavigate();
    const bigTvMatch = useMatch("/tv/show/:tvId");
    const { scrollY } = useScroll();
    const { data, isLoading } = useQuery<IGetTvResult>(
        ["tv","nowOnAir"],
        getTv
    );
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const incraseIndex = () => {
        if(leaving) return;
        toggleLeaving();
        const totalTv = data!.results.length;
        const maxIndex = Math.floor(totalTv / offset) - 1;
        setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    };
    const toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (tvId: number) => {
        history(`/tv/show/${tvId}`);
    };
    const onOverlayClick = () => history("");
    const clickedTv =
        bigTvMatch?.params.tvId &&
        data?.results.find(tv => String(tv.id) === bigTvMatch.params.tvId);
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
                        <Title>{data?.results[0].name}</Title>
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
                                    .map(tv => (
                                        <Box
                                            layoutId={tv.id + ""}
                                            key={tv.id}
                                            whileHover={"hover"}
                                            initial={"normal"}
                                            variants={boxVariants}
                                            onClick={() => onBoxClicked(tv.id)}
                                            transition={{ type: "tween" }}
                                            bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                                        >
                                            <Info variants={infoVariants}>
                                                <h4>{tv.name}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </Row>
                        </AnimatePresence>
                    </CommonStyled>
                    <AnimatePresence>
                        {bigTvMatch ? (
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    exit={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                                <BigPanel
                                    style={{ top: scrollY.get() + 100 }}
                                    layoutId={bigTvMatch.params.tvId}
                                >
                                    {clickedTv && <>
                                        <BigCover
                                            style={{
                                                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                    clickedTv.backdrop_path,
                                                    "w500"
                                                )})`,
                                            }}
                                        />
                                        <BigTitle>{clickedTv.name}</BigTitle>
                                        <BigOverView>{clickedTv.overview}</BigOverView>
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

export default Tv;