import {
  Box,
  Button,
  Center,
  Group,
  SegmentedControl,
  Text,
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
import { useRef, useState } from 'react';
import clsx from 'clsx';

import { useAppContext } from '../../contextAPI/AppContext';
import classes from './NavbarSimple.module.css';
import BulkUpload from '../bulkupload';
import EntityForm from '../entityForm';
import { ArticleData, SearchFormData } from '../../types';
import { formatDate } from '../../utils';
import { useDashboardContext } from '../../hooks';
import { notifications } from '@mantine/notifications';

const SEGMENTED_CONTROL_OPTIONS = [
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

type SearchType = 'individual' | 'bulk';

// Fetch Data Function
const fetchData = async (
  url: string,
  data: SearchFormData | { bulk_request: SearchFormData[] },
  abortController: AbortController,
  setIsFetching: (isFetching: boolean) => void,
) => {
  setIsFetching(true);
  try {
    const response = await fetch(url, {
      signal: abortController.signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } finally {
    setIsFetching(false);
  }
};

export function NavbarSimple() {
  const navigate = useNavigate();
  const { isMenuCollapsed } = useAppContext();
  const [searchType, setSearchType] = useState<SearchType>('individual');
  const [entities, setEntities] = useState<SearchFormData[]>([]);
  const [controller, setController] = useState<AbortController | null>(null);
  const { isFetching, setIsFetching, setEntityData, setBulkUploadData } =
    useDashboardContext();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSearch = async (values: SearchFormData) => {
    let formData = null;
    if (searchType === 'individual') {
      formData = {
        ...values,
        start_date: formatDate(values.start_date),
        end_date: formatDate(values.end_date),
      };
    } else {
      formData = { bulk_request: entities.map(formatEntity) };
    }

    const abortController = new AbortController();
    setController(abortController);

    const url =
      searchType === 'individual'
        ? 'http://127.0.0.1:8000/items/link_extraction'
        : 'http://127.0.0.1:8000/items/bulk_extraction';

    const data = await fetchData(url, formData, abortController, setIsFetching);

    if (searchType === 'individual') {
      setEntityData({
        entityInfo: values,
        articles: data.data,
        'keywords-data-agg': data['keywords-data-agg'],
      });
    } else {
      const responseKeys = Object.keys(data);
      const bulkData = entities.map((entityInfo) => {
        const responseKeyIndex = responseKeys.findIndex((key) =>
          key.includes(entityInfo.name),
        );
        const jsonData = data[responseKeys[responseKeyIndex]];

        return {
          entityInfo,
          articles: jsonData.data as ArticleData[],
          'keywords-data-agg': jsonData['keywords-data-agg'],
        };
      });

      setEntityData(bulkData[0]);
      setBulkUploadData(bulkData);
    }
  };

  const handleSearchClick = () => {
    if (searchType === 'individual') {
      formRef.current?.requestSubmit();
    } else {
      handleSearch(entities[0]);
    }
  };

  const handleLogout = () => navigate('/login');
  const handleCancelRequest = () => {
    controller?.abort();
    notifications.show({
      title: 'Cancelled',
      message: 'Network request has been cancelled',
      position: 'top-right',
      color: 'orange',
    });
  };

  const formatEntity = (entity: SearchFormData) => ({
    ...entity,
    start_date: formatDate(entity.start_date),
    end_date: formatDate(entity.end_date),
  });

  return (
    <nav
      className={clsx(classes.navbar, { [classes.collapsed]: isMenuCollapsed })}
    >
      <Box>
        <NavbarHeader />
        <Box className={classes.scrollable}>
          <Box h='100%'>
            <Group>
              <SegmentedControl
                color='premiumDark'
                w='100%'
                value={searchType}
                onChange={(value) => setSearchType(value as SearchType)}
                data={SEGMENTED_CONTROL_OPTIONS}
              />
            </Group>
            {searchType === 'individual' ? (
              <EntityForm onSubmit={handleSearch} formRef={formRef} />
            ) : (
              <BulkUpload entities={entities} setEntities={setEntities} />
            )}
          </Box>
        </Box>
        <Footer
          isFetching={isFetching}
          onSearchClick={handleSearchClick}
          onCancelRequest={handleCancelRequest}
          onLogout={handleLogout}
        />
      </Box>
    </nav>
  );
}

// Navbar Header Component
const NavbarHeader = () => (
  <Group className={classes.header} justify='space-between'>
    <Text fw={500} size='md' ta='center' w='100%'>
      <span className={classes.eyTitle}> EY </span>2 Sents!
    </Text>
  </Group>
);

// Footer Component
const Footer = ({
  isFetching,
  onSearchClick,
  onCancelRequest,
  onLogout,
}: {
  isFetching: boolean;
  onSearchClick: () => void;
  onCancelRequest: () => void;
  onLogout: () => void;
}) => (
  <div className={classes.footer}>
    {isFetching ? (
      <Button
        color='red'
        variant='light'
        leftSection={<IconCancel size={16} />}
        fullWidth
        onClick={onCancelRequest}
      >
        Cancel Request
      </Button>
    ) : (
      <Button
        bg='premiumDark'
        variant='filled'
        fullWidth
        leftSection={<IconSearch size={16} />}
        onClick={onSearchClick}
      >
        Search
      </Button>
    )}
    <Button
      mt='md'
      variant='default'
      fullWidth
      leftSection={<IconLogout size={16} />}
      onClick={onLogout}
    >
      Logout
    </Button>
  </div>
);
