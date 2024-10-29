import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  ScrollArea,
  Spoiler,
  Text,
} from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconExternalLink } from '@tabler/icons-react';

import Filters from '../filters';
import classes from './Articles.module.css';
import { useDashboardContext } from '../../hooks';
import { useState } from 'react';

const removeDuplicates = (array: string[]) => [...new Set(array)];

export default function Articles() {
  const { entityData } = useDashboardContext();

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const entityName = entityData.entityInfo.name;

  const articles = entityData.articles ?? [];

  console.log({ articles });

  const currentFilters = selectedFilters[entityName] ?? [];

  const filteredArticles =
    currentFilters.length > 0
      ? articles.filter((article) => {
          const matchesSentiment = currentFilters.includes(article.sentiment);
          const matchesKeyword = currentFilters.some((keyword) =>
            article.keywords.includes(keyword),
          );
          return matchesSentiment || matchesKeyword;
        })
      : articles;

  return (
    <Box className={classes.container}>
      {/* Header Section */}
      <Flex
        mb='xs'
        className={classes.headerBorder}
        align={'center'}
        justify={'space-between'}
      >
        <Box w='100%'>
          <Text className={classes.title} mt='md' fw={500}>
            Entity & Keyword Related Articles
          </Text>
        </Box>
        <Box>
          <Filters
            selectedFilters={currentFilters}
            setSelectedFilters={(filters) =>
              setSelectedFilters({
                ...selectedFilters,
                [entityName]: removeDuplicates(filters),
              })
            }
          />
        </Box>
      </Flex>

      {/* Scrollable Area */}
      <Box className={classes.articlesContainer}>
        <ScrollArea h='100%' scrollbarSize={5}>
          {filteredArticles?.map((article) => {
            let sentiment = 'Negative';
            if (article.sentiment.toLowerCase().includes('neutral')) {
              sentiment = 'Neutral';
            } else if (article.sentiment.toLowerCase().includes('positive')) {
              sentiment = 'Positive';
            }

            let sentimentColor = 'red';
            if (sentiment === 'Neutral') {
              sentimentColor = 'premiumDark';
            } else if (sentiment === 'Positive') {
              sentimentColor = 'green';
            }

            return (
              <Box key={randomId()} className={classes.article} pr='sm'>
                <Flex justify={'space-between'} mb='md'>
                  <Text size='sm' c='dimmed' fw={500}>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  <Flex align={'center'} gap={'xs'}>
                    <Badge color={sentimentColor} ml='xs'>
                      {sentiment}
                    </Badge>
                    <ActionIcon
                      onClick={() => window.open(article.link, '_blank')}
                      variant='default'
                      aria-label='Open Article'
                      className={classes.actionIcon}
                    >
                      <IconExternalLink size={20} />
                    </ActionIcon>
                  </Flex>
                </Flex>

                <Text size='md' fw={500} mb='xs'>
                  {article.title}
                </Text>

                <Spoiler
                  maxHeight={100}
                  c={'dimmed'}
                  showLabel='Read more'
                  hideLabel='Hide'
                >
                  {article.summary}
                </Spoiler>

                <Box pt='xs'>
                  <Flex gap={'xs'} mt={'sm'} wrap={'wrap'}>
                    {JSON.parse(article.keywords).map((keyword: string) => (
                      <Badge variant='default' key={randomId()}>
                        {keyword}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </ScrollArea>
      </Box>
    </Box>
  );
}
