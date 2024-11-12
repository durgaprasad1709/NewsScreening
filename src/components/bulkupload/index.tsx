import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  Box,
  Flex,
  Card,
  Text,
  Menu,
  ActionIcon,
  rem,
  Group,
  ScrollArea,
} from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { notifications } from '@mantine/notifications';
import EntityForm from '../entityForm';
import { initialFormValues } from '../../utils';
import { JsonResponse, SearchFormData } from '../../types';
import { useDashboardContext } from '../../hooks';

interface BulkUploadProps {
  entities: SearchFormData[];
  setEntities: React.Dispatch<React.SetStateAction<SearchFormData[]>>;
}

export default function BulkUpload({ entities, setEntities }: BulkUploadProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntity, setCurrentEntity] = useState<SearchFormData | null>(
    null,
  );

  const handleSave = (values: SearchFormData) => {
    setEntities((prev) =>
      isEditing && currentEntity
        ? prev.map((entity) =>
            entity.name === currentEntity.name ? values : entity,
          )
        : [...prev, values],
    );
    notifications.show({
      title: isEditing ? 'Updated' : 'Added',
      message: `Entity has been ${
        isEditing ? 'updated' : 'added'
      } successfully`,
      position: 'top-right',
      color: isEditing ? 'blue' : 'teal',
    });
    resetForm();
    close();
  };

  const handleDelete = (indexToRemove: number) => {
    setEntities((prev) => prev.filter((_, index) => index !== indexToRemove));
    notifications.show({
      title: 'Deleted',
      message: 'Entity has been deleted',
      position: 'top-right',
      color: 'red',
    });
  };

  const handleEdit = (entity: SearchFormData) => {
    setCurrentEntity(entity);
    setIsEditing(true);
    open();
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentEntity(null);
  };

  return (
    <Box>
      <EntityModal
        opened={opened}
        onClose={() => {
          resetForm();
          close();
        }}
        isEditing={isEditing}
        formRef={formRef}
        currentEntity={currentEntity}
        onSubmit={handleSave}
      />

      <Flex justify='center'>
        <Button onClick={() => open()} variant='default' mt='lg'>
          Add Entity
        </Button>
      </Flex>

      <EntityList
        entities={entities}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
}

function EntityModal({
  opened,
  onClose,
  isEditing,
  formRef,
  currentEntity,
  onSubmit,
}: {
  opened: boolean;
  onClose: () => void;
  isEditing: boolean;
  formRef: React.RefObject<HTMLFormElement>;
  currentEntity: SearchFormData | null;
  onSubmit: (values: SearchFormData) => void;
}) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size='md'
      title={isEditing ? 'Edit Entity' : 'Add Entity'}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <EntityForm
        formRef={formRef}
        onSubmit={onSubmit}
        initialFormValues={currentEntity || initialFormValues}
      />
      <Button
        onClick={() => formRef.current?.requestSubmit()}
        variant='filled'
        fullWidth
        bg='premiumDark'
        mt='md'
      >
        {isEditing ? 'Update' : 'Add'}
      </Button>
    </Modal>
  );
}

function EntityList({
  entities,
  onEdit,
  onDelete,
}: {
  entities: SearchFormData[];
  onEdit: (entity: SearchFormData) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <ScrollArea h='calc(100vh - 200px)' scrollbarSize={5} pr='xs'>
      {entities.map((entity, index) => (
        <DisplayEntity
          key={entity.name}
          entity={entity}
          onEdit={() => onEdit(entity)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ScrollArea>
  );
}

function DisplayEntity({
  entity,
  onDelete,
  onEdit,
}: {
  entity: SearchFormData;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const { entityData, bulkUploadData, setEntityData } = useDashboardContext();

  const handleCardClick = () => {
    setEntityData(
      bulkUploadData.find(
        (el) => el.entityInfo.name === entity.name,
      ) as JsonResponse,
    );
  };

  return (
    <Card
      withBorder
      shadow='sm'
      radius='md'
      my='md'
      style={{
        border: `${
          entity.name === entityData.entityInfo.name ? '2px' : '0px'
        } solid #6480b3`,
        cursor: 'pointer',
      }}
      onClick={handleCardClick}
    >
      <Card.Section withBorder inheritPadding py='xs' mb='sm'>
        <Group justify='space-between'>
          <Text fw={500} tt={'uppercase'}>
            {entity.name}
          </Text>
          <EntityMenu onEdit={onEdit} onDelete={onDelete} />
        </Group>
      </Card.Section>

      <EntityDetails entity={entity} />
    </Card>
  );
}

function EntityMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Menu withinPortal position='bottom-end' shadow='sm'>
      <Menu.Target>
        <ActionIcon variant='subtle' color='gray'>
          <IconDots style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
          onClick={onEdit}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          color='red'
          onClick={onDelete}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function EntityDetails({ entity }: { entity: SearchFormData }) {
  return (
    <>
      {entity.company && (
        <Text size='sm' c='dimmed'>
          <Text span>Company: </Text>
          <Text span c='black'>
            {entity.company}
          </Text>
        </Text>
      )}
      {entity.domain.length > 0 && (
        <Text size='sm' c='dimmed' mt='sm'>
          <Text span>Domain: </Text>
          <Text span c='black'>
            {entity.domain.join(', ')}
          </Text>
        </Text>
      )}
      <Text size='sm' c='dimmed' mt='sm'>
        <Text span>Country: </Text>
        <Text span c='black'>
          {entity.country}
        </Text>
      </Text>
    </>
  );
}
