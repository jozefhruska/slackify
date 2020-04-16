import styled from 'styled-components';

/* <Content />
============================================================================= */
const Content = styled.main`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.s4};

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: ${({ theme }) => theme.space.s8};
    margin-left: 20rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-left: 22rem;
    margin-right: 26rem;
  }
`;

export default Content;
