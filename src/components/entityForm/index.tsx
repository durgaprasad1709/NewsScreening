import { useForm } from '@mantine/form';
import { SearchFormData } from '../../types';
import {
  Box,
  Group,
  NumberInput,
  Radio,
  ScrollArea,
  TagsInput,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { initialFormValues } from '../../utils';

interface EntityFormProps {
  formRef: React.RefObject<HTMLFormElement>;
  onSubmit: (data: SearchFormData) => void;
  initialFormValues?: SearchFormData;
}

export default function EntityForm({
  formRef,
  onSubmit,
  initialFormValues: initialValues = initialFormValues,
}: EntityFormProps) {
  const form = useForm<SearchFormData>({
    mode: 'uncontrolled',
    initialValues,
    validate: {
      name: (value) =>
        value.length < 3 ? 'Name must have at least 3 letters' : null,
      country: (value) =>
        value.length < 3 ? 'Country must have at least 3 letters' : null,
    },
  });

  return (
    <Box mt='md'>
      <form
        ref={formRef}
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        <ScrollArea h='calc(100vh - 240px)' scrollbarSize={5} pr='xs'>
          <SearchTypeRadioGroup form={form} />
          <SearchFormFields form={form} />
        </ScrollArea>
      </form>
    </Box>
  );
}

// Sub-component for the search type radio group
function SearchTypeRadioGroup({
  form,
}: {
  form: ReturnType<typeof useForm<SearchFormData>>;
}) {
  return (
    <Radio.Group
      name='flag'
      label='Search Type'
      withAsterisk
      mb='md'
      {...form.getInputProps('flag')}
    >
      <Group mt='xs'>
        <Radio value='POI' label='POI' color='premiumDark' />
        <Radio value='Entity' label='Entity' color='premiumDark' />
      </Group>
    </Radio.Group>
  );
}

// Sub-component for the form fields
function SearchFormFields({
  form,
}: {
  form: ReturnType<typeof useForm<SearchFormData>>;
}) {
  const flag = form.getValues().flag;

  return (
    <>
      <TextInput
        label='Name'
        placeholder='Enter Name'
        mb='md'
        withAsterisk
        {...form.getInputProps('name')}
      />
      {flag === 'POI' && (
        <TextInput
          label='Company'
          placeholder='Enter Company Name'
          mb='md'
          {...form.getInputProps('company')}
        />
      )}
      <TagsInput
        label='Domain'
        description='Add up to 3 domains'
        placeholder='Enter Domain'
        maxTags={3}
        mb='md'
        {...form.getInputProps('domain')}
      />
      <TextInput
        label='Country'
        placeholder='Enter Country'
        mb='md'
        withAsterisk
        {...form.getInputProps('country')}
      />
      <DateInput
        label='From Date'
        placeholder='Select From Date'
        mb='md'
        withAsterisk
        {...form.getInputProps('start_date')}
      />
      <DateInput
        label='End Date'
        placeholder='Select End Date'
        mb='md'
        withAsterisk
        {...form.getInputProps('end_date')}
      />
      <NumberInput
        label='Number of URLs'
        placeholder='Enter Number of URLs'
        mb='md'
        {...form.getInputProps('numberOfURLs')}
      />
    </>
  );
}
