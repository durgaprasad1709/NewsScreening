import {
  Box,
  Button,
  Center,
  Group,
  NumberInput,
  ScrollArea,
  SegmentedControl,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import {
  IconLogout,
  IconSearch,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';

import { DateInput } from '@mantine/dates';
import clsx from 'clsx';
import { useState } from 'react';

import { useAppContext } from '../../contextAPI/AppContext';
import classes from './NavbarSimple.module.css';
import { useNavigate } from 'react-router-dom';

export function NavbarSimple() {
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { isMenuCollapsed } = useAppContext();

  return (
    <nav
      className={clsx(classes.navbar, { [classes.collapsed]: isMenuCollapsed })}
    >
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify='space-between'>
          <Text fw={500} size='md' ta={'center'} w='100%'>
            <span className={classes.eyTitle}> EY </span>Negative News Screening
            Tool
          </Text>
        </Group>
        <ScrollArea className={classes.scrollable}>
          <Box>
            <Group>
              <SegmentedControl
                color={'premiumDark'}
                w='100%'
                data={[
                  {
                    value: 'individual',
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconUser style={{ width: rem(16), height: rem(16) }} />
                        <span>Individual</span>
                      </Center>
                    ),
                  },
                  {
                    value: 'bulk',
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconUsers
                          style={{ width: rem(16), height: rem(16) }}
                        />
                        <span>Bulk</span>
                      </Center>
                    ),
                  },
                ]}
              />
            </Group>
            <Box mt='md'>
              <TextInput
                label='Name'
                placeholder='Enter Name'
                mb='md'
                withAsterisk
              />
              <TextInput
                label='Country'
                placeholder='Enter Country'
                mb='md'
                withAsterisk
              />
              <TextInput label='Domain' placeholder='Enter Domain' mb='md' />
              <DateInput
                value={fromDate}
                onChange={setFromDate}
                label='From Date'
                placeholder='Select From Date'
                mb='md'
              />
              <DateInput
                value={endDate}
                onChange={setEndDate}
                label='End Date'
                placeholder='Select End Date'
                mb='md'
              />
              <NumberInput
                label='Number of URLs'
                placeholder='Enter Number of URLs'
                mb='md'
              />
            </Box>
          </Box>
        </ScrollArea>
      </div>
      <div className={classes.footer}>
        <Button
          bg='premiumDark'
          variant='filled'
          fullWidth
          leftSection={<IconSearch size={14} />}
        >
          Search
        </Button>
        <Button
          mt='md'
          variant='default'
          fullWidth
          leftSection={<IconLogout size={14} />}
          onClick={() => navigate('/login')}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
