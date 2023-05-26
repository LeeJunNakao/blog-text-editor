import React from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './styles';

type Props = {
  type: 'H1' | 'H2' | 'H3' | 'Paragraph';
  children: string | JSX.Element;
};

const getTags = (expression: string) => {
  const regex = /(<style\s)([\w\s]+){0,}.+?>/;
  const match = expression.match(regex);
  if (match) {
    const tags = match[2].split(' ');

    return Object.fromEntries(tags.map((tag) => [tag, true]));
  }

  return {};
};

const getProps = (expression: string) => {
  const regex = /(\w+=".+")/;
  const match = expression.match(regex);

  if (match) {
    const entries = match[0]
      .split(' ')
      .map((exp) => exp.replace(/"/g, '').split('='));

    const parsedValuesEntries = entries.map(([key, value]) => [
      key,
      /^\d*$/.test(value) ? Number(value) : value,
    ]);

    return Object.fromEntries(parsedValuesEntries);
  }

  return {};
};

const parseBold = (text: string) => {
  const MARK = '<BREAK>';
  const regex = /<style([\w\s]*){0,}([\w\s]{0,}=".+"){0,}>(.*)<\/style>/;

  const boldMatch = Array.from(text.matchAll(new RegExp(regex, 'g')));

  const replacedText = boldMatch.reduce((text, match) => {
    const [originalText] = match;
    const replaced = text.replace(
      originalText,
      `${MARK}${originalText}${MARK}`
    );

    return replaced;
  }, text);

  const splitText = replacedText.split(MARK);

  return splitText.map((slice) => {
    const match = slice.match(regex);

    if (match) {
      const original = match[0];
      const content = match[3];

      const tags = getTags(original);
      const props = getProps(original);

      return (
        <S.StyleComponent key={uuid()} {...tags} {...props}>
          {content}
        </S.StyleComponent>
      );
    }

    return slice;
  });
};

export default function Typography(props: Props) {
  const Component = S[props.type];

  const Content =
    typeof props.children === 'string'
      ? parseBold(props.children || '')
      : props.children;

  return (
    <Component>
      <>{Content}</>
    </Component>
  );
}
