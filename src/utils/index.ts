import { Article, KeywordData, SearchFormData } from '../types';

export const wait = (seconds: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Waited ${seconds} seconds`), seconds * 1000);
  });
};

export const countOccurrences = (
  articles: Article[],
  property: keyof Article,
): Record<string, number> => {
  return articles
    .flatMap((article) =>
      (article[property] as string[]).map((item) => item.trim()),
    )
    .reduce((acc: Record<string, number>, item: string) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
};

export const convertToItems = (counts: Record<string, number>) =>
  Object.entries(counts).map(([item, count]) => ({ text: item, value: count }));

export const initialFormValues: SearchFormData = {
  name: '',
  country: '',
  start_date: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  end_date: new Date(),
  numberOfURLs: '15',
  flag: 'POI',
  company: '',
  domain: [],
};

export const capitalizeWords = (str: string): string =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

const formatNodeType = (type: string, keyword: string) => {
  switch (type.toLowerCase()) {
    case 'entity':
      return `[${keyword}]`;
    case 'person':
      return `(${keyword})`;
    case 'general-keyword':
      return `["${keyword}"]`;
    default:
      return '';
  }
};

const createLinkLabel = (type: string) => {
  switch (type.toLowerCase()) {
    case 'entity':
      return 'Entity';
    case 'person':
      return 'POI';
    default:
      return '';
  }
};

export function generateMermaidChartData(
  jsonData: KeywordData[],
  entityName: string,
): string {
  const formattedEntityName = capitalizeWords(entityName);
  let chartCode = `flowchart TD\n\n    ${formattedEntityName}((${entityName}))\n\n`;

  chartCode += `
    classDef main fill:#dce5f5,stroke:#000,stroke-width:1px,text-transform:capitalize,font-size:50px,cursor:pointer; 
    classDef keyword stroke:#000,stroke-width:1px,text-transform:capitalize,font-size:50px; 
    classDef premium fill:#6480b3,stroke:#333,stroke-width:1px,text-transform:capitalize,padding:30px,color:white,font-size:70px;
  `;

  chartCode += `class ${formattedEntityName} premium\n`;

  jsonData.forEach((item) => {
    const { keyword, 'keyword-type': type, sizing_score: sizingScore } = item;
    const formattedKeyword = capitalizeWords(keyword);
    const nodeType = formatNodeType(type, keyword);
    const linkLabel = createLinkLabel(type);

    if (linkLabel) {
      chartCode += `
        ${formattedKeyword}${nodeType} -->|${linkLabel}| ${formattedEntityName}
        class ${formattedKeyword} main
        style ${formattedKeyword} font-size:${sizingScore * 40}px;
      `;
    } else {
      chartCode += `
        ${formattedEntityName} --> ${formattedKeyword}${nodeType}
        class ${formattedKeyword} keyword
      `;
    }
  });

  chartCode += `
    linkStyle default stroke-width:2px, font-size:50px;
    click Iphone4 callback "te" 
  `;

  console.log(chartCode);

  return chartCode;
}

export const formatDate = (date: string): string =>
  new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
