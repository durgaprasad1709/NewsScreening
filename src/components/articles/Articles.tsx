import { Badge, Box, Flex, ScrollArea, Text } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconExternalLink } from '@tabler/icons-react';

import articles from '../../data/articles.json';
import Filters from '../filters';
import classes from './Articles.module.css';

export default function Articles() {
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
          <Filters />
        </Box>
      </Flex>

      {/* Scrollable Area */}
      <Box className={classes.articlesContainer}>
        <ScrollArea h='100%'>
          {articles.map((article, index) => (
            <Box key={randomId()} className={classes.article} pr='sm'>
              <Flex justify={'space-between'} mb='md'>
                <Text size='sm' c='dimmed' fw={500}>
                  October {index + 1}, 2024
                </Text>
                <Flex align={'center'} gap={'lg'}>
                  <Badge
                    color={
                      article.sentiment === 'Neutral'
                        ? 'premiumDark'
                        : article.sentiment === 'Positive'
                        ? 'green'
                        : 'red'
                    }
                    ml='xs'
                  >
                    {article.sentiment}
                  </Badge>
                  <IconExternalLink size={20} />
                </Flex>
              </Flex>

              <Text size='md' fw={500} mb='xs'>
                {article.title}
              </Text>
              <Text fz='sm' c='dimmed' lineClamp={6}>
                {article.summary}
              </Text>
              <Flex gap={'lg'} mt={'sm'}>
                <Badge variant='default'>Keyword {index + 1}</Badge>
                <Badge variant='default'>Keyword {index + 1}</Badge>
                <Badge variant='default'>Keyword {index + 10}</Badge>
              </Flex>
            </Box>
          ))}
        </ScrollArea>
      </Box>
    </Box>
  );
}
