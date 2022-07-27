import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`  
  body{
    font-family: 'Open Sans', sans-serif;
    padding : 0;
    margin : 0;

    input, button, textarea {
      outline: none;
    }
  }
`;
