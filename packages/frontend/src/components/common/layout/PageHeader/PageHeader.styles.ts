import styled from 'styled-components';

export const Breadcrumbs = styled.ul`
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const BreadcrumbsItem = styled.li`
  display: inline-block;
  color: ${({ theme }) => theme.colors.gray[0]};
  padding-right: ${({ theme }) => theme.space.s2};

  :not(:first-child)::before {
    content: '/';
    padding-right: ${({ theme }) => theme.space.s2};
    color: ${({ theme }) => theme.colors.gray[5]};
  }
`;
