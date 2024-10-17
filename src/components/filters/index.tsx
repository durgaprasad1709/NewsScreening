import { Button, MultiSelect, Popover } from '@mantine/core';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';

export default function Filters() {
  return (
    <Popover width={400} position='left' withArrow shadow='md'>
      <Popover.Target>
        <Button
          variant='default'
          size='sm'
          leftSection={<IconAdjustmentsHorizontal size={16} />}
        >
          Filters (1)
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <MultiSelect
          label='Filter Articles'
          description='Filter articles by keywords and Sentiment'
          defaultValue={['Positive', 'Keyword 1']}
          data={[
            {
              group: 'Sentiment',
              items: [
                {
                  label: 'Neutral (10)',
                  value: 'Neutral',
                },
                {
                  label: 'Positive (20)',
                  value: 'Positive',
                },
                {
                  label: 'Negative (30)',
                  value: 'Negative',
                },
              ],
            },
            {
              group: 'Keyword',
              items: [
                {
                  label: 'Keyword 1 - (10)',
                  value: 'Keyword 1',
                },
                {
                  label: 'Keyword 2 - (20)',
                  value: 'Keyword 2',
                },
                {
                  label: 'Keyword 3 - (30)',
                  value: 'Keyword 3',
                },
              ],
            },
          ]}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
