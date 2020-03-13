import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.success};
  box-shadow: ${({ theme }) => theme.shadows.box.medium(theme.colors.success)};
  color: ${({ theme }) => theme.colors.base[10]};
  letter-spacing: 2px;
  user-select: none;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.base[60]};
  box-shadow: ${({ theme }) => theme.shadows.box.medium()};
  overflow: hidden;
`;
