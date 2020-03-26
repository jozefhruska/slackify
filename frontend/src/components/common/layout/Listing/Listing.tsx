import styled from 'styled-components';

/* <Listing />
============================================================================= */
const Listing = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: ${({ theme }) => theme.space.s6};
  padding: 0;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  }
`;

export default Listing;
