import styled from 'styled-components';

type WrapperProps = {
  float?: 'left' | 'right';
};

export const Wrapper = styled.div<WrapperProps>`
  float: ${(props) => props.float || 'none'};
`;
