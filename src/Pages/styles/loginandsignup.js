import { styled } from '@mui/system';
import { Typography, TextField } from '@mui/material';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  });
  
  export  const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    padding: '32px',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
  });
  
  export  const Input = styled(TextField)({
    marginBottom: '16px',
  });
  
  export const ButtonWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  
  export const Heading = styled(Typography)({
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '24px',
  });
  
  export const LoginLink = styled(Typography)({
    fontSize: '0.875rem',
    marginTop: '16px',
  });
  