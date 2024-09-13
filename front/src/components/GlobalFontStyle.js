import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'goorm-sans-bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408@1.0/goorm-sans-bold.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  body {
    font-family: 'goorm-sans-bold', sans-serif;  // 기본 글꼴
  }
`;

export default GlobalStyle;
