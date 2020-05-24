import styled from 'styled-components';

/* <UsersListing />
============================================================================= */
export const UsersListing = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: ${({ theme }) => theme.space.s6};
  padding: 0;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
`;

/* <OneRowListing />
============================================================================= */
export const OneRowListing = styled.ul`
  display: grid;
  grid-auto-columns: 22rem;
  grid-gap: ${({ theme }) => theme.space.s6};
  grid-auto-flow: column;
  padding: 0;
  margin: 0;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-auto-columns: 25rem;
  }
`;

/* <Listing />
============================================================================= */
const CommonListing = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: ${({ theme }) => theme.space.s6};
  padding: 0;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  }
`;

export default CommonListing;
