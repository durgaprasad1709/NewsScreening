import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './AuthenticationTitle.module.css';

export function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.containerContent} w={420} my={40}>
        <Title ta='center' c='white' className={classes.title}>
          Welcome back!
        </Title>
        <Text size='sm' ta='center' c='white' mt={5}>
          Do not have an account yet?{' '}
          <Anchor size='sm' component='button'>
            Create account
          </Anchor>
        </Text>

        <Paper
          withBorder
          shadow='md'
          // bg='rgba(255, 255, 255, 0.6)'
          p={30}
          mt={30}
          radius='md'
        >
          <TextInput
            autoFocus
            label='Email'
            placeholder='Enter Email'
            required
          />
          <PasswordInput
            label='Password'
            placeholder='Enter password'
            required
            mt='md'
          />
          <Group justify='space-between' mt='lg'>
            <Checkbox label='Remember me' />
            <Anchor component='button' size='sm'>
              Forgot password?
            </Anchor>
          </Group>
          <Button bg='#304e7d' fullWidth mt='xl' onClick={handleSignIn}>
            Sign in
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
