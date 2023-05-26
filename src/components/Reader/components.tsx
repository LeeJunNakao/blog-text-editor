/* eslint-disable react/display-name */
import React from 'react';
import {
  extractTagsFromStringifiedComponent,
  extractPropsFromStringifiedComponent,
} from '../../utils/parser';

export type ComponentType = React.FC<any> | React.ComponentType<any>;

export type MapText = {
  [id: string]: {
    content: string;
    originalText: string;
    componentData: ComponentConfig;
  };
};

export type ComponentConfig = {
  regex: RegExp;
  component: ComponentType;
  handler: (
    content: string,
    originalText: string,
    Component: ComponentType,
    props: { [k: string]: any }
  ) => JSX.Element;
  props: { [k: string]: any };
};

export const ComponentsPattern = {
  H1: /^#[\s](.*)\n/,
  H2: /^##[\s](.*)\n/,
  H3: /^###[\s](.*)\n/,
  Paragraph: /<p>(.*)<\/p>/,
  Code: /<code lang="\w+">([\s\w'"@\-;.()<>,\n`/*=\\/:*{}?|[\]]*)<\/code>/,
  Image: /<img.+?>/,
};

// Component handlers

const extractProps = (componentString: string) => {
  const tags = extractTagsFromStringifiedComponent(componentString);
  const props = extractPropsFromStringifiedComponent(componentString);

  return { ...tags, ...props };
};

const defaultComponentHandler = (
  content: string,
  originalText: string,
  Component: ComponentType,
  props: { [k: string]: any }
): JSX.Element => {
  const extractedProps = extractProps(originalText);
  const parsedProps = { ...extractedProps, ...props };

  return <Component {...parsedProps}>{content}</Component>;
};

const codeHandler = (
  content: string,
  originalText: string,
  Component: ComponentType,
  props: { [k: string]: any }
): JSX.Element => {
  const language = originalText.match(/lang="(.*)"/);

  return (
    <Component {...props} language={language}>
      {content}
    </Component>
  );
};

export const ComponentHandler = {
  default: defaultComponentHandler,
  code: codeHandler,
};

// Component Props
