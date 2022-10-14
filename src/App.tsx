import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  width: 360px;
  height: 230px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: white;
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnPanel = styled.div`
  margin-top: 50px;
`;

const BtnCircle = styled.button`
  width: 70px;
  height: 35px;
  background-color: white;
  border-radius: 5px;
  border: none;
  transition: 0.2s ease-in-out;
`;

function App() {
    const variants = {
        scale: (custom : any) => ({
            scale: 1.1,
            translateX: custom === 1 || custom === 3 ? "-20px": "20px",
            translateY: custom === 1 || custom === 2 ? "-15px": "15px"
        })
    }
    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => setClicked((prev) => !prev);
    const [id, setId] = useState<null | string>(null);
    return (
      <Wrapper>
          <Grid>
              {["1", "2", "3", "4"].map((n) => (
                  <Box custom={+n} variants={variants} whileHover={"scale"} onClick={() => setId(n)} key={n} layoutId={n}>
                      { ((+n === 2) && clicked)
                      || ((+n === 3) && !clicked) ?
                          <Circle layoutId={"circle"} /> : null}
                  </Box>
              ))}
          </Grid>
          <BtnPanel>
              <BtnCircle
                  onClick={toggleClicked}
                  style={clicked ? {transform: "scale(1.25)", color: "orange"} : {transform: "scale(1)", color: "blue"}}
              >Switch</BtnCircle>
          </BtnPanel>
          <AnimatePresence>
              { id ? (
                  <Overlay
                      onClick={() => setId(null)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                  >
                      <Box layoutId={id} style={{ width: 360, height: 230, backgroundColor: "white", marginBottom: 80 }}/>
                  </Overlay>
              ) : null}
          </AnimatePresence>
      </Wrapper>
  );
}

export default App;
