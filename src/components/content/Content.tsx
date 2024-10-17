import {
  ActionIcon,
  Box,
  Flex,
  SimpleGrid,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconTriangleFilled } from '@tabler/icons-react';
import clsx from 'clsx';

import { useAppContext } from '../../contextAPI/AppContext';
import Articles from '../articles/Articles';
import SentimentAnalysis from '../sentimentAnalysis';
import classes from './Content.module.css';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Flex>
      <Text size='md' c='dimmed' mr='xs'>
        {label}:
      </Text>
      <Text fw={400} size='md'>
        {value}
      </Text>
    </Flex>
  );
}

export default function Content() {
  const { toggleMenu, isMenuCollapsed } = useAppContext();

  return (
    <Box
      mx='md'
      className={clsx(classes.content, { [classes.expanded]: isMenuCollapsed })}
    >
      <SimpleGrid cols={2}>
        <Box>
          {/* Entity Name */}
          <Flex my='md'>
            <Tooltip
              position='bottom'
              withArrow
              label={isMenuCollapsed ? 'Expand Sidemenu' : 'Collapse Sidemenu'}
            >
              <ActionIcon
                className={clsx(classes.actionIcon, {
                  [classes.collapsed]: isMenuCollapsed,
                })}
                // className={classes.actionIcon}
                onClick={toggleMenu}
                variant='transparent'
                c='premiumDark'
              >
                <IconTriangleFilled size={22} />
                {/* <IconLayoutSidebarLeftCollapse size={28} /> */}
                {/* <IconMenu2 size={28} /> */}
              </ActionIcon>
            </Tooltip>
            <Text size='md' c='dimmed' mr='xs'>
              Entity Name:
            </Text>
            <Text fw={400} size='md'>
              Elon Musk
            </Text>
          </Flex>

          {/* Date Information */}
          <SimpleGrid cols={2} mb='md'>
            <InfoRow label='Start Date' value='October 24, 2023' />
            <InfoRow label='End Date' value='October 24, 2024' />
          </SimpleGrid>

          {/* Article Information */}
          <SimpleGrid cols={2} mb='md'>
            <InfoRow label='Number of Unique Articles' value='9' />
            <InfoRow label='Entity Confirmed Articles' value='9' />
          </SimpleGrid>

          <SimpleGrid cols={2} mb='md'>
            <InfoRow label='Keyword Related Articles' value='9' />
            <InfoRow label='Credible Articles' value='9' />
          </SimpleGrid>

          {/* Keywords Section */}

          <Text size='md' c='dimmed'></Text>
          <Text ta={'justify'} size='md'>
            <span className='dimmed-text'>Keywords:</span> Sanction , Terror ,
            Launder , Violation , Crime , Fraud , Ban , Misconduct , Blacklist ,
            Penal , Corrupt , Scam , Bankrupt , Misappropriate , Drug , Evasion
            , Bribe , Conspiracy , Embezzle
          </Text>

          {/* Sentiment Analysis */}
          <SentimentAnalysis />
        </Box>
        <Box>
          <Articles />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
