import styled from 'styled-components';

export type WrapperProps = {
  float?: 'left' | 'right';
  width?: string;
  height?: string;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  float: ${(props) => props.float || 'none'};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;

  figure {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
`;
