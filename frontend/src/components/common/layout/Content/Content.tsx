import styled from 'styled-components';

/* <Content />
============================================================================= */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.s6};

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: ${({ theme }) => theme.space.s8};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-left: 360px;
  }
`;

export default Content;
