import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.colors.base[20]};
    background: ${({ theme }) => theme.colors.base[50]};
  }

  svg {
    display: block;
  }

  a {
    transition: color 0.2s ease-out;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.base[20]};

    :focus,
    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.success};
      outline: none;
    }
  }
`;
