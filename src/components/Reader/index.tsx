/* eslint-disable react/display-name */
import React from 'react';
import { ComponentsPattern } from './component-patters';
import * as Typography from "../typography"
import * as S from "./styles";

type ComponentConfig = {
    regex: RegExp;
    component: React.FC<any>;
}

type Props = {
    children: string | undefined;
    config?: {
        components: ComponentConfig[]
    }
}

const defaultComponents: ComponentConfig[] = [
    {
        regex: ComponentsPattern.H1,
        component: Typography.H1
    },
    {
        regex: ComponentsPattern.H2,
        component: Typography.H2
    },
    {
        regex: ComponentsPattern.H3,
        component: Typography.H3
    },
    {
        regex: ComponentsPattern.Paragraph,
        component: Typography.Paragraph
    }
]

const breakText = (text: string) => {

    return text.split("\n")
}

const insertComponentIfMatched = (components: ComponentConfig[]) => (text: string) => {
    const matched = components.find(c => c.regex.test(text));
    const Paragraph = components.find(c => c.regex === ComponentsPattern.Paragraph) as ComponentConfig;

    if(matched) {
        const Component =  matched.component;

        return <Component>{text.replace(matched.regex, '')}</Component>
    }

    return <Paragraph.component>{text}</Paragraph.component>
}

const injectComponents = (lines: string[], components: ComponentConfig[]) => {
    return lines.map(insertComponentIfMatched(components))
}

export default function Reader(props: Props) {
    const customComponentsPattern = props.config?.components.map(i => i.regex);
    const replacedComponents = [...defaultComponents.filter(config => !customComponentsPattern?.includes(config.regex)), ...(props.config?.components||[]) ]
    

    const Components =  injectComponents(breakText(props.children || ''), replacedComponents)

    return <S.Wrapper>
        {Components}
    </S.Wrapper>
}