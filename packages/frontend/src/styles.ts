import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.colors.gray[3]};
    background: ${({ theme }) => theme.colors.gray[10]};
    font-size: ${({ theme }) => theme.fontSizes.normal};
    line-height: 1.5;
  }

  svg {
    display: block;
  }

  a {
    transition: color 0.2s ease-out;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray[3]};

    :focus,
    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.brand};
      outline: none;
    }
  }
`;
