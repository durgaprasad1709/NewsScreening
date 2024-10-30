import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconTriangleFilled } from '@tabler/icons-react';
import clsx from 'clsx';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import { useAppContext } from '../../contextAPI/AppContext';
import Articles from '../articles/Articles';
import SentimentAnalysis from '../sentimentAnalysis';
import { useDashboardContext } from '../../hooks';

import classes from './Content.module.css';

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <Flex direction={'column'}>
      <Text size='md' c='dimmed' mr='xs'>
        {label}
      </Text>
      <Text fw={500} size='md'>
        {value}
      </Text>
    </Flex>
  );
}

// const options: any = {
//   colors: ['#7CB9E8', '#0066b2', '#5072A7', '#1F305E'],
//   enableTooltip: true,
//   deterministic: false,
//   fontFamily: 'impact',
//   fontSizes: [20, 40] as [number, number],
//   fontStyle: 'normal',
//   fontWeight: 'normal',
//   padding: 1,
//   rotations: 3,
//   rotationAngles: [0, 0] as [number, number],
//   scale: 'sqrt',
//   spiral: 'archimedean',
//   transitionDuration: 1000,
// };

export default function Content() {
  const { toggleMenu, isMenuCollapsed } = useAppContext();
  const { entityData, isFetching } = useDashboardContext();

  const uniqueKeywords = (entityData.articles ?? [])
    .flatMap((article) => article.keywords)
    .filter((keyword, index, self) => self.indexOf(keyword) === index)
    .join(', ');

  // const keywordItems = convertToItems(
  //   countOccurrences(entityData.articles ?? [], 'keywords'),
  // );

  return (
    <Box
      mx='md'
      className={clsx(classes.content, { [classes.expanded]: isMenuCollapsed })}
    >
      <Tooltip
        position='bottom'
        withArrow
        label={isMenuCollapsed ? 'Expand' : 'Collapse'}
      >
        <ActionIcon
          className={clsx(classes.actionIcon, {
            [classes.collapsed]: isMenuCollapsed,
          })}
          onClick={toggleMenu}
          variant='transparent'
          c='premiumDark'
        >
          <IconTriangleFilled size={22} />
        </ActionIcon>
      </Tooltip>
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />

      {entityData.articles?.length === 0 ? (
        <Text size='lg'> No data found yet...please continue screening.</Text>
      ) : (
        <div>
          <SimpleGrid cols={2}>
            <Box id='content-container'>
              <Flex direction={'row'} my='md' justify={'center'}>
                <Text
                  fw={600}
                  size='md'
                  tt='uppercase'
                  lts={1.5}
                  c={'premiumDark'}
                >
                  {entityData.entityInfo.name}
                </Text>
              </Flex>

              <Divider mb='lg' className={classes.border} />

              {/* Date Information */}
              <SimpleGrid cols={2} mb='md'>
                <InfoRow
                  label='Start Date'
                  value={entityData.entityInfo.fromDate.toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                />
                <InfoRow
                  label='End Date'
                  value={entityData.entityInfo.endDate.toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                />
              </SimpleGrid>

              {/* Article Information */}
              <SimpleGrid cols={2} mb='md'>
                <InfoRow
                  label='Number of Unique Articles'
                  value={entityData.articles?.length ?? 0}
                />
                <InfoRow
                  label='Entity Confirmed Articles'
                  value={entityData.articles?.length ?? 0}
                />
              </SimpleGrid>

              <SimpleGrid cols={2} mb='md'>
                <InfoRow
                  label='Keyword Related Articles'
                  value={entityData.articles?.length ?? 0}
                />
                <InfoRow
                  label='Credible Articles'
                  value={entityData.articles?.length ?? 0}
                />
              </SimpleGrid>

              {/* Keywords Section */}

              <Text size='md' c='dimmed'></Text>
              <Text ta={'justify'} size='md'>
                <span className='dimmed-text'>Keywords:</span> {uniqueKeywords}
              </Text>

              {/* Sentiment Analysis */}
              <SentimentAnalysis />
            </Box>
            <Box>
              <Articles />
            </Box>
          </SimpleGrid>
        </div>
      )}
    </Box>
  );
}
