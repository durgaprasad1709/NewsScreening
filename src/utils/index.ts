import { Article } from '../types';

export const wait = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited ${seconds} seconds`);
    }, seconds * 1000);
  });
};

export const countOccurrences = (
  articles: Article[],
  property: keyof Article,
) => {
  // const keywordsParsed = articles[property] && JSON.parse(articles[property]);

  // if (keywordsParsed === 'string') {
  return articles
    .flatMap((article) =>
      (article[property] as string[])
        .map((item: string) => item.trim()),
    )
    .reduce((acc: Record<string, number>, item: string) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
  // }

  // return articles
  //   .flatMap((article) =>
  //     (JSON.parse(article[property] as string) as string[])
  //       .join(', ')
  //       .split(', ')
  //       .map((item: string) => item.trim()),
  //   )
  //   .reduce((acc: Record<string, number>, item: string) => {
  //     acc[item] = (acc[item] || 0) + 1;
  //     return acc;
  //   }, {});
};

export const convertToItems = (counts: Record<string, number>) => {
  return Object.entries(counts).map(([item, count]) => ({
    text: `${item}`,
    value: count,
  }));
};
