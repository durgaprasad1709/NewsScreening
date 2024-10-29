import { PieChart } from '@mantine/charts';
import { Box, Text } from '@mantine/core';
import { Article } from '../../types';
import { useDashboardContext } from '../../hooks';

const countOccurrences = (articles: Article[], property: keyof Article) => {
  return articles
    .flatMap((article) =>
      (article[property] as string)
        .split(', ')
        .map((item: string) => item.toLowerCase().trim()),
    )
    .reduce((acc: Record<string, number>, item: string) => {
      let newItem = '';

      if (item.toLowerCase().includes('positive')) {
        newItem = 'Positive';
      } else if (item.toLowerCase().includes('negative')) {
        newItem = 'Negative';
      } else if (item.toLowerCase().includes('neutral')) {
        newItem = 'Neutral';
      }

      acc[newItem] = (acc[newItem] || 0) + 1;
      return acc;
    }, {});
};

const convertToItems = (counts: Record<string, number>) => {
  return Object.entries(counts).map(([item, count]) => ({
    name: `${item}`,
    value: count,
  }));
};

export default function SentimentAnalysis() {
  const { entityData } = useDashboardContext();

  const articles = entityData.articles ?? [];
  const sentimentItems = convertToItems(
    countOccurrences(articles, 'sentiment'),
  ).map((item) => {
    let color;
    if (item.name.toLowerCase().includes('positive')) {
      color = 'green.5';
    } else if (item.name.toLowerCase().includes('negative')) {
      color = 'red.5';
    } else {
      color = 'premiumDark.4';
    }
    return {
      ...item,
      color,
    };
  });

  return (
    <Box>
      <Text
        size={'lg'}
        fw={600}
        ta={'center'}
        mt='md'
        lts={1}
        c={'premiumDark'}
      >
        SENTIMENT ANALYSIS
      </Text>

      <PieChart
        strokeWidth={0}
        // withLabelsLine
        // labelsPosition='inside'
        labelsType='percent'
        withLabels
        data={sentimentItems}
        w='100%'
        size={250}
      />
    </Box>
  );
}
