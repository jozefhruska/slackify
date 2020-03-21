import styled from 'styled-components';

/* <Content />
============================================================================= */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.s6};

  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: ${({ theme }) => theme.space.s8};
    margin-left: 360px;
  }
`;

export default Content;
