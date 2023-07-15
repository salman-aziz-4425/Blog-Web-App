import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { addAllData, addUsers } from '../redux/postSlicer';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f9f9f9',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  padding: '32px',
  borderRadius: '4px',
  backgroundColor: '#ffffff',
});

const Input = styled(TextField)({
  marginBottom: '16px',
});

const ButtonWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Heading = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '24px',
});

const LoginLink = styled(Typography)({
  fontSize: '0.875rem',
  marginTop: '16px',
});

function SignupPage() {
  const [userData, setUserData] = useState({
    userId: 0,
    name: '',
    email: '',
    password: '',
    posts: [],
  });
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const notify = () => toast('Here is your toast.');
  const submitForm = (e) => {
    e.preventDefault();
    let allData = localStorage.getItem('usersData') || [];
    let userCount = parseInt(localStorage.getItem('userCount')) || 0;

    if (allData.length > 0) {
      allData = JSON.parse(allData);
    }

    if (flag === false) {
      let index = allData.findIndex((item) => item?.email === userData?.email);
      if (index !== -1) {
        alert('User already exists');
        return;
      }
      if ((userData.name === '' || userData.email === '' || userData.password === '')) {
        alert('Please fill all the fields');
        return;
      }
      if(userData.password.length<8){
        alert('Password length is not valid');
        return;
      }
      if(userData.email.includes('@')===false){
        alert('iNVALID EMAIL');
        return;
      }



      userCount++;
      fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userCount)
        .then((res) => res.json())
        .then((data) => {
          userData.posts = data;
          userData.userId = userCount;
          allData.push(userData);
          localStorage.setItem('usersData', JSON.stringify(allData));
          dispatch(addUsers(allData[index]?.userId));
          dispatch(addAllData(allData));
          localStorage.setItem('userCount', userCount);
          alert('User created successfully');
          toast.success('User created successfully');
          return navigate('/');
        });
    } else {
      if (allData.length === 0) {
        alert('User does not exist');
        return;
      } else {
        let index = allData.findIndex((item) => item.email === userData.email&&item.password===userData.password);
        if (index !== -1) {
          toast.success('User logged in successfully');
          toast('User logged in successfully');
          dispatch(addUsers(allData[index].userId));
          dispatch(addAllData(allData));
          localStorage.setItem('ActiveUser', allData[index].userId);
          navigate('/Home');
        } else {
          alert('Invalid credentials');
        }
      }
    }
  };

  return (
    <Container>
      <Heading>{flag === false ? 'Sign Up' : 'Sign In'}</Heading>
      <Form>
        {!flag && (
          <Input
            name="name"
            type="text"
            label="Name"
            placeholder="Name"
            variant="outlined"
            value={userData.name}
            onChange={handleChange}
          />
        )}
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          variant="outlined"
          value={userData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          variant="outlined"
          value={userData.password}
          onChange={handleChange}
        />
        {flag === false ? (
          <ButtonWrapper>
            <Button variant="contained" color="primary" onClick={submitForm}>
              Sign Up
            </Button>
            <LoginLink variant="body2">
              Already have an account?{' '}
              <Button onClick={() => setFlag(!flag)} color="primary">
                Sign In
              </Button>
            </LoginLink>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <Button variant="contained" color="primary" onClick={submitForm}>
              Sign In
            </Button>
            <LoginLink variant="body2">
              Don't have an account?{' '}
              <Button onClick={() => setFlag(!flag)} color="primary">
                Sign Up
              </Button>
            </LoginLink>
          </ButtonWrapper>
        )}
      </Form>
    </Container>
  );
}

export default SignupPage;
