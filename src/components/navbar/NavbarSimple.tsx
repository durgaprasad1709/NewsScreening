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
  IconCancel,
  IconLogout,
  IconSearch,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';
import clsx from 'clsx';

import { useAppContext } from '../../contextAPI/AppContext';
import classes from './NavbarSimple.module.css';
import BulkUpload from '../bulkupload';
import { SearchFormData } from '../../types';
import { useDashboardContext } from '../../hooks';
import jsonData from '../../data/individual.json';
import { wait } from '../../utils';

const segmentedControlData = [
  {
    value: 'individual',
    label: (
      <Center style={{ gap: 10 }}>
        <IconUser style={{ width: rem(16), height: rem(16) }} />
        <span>Entity</span>
      </Center>
    ),
  },
  {
    value: 'bulk',
    label: (
      <Center style={{ gap: 10 }}>
        <IconUsers style={{ width: rem(16), height: rem(16) }} />
        <span>Bulk</span>
      </Center>
    ),
  },
];

export function NavbarSimple() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<'individual' | 'bulk'>(
    'individual',
  );

  const { isMenuCollapsed } = useAppContext();
  const {
    isFetching,
    setIsFetching,
    setEntityData,
    bulkUploadData,
    setBulkUploadData,
  } = useDashboardContext();

  const [controller] = useState<AbortController | null>(null);

  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const initialValues: SearchFormData = {
    name: '',
    country: '',
    domain: '',
    fromDate: lastYear,
    endDate: new Date(),
    numberOfURLs: '15',
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: {
      name: (value) =>
        value.length < 3 ? 'Name must have at least 3 letters' : null,
      country: (value) =>
        value.length < 3 ? 'Country must have at least 3 letters' : null,
      domain: (value) =>
        value.length < 2 ? 'Domain must have at least 2 letters' : null,
    },
  });

  // const fetchScreeningData = async (
  //   url: string,
  //   data: SearchFormData | { bulk_request: SearchFormData[] },
  // ) => {
  //   const abortController = new AbortController();
  //   setController(abortController);
  //   setIsFetching(true);

  //   try {
  //     const response = await fetch(url, {
  //       signal: abortController.signal,
  //       body: JSON.stringify(data),
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) throw new Error('Network response was not ok');

  //     const result = await response.json();
  //     setIsFetching(false);
  //     return result;
  //   } catch (error) {
  //     setIsFetching(false);
  //     handleError(error as Error | DOMException);
  //   }
  // };

  // const handleError = (error: Error | DOMException) => {
  //   if (error instanceof DOMException && error.name === 'AbortError') {
  //     notifications.show({
  //       title: 'Cancelled',
  //       message: 'Your request has been cancelled',
  //       position: 'top-right',
  //       color: 'orange',
  //     });
  //   } else {
  //     notifications.show({
  //       title: 'Something went wrong!!',
  //       message: "We couldn't fetch the data",
  //       position: 'top-right',
  //       color: 'red',
  //     });
  //   }
  // };

  const handleSearch = async () => {
    if (searchType === 'individual') {
      if (!form.validate().hasErrors) {
        const formData = {
          ...form.getValues(),
          sentiment: 'negative',
          start_year: form.getValues().fromDate.getFullYear(),
          end_year: form.getValues().endDate.getFullYear(),
        } as SearchFormData;

        setEntityData((prev) => ({ ...prev, articles: [] }));
        setIsFetching(true);

        await wait(2);

        // const { data } = await fetchScreeningData(
        //   'http://localhost:8000/items/link_extraction/',
        //   formData,
        // );

        // const data = jsonData['Elon Musk'].map((el: any) => {
        //   return {
        //     ...el,
        //     keywords: el.keywords.split(','),
        //   };
        // })
        // console.log({ data });

        const searchName = formData.name.toLowerCase();

        if (!Object.keys(jsonData).includes(searchName)) {
          notifications.show({
            title: 'No data found',
            message: 'Please continue screening with valid input',
            position: 'top-right',
            color: 'orange',
          });
        }

        setIsFetching(false);

        if (jsonData) {
          setEntityData({
            entityInfo: formData,
            articles: jsonData[searchName as keyof typeof jsonData] ?? [],
          });
        }
      }
    } else {
      setEntityData((prev) => ({ ...prev, articles: [] }));

      setIsFetching(true);

      await wait(2);

      // const bulkExtractData = bulkUploadData.map((el) => ({
      //   ...el,
      //   sentiment: 'negative',
      //   start_year: el.fromDate.getFullYear(),
      //   end_year: el.endDate.getFullYear(),
      // }));

      // const data = await fetchScreeningData(
      //   'http://localhost:8000/items/bulk_extraction/',
      //   { bulk_request: bulkExtractData },
      // );

      const allKeys = Object.keys(jsonData);

      const bulkUploadDataKeys = bulkUploadData.map((el) =>
        el.name.toLowerCase(),
      );
      if (!bulkUploadDataKeys.every((el) => allKeys.includes(el))) {
        setEntityData((prev) => ({ ...prev, articles: [] }));
        notifications.show({
          title: 'No data found',
          message: 'Please continue screening with valid input',
          position: 'top-right',
          color: 'orange',
        });

        setIsFetching(false);
        return;
      }

      if (jsonData) {
        const bulkData: any = bulkUploadDataKeys.map((key, index) => {
          return {
            ...bulkUploadData[index],
            articles: jsonData[key as keyof typeof jsonData],
          };
        });

        if (bulkData.length > 0) {
          setBulkUploadData(bulkData);

          setEntityData({
            entityInfo: bulkUploadData[0],
            articles: bulkData[0]?.articles,
          });
        }
      }

      setIsFetching(false);

      // if (data) {
      //   const bulkData: any = Object.keys(data).map((key, index) => {
      //     // console.log({ key });
      //     if (key.includes(bulkUploadData[index].name)) {
      //       return { ...bulkUploadData[index], articles: data[key].data };
      //     }
      //   });
      //   // console.log({ bulkData });
      //   if (bulkData.length > 0) {
      //     setBulkUploadData(bulkData);
      //   }

      //   setEntityData({
      //     entityInfo: bulkUploadData[0],
      //     // articles: data[bulkUploadData[0].name],
      //     articles: bulkData[0]?.articles,
      //   });
      // }
    }
  };

  return (
    <nav
      className={clsx(classes.navbar, { [classes.collapsed]: isMenuCollapsed })}
    >
      <Box>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify='space-between'>
            <Text fw={500} size='md' ta={'center'} w='100%'>
              <span className={classes.eyTitle}> EY </span>2 Sents!
            </Text>
          </Group>
          <ScrollArea className={classes.scrollable} scrollbarSize={5}>
            <Box h='100%'>
              <Group>
                <SegmentedControl
                  color={'premiumDark'}
                  w='100%'
                  defaultValue={searchType}
                  onChange={(value) =>
                    setSearchType(value as 'individual' | 'bulk')
                  }
                  data={segmentedControlData}
                />
              </Group>

              {searchType === 'individual' ? (
                <Box mt='md'>
                  <TextInput
                    label='Name'
                    placeholder='Enter Name'
                    mb='md'
                    withAsterisk
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                  />
                  <TextInput
                    label='Country'
                    placeholder='Enter Country'
                    mb='md'
                    withAsterisk
                    key={form.key('country')}
                    {...form.getInputProps('country')}
                  />
                  <TextInput
                    label='Domain'
                    placeholder='Enter Domain'
                    mb='md'
                    withAsterisk
                    key={form.key('domain')}
                    {...form.getInputProps('domain')}
                  />
                  <DateInput
                    label='From Date'
                    placeholder='Select From Date'
                    mb='md'
                    withAsterisk
                    key={form.key('fromDate')}
                    {...form.getInputProps('fromDate')}
                  />
                  <DateInput
                    label='End Date'
                    placeholder='Select End Date'
                    mb='md'
                    withAsterisk
                    key={form.key('endDate')}
                    {...form.getInputProps('endDate')}
                  />
                  <NumberInput
                    label='Number of URLs'
                    placeholder='Enter Number of URLs'
                    mb='md'
                    key={form.key('numberOfURLs')}
                    {...form.getInputProps('numberOfURLs')}
                  />
                </Box>
              ) : (
                <BulkUpload />
              )}
            </Box>
          </ScrollArea>
        </div>
        <div className={classes.footer}>
          {!isFetching ? (
            <Button
              bg='premiumDark'
              variant='filled'
              fullWidth
              leftSection={<IconSearch size={14} />}
              onClick={handleSearch}
              loading={isFetching}
            >
              Search
            </Button>
          ) : (
            <Button
              color='red'
              variant='light'
              leftSection={<IconCancel size={14} />}
              fullWidth
              onClick={() => {
                controller?.abort();
                setIsFetching(false);
              }}
            >
              Cancel Request
            </Button>
          )}

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
      </Box>
    </nav>
  );
}
