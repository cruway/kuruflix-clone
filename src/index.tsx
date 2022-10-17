import ReactDOM from 'react-dom/client';
import App from './App';
import reset from "styled-reset";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {RecoilRoot} from "recoil";
import {theme} from "./theme";
import {QueryClient, QueryClientProvider} from "react-query";

const GlobalStyle = createGlobalStyle`
  ${reset}

  // reset css
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Source+Sans+Pro&display=swap'); // font install
  * {
    box-sizing: border-box;
  }

  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    color: ${props => props.theme.white.darker};
    line-height: 1.2;
    background-color: black;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RecoilRoot>
        <QueryClientProvider client={client}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </RecoilRoot>
);