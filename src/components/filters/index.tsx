import { useDashboardContext } from '../../hooks';
import { Button, MultiSelect, Popover } from '@mantine/core';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { Article } from '../../types';
import { countOccurrences as countKeywordOccurrences } from '../../utils';

const countOccurrences = (articles: Article[], property: keyof Article) => {
  return articles
    .flatMap((article) =>
      (article[property] as string)
        .split(', ')
        .map((item: string) => item.trim()),
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
    label: `${item} (${count})`,
    value: item,
  }));
};

export default function Filters({
  selectedFilters,
  setSelectedFilters,
}: {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}) {
  const { entityData } = useDashboardContext();

  const articles = entityData.articles ?? [];

  const keywordItems = convertToItems(
    countKeywordOccurrences(articles, 'keywords'),
  );
  const sentimentItems = convertToItems(
    countOccurrences(articles, 'sentiment'),
  );

  return (
    <Popover width={400} position='left' withArrow shadow='md'>
      <Popover.Target>
        <Button
          variant='default'
          size='sm'
          leftSection={<IconAdjustmentsHorizontal size={16} />}
        >
          Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <MultiSelect
          label='Filter Articles'
          description='Filter articles by keywords and sentiment'
          clearable
          searchable
          defaultValue={selectedFilters}
          onChange={setSelectedFilters}
          placeholder='Select or Search filters...'
          comboboxProps={{ withinPortal: false }}
          data={[
            {
              group: 'Sentiment',
              items: sentimentItems,
            },
            {
              group: 'Keyword',
              items: keywordItems,
            },
          ]}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
