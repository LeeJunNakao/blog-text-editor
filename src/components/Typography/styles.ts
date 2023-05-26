import styled from 'styled-components';

type StyleComponentProps = {
  bold?: boolean;
  size?: number;
  italic?: boolean;
  color?: string;
};

export const StyleComponent = styled.span<StyleComponentProps>`
  font-weight: ${(props) => (props.bold ? 'bold' : '400')};
  font-size: ${(props) => (props.size ? `${props.size}px` : '12px')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  color: ${(props) => props.color};
`;

export const H1 = styled.p`
  font-size: 36px;
  font-family: sans-serif;
`;

H1.displayName = 'H1';

export const H2 = styled(H1)`
  font-size: 24px;
`;

H2.displayName = 'H2';

export const H3 = styled(H2)`
  font-size: 16px;
`;

H3.displayName = 'H3';

export const Paragraph = styled.div`
  font-size: 12px;
  font-family: sans-serif;
  margin: 6px;
`;

Paragraph.displayName = 'Paragraph';
