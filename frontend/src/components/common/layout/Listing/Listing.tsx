import styled from 'styled-components';

/* <Listing />
============================================================================= */
const Listing = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: ${({ theme }) => theme.space.s6};
  padding: 0;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  }
`;

export default Listing;
