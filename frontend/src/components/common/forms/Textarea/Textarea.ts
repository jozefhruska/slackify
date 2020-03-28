import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.space.s3} ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.gray[6]};
  box-sizing: border-box;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[2]};

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.brand};
  }
`;

export default Textarea;
