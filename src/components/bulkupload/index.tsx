import { useDisclosure, randomId } from '@mantine/hooks';
import {
  Modal,
  Button,
  Box,
  Flex,
  SimpleGrid,
  ActionIcon,
  NumberInput,
  TextInput,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronRight, IconTrash } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';

import { useDashboardContext } from '../../hooks';
import { SearchFormData } from '../../types';
import classes from './BulkUpload.module.css';

const fieldLabels = [
  'Name',
  'Country',
  'Domain',
  'From Date',
  'End Date',
  'Number of URLs',
];

function AddNewForm() {
  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const { bulkUploadData, setBulkUploadData, setEntityData } =
    useDashboardContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      data:
        bulkUploadData.length > 0
          ? bulkUploadData
          : [
              {
                name: '',
                country: '',
                domain: '',
                fromDate: lastYear,
                endDate: today,
                numberOfURLs: '15',
                key: randomId(),
              },
            ],
    },

    validate: {
      data: {
        name: (value) =>
          value.length < 3 ? 'Name must have at least 3 letters' : null,
        country: (value) =>
          value.length < 3 ? 'Country must have at least 3 letters' : null,
        domain: (value) =>
          value.length < 2 ? 'Domain must have at least 2 letters' : null,
      },
    },
  });

  const fields = form.getValues().data.map((item, index) => (
    <form key={item.key}>
      <SimpleGrid cols={6}>
        <TextInput
          placeholder='Enter Name'
          mr='xs'
          key={form.key(`data.${index}.name`)}
          {...form.getInputProps(`data.${index}.name`)}
        />

        <TextInput
          placeholder='Enter Country'
          key={form.key(`data.${index}.country`)}
          {...form.getInputProps(`data.${index}.country`)}
        />

        <TextInput
          placeholder='Enter Domain'
          key={form.key(`data.${index}.domain`)}
          {...form.getInputProps(`data.${index}.domain`)}
        />
        <DateInput
          placeholder='Select From Date'
          defaultValue={lastYear}
          key={form.key(`data.${index}.fromDate`)}
          {...form.getInputProps(`data.${index}.fromDate`)}
        />
        <DateInput
          placeholder='Select End Date'
          defaultValue={today}
          key={form.key(`data.${index}.endDate`)}
          {...form.getInputProps(`data.${index}.endDate`)}
        />

        <Flex>
          <NumberInput
            placeholder='Enter Number of URLs'
            defaultValue={'15'}
            key={form.key(`data.${index}.numberOfURLs`)}
            {...form.getInputProps(`data.${index}.numberOfURLs`)}
          />
          <ActionIcon
            color='red'
            size={'lg'}
            onClick={() => {
              form.removeListItem('data', index);
              if (form.getValues().data.length === 0) {
                setBulkUploadData([]);
              }
            }}
            ml='md'
          >
            <IconTrash size='1rem' />
          </ActionIcon>
        </Flex>

        <Flex align={'flex-start'} gap={'md'}></Flex>
      </SimpleGrid>
    </form>
  ));

  const handleSave = () => {
    const validation = form.validate();

    if (validation.hasErrors) {
      return;
    }

    const data: SearchFormData[] = form.getValues().data;

    const newData = data.map((el) => ({
      ...el,
      articles: [],
    }));

    setBulkUploadData(newData);
    setEntityData({
      entityInfo: {
        name: '',
        country: '',
        domain: '',
        fromDate: lastYear,
        endDate: today,
        numberOfURLs: '15',
        key: randomId(),
      },
      articles: [],
    });

    notifications.show({
      title: 'Success',
      message: 'All changes have been saved successfully!!!',
      position: 'top-right',
      color: 'teal',
    });
  };

  const handleAddNew = () => {
    const validation = form.validate();

    if (validation.hasErrors) {
      return;
    }

    form.insertListItem('data', {
      name: '',
      country: '',
      domain: '',
      fromDate: lastYear,
      endDate: today,
      numberOfURLs: 15,
      key: randomId(),
    });
  };

  return (
    <Box mx='auto' mb='xl'>
      {fields.length > 0 ? (
        <SimpleGrid cols={6} mb='xs'>
          {fieldLabels.map((label) => (
            <Text key={randomId()} fw={500} size='sm'>
              {label}
            </Text>
          ))}
        </SimpleGrid>
      ) : (
        <Text c='dimmed' ta='center'>
          Add People or Entities to start Screening
        </Text>
      )}

      {fields}

      <Group justify='center' mt='xl'>
        <Button variant='default' onClick={handleAddNew}>
          Add New
        </Button>

        {form.getValues().data.length > 0 ? (
          <Button bg={'premiumDark'} variant='filled' onClick={handleSave}>
            Save
          </Button>
        ) : null}
      </Group>
    </Box>
  );
}

export default function BulkUpload() {
  const [opened, { open, close }] = useDisclosure(false);
  const { bulkUploadData, entityData, setEntityData } = useDashboardContext();

  const handleBulkDataChange = (el: SearchFormData) => {
    setEntityData({
      entityInfo: el,
      articles: el.articles ?? [],
    });
  };

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        size={'98%'}
        title='Add People or Entities'
      >
        <AddNewForm />
      </Modal>

      <Flex justify={'center'}>
        <Button onClick={open} variant='default' mt='lg'>
          {bulkUploadData.length > 0
            ? 'Add / Edit People or Entities'
            : 'Add People or Entities'}
        </Button>
      </Flex>

      <Box>
        {bulkUploadData.map((el) => (
          <UnstyledButton
            mt='xs'
            key={el.key}
            className={classes.button}
            data-checked={entityData.entityInfo.name === el.name}
            onClick={() => handleBulkDataChange(el)}
          >
            <Box className={classes.body}>
              <Text fw={500} size='md' mb={'xs'}>
                {el.name}
              </Text>

              <Text c='dimmed' size='sm'>
                Country: {el.country} <br /> Domain: {el.domain}
              </Text>

              {entityData.entityInfo.name === el.name ? (
                <IconChevronRight size={20} />
              ) : null}
            </Box>
          </UnstyledButton>
        ))}
      </Box>
    </Box>
  );
}
