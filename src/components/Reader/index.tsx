/* eslint-disable react/display-name */
import React from 'react';
import { v4 as uuid } from 'uuid';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  docco,
  defaultStyle,
  dracula,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  ComponentsPattern,
  ComponentConfig,
  ComponentHandler,
  MapText,
} from './components';
import Typography from '../Typography';
import Image from '../Image';
import * as S from './styles';

type Config = {
  components: ComponentConfig[];
};

type Props = {
  children: string | undefined;
  config?: Config;
};

const defaultComponents: ComponentConfig[] = [
  {
    regex: ComponentsPattern.H1,
    component: Typography,
    handler: ComponentHandler.default,
    props: {
      type: 'H1',
    },
  },
  {
    regex: ComponentsPattern.H2,
    component: Typography,
    handler: ComponentHandler.default,
    props: {
      type: 'H2',
    },
  },
  {
    regex: ComponentsPattern.H3,
    component: Typography,
    handler: ComponentHandler.default,
    props: {
      type: 'H3',
    },
  },
  {
    regex: ComponentsPattern.Paragraph,
    component: Typography,
    handler: ComponentHandler.default,
    props: {
      type: 'Paragraph',
    },
  },
  {
    regex: ComponentsPattern.Code,
    component: SyntaxHighlighter,
    handler: ComponentHandler.code,
    props: {},
  },
  {
    regex: ComponentsPattern.Image,
    component: Image,
    handler: ComponentHandler.default,
    props: {},
  },
];

const mapAndReplaceComponentString = (
  text: string,
  components: ComponentConfig[]
): [string, MapText] => {
  const mapText: MapText = {};

  const replacedText = components.reduce((text, componentData) => {
    const matched = text.matchAll(new RegExp(componentData.regex, 'gm'));

    return Array.from(matched).reduce((parsedText, item) => {
      const [originalString, content] = item;

      return parsedText.replaceAll(originalString, () => {
        const textId = uuid();
        mapText[textId] = {
          content,
          originalText: originalString,
          componentData,
        };

        return `§${textId}§`;
      });
    }, text);
  }, text);

  return [replacedText, mapText];
};

const insertComponent =
  (componentsData: ComponentConfig[], mapText: MapText) => (line: string) => {
    const data = mapText[line.replaceAll('§', '')];

    const Paragraph = componentsData.find(
      (d) => d.regex === ComponentsPattern.Paragraph
    ) as ComponentConfig;

    if (data) {
      return (
        <Paragraph.component key={uuid()} {...Paragraph.props}>
          {data.componentData.handler(
            data.content,
            data.originalText,
            data.componentData.component,
            data.componentData.props
          )}
        </Paragraph.component>
      );
    }

    return (
      <Paragraph.component key={uuid()} {...Paragraph.props}>
        {line}
      </Paragraph.component>
    );
  };

const parseTextAndMountComponent = (text: string, config: Config) => {
  const defaultComponentsReplaced = defaultComponents.map((dataConfig) => {
    const customComponentData = config.components.find(
      (i) => i.regex === dataConfig.regex
    );

    if (customComponentData) {
      return {
        ...customComponentData,
        props: { ...dataConfig.props, ...customComponentData.props },
      };
    }

    return dataConfig;
  });

  const customComponentsPattern = defaultComponentsReplaced.map((i) => i.regex);

  const replacedComponentsData = [
    ...defaultComponentsReplaced,

    ...config.components.filter(
      (data) => !customComponentsPattern.includes(data.regex)
    ),
  ];

  const [replacedText, mapText] = mapAndReplaceComponentString(
    text,
    replacedComponentsData
  );

  return replacedText
    .split('\n')
    .map(insertComponent(replacedComponentsData, mapText));
};

export default function Reader(props: Props) {
  const Components = parseTextAndMountComponent(
    props.children || '',
    props.config || { components: [] }
  );

  return <S.Wrapper>{Components}</S.Wrapper>;
}
