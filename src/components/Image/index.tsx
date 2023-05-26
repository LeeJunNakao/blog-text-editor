import React from 'react';
import * as S from './styles';

type Props = {
  src: string;
  title: string;
  subtitle: string;
  style?: {
    float: 'left' | 'right';
  };
};

export default function Image(props: Props) {
  return (
    <S.Wrapper {...props.style}>
      <figure>
        <img src={props.src} alt={props.title} />
        <figcaption>{props.subtitle}</figcaption>
      </figure>
    </S.Wrapper>
  );
}
