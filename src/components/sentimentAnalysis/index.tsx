import { PieChart } from '@mantine/charts';
import { Box, Text } from '@mantine/core';

const data = [
  { name: 'USA', value: 400, color: 'blue.5' },
  { name: 'India', value: 300, color: 'red.5' },
  { name: 'Other', value: 200, color: 'green.5' },
];

export default function SentimentAnalysis() {
  return (
    <Box>
      <Text my='md' ta='center' fw={500}>
        Sentiment Analysis
      </Text>
      <PieChart
        withLabelsLine
        labelsPosition='inside'
        labelsType='percent'
        withLabels
        data={data}
        w='100%'
        size={200}
      />
    </Box>
  );
}
