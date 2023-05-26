// String

export const isJson = (text: string) => {
  return (
    /(\w+:.+;?\s*)+/.test(text) &&
    !/https:\/\/|www\.[\w\d]+\.[\w\d]+/.test(text)
  );
};

export const isNumber = (text: string) => {
  return /^\d*$/.test(text);
};

export const propStringToJson = (props: string) => {
  const propString = props.split(';').map((i) => i.trim());
  const propEntries = propString.map((prop) => prop.split(':'));
  const parsedEntries = propEntries.map(([key, value]) => {
    if (isNumber(value)) {
      return [key, Number(value)];
    }
    return [key, value];
  });

  return Object.fromEntries(parsedEntries);
};

export const extractTagsFromStringifiedComponent = (
  componentString: string
) => {
  const [, componentInit] = componentString.match(/<(\w+)/) || [];

  const regex = new RegExp(`<${componentInit} ([\\w\\s]+){0,}.+?>`);

  const [, tagsString] = componentString.match(regex) || [];

  const tags = tagsString
    ? Object.fromEntries(tagsString.split(' ').map((tag) => [tag, true]))
    : {};

  return tags;
};

export const extractPropsFromStringifiedComponent = (
  componentString: string
) => {
  const [match] = componentString.match(/\w+=".+"/g) || [];

  if (match) {
    const stringifiedProps = match.split(/\s(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    const propsEntries = stringifiedProps.map((propStr) => {
      const [key, value] = propStr.split('=');
      const cleanedValue = value.replace(/"/g, '');

      if (isJson(cleanedValue)) {
        return [key, propStringToJson(cleanedValue)];
      }

      if (isNumber(cleanedValue)) {
        return [key, Number(cleanedValue)];
      }

      return [key, cleanedValue];
    });

    return Object.fromEntries(propsEntries);
  }

  return {};
};
