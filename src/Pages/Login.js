
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { addAllData, addUsers } from '../redux/postSlicer';
import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast';
import {Container,Form,Input,ButtonWrapper,Heading,LoginLink} from "./styles/loginandsignup"



function SignupPage() {
  const [userData, setUserData] = useState({
    userId: 0,
    name: '',
    email: '',
    password: '',
    posts: [],
  });
  const [loginSignupOption, setloginSignupOption] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = async(e) => {
    e.preventDefault();
    let allData = localStorage.getItem('usersData') || [];
    let userCount = parseInt(localStorage.getItem('userCount')) || 0;

    if (allData.length > 0) {
      allData = JSON.parse(allData);
    }

    if (loginSignupOption === false) {
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
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userCount}`);
      const data = await res.json();
      userData.posts = data;
      userData.userId = userCount;
      allData.push(userData);
      localStorage.setItem('usersData', JSON.stringify(allData));
      dispatch(addUsers(allData[index]?.userId));
      dispatch(addAllData(allData));
      localStorage.setItem('userCount', userCount);
      alert('User created successfully');
      return navigate('/');
    } else {
      if (allData.length === 0) {
        alert('User does not exist');
        return;
      } else {
        try{
          let index = allData.findIndex((item) => item.email === userData.email&&item.password===userData.password);
          if (index !== -1) {
            toast.success('User logged in successfully');
            toast('User logged in successfully');
            dispatch(addUsers(allData[index].userId));
            dispatch(addAllData(allData));
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('ActiveUser', allData[index].userId);
              navigate('/Home');
            } else {
              throw new Error('localStorage is not defined');
            }
          } else {
            alert('Invalid credentials');
          }
        }catch(err){
          alert(err);
        }
      }
    }
  };

  const inputProps = [
    {
      visibility: loginSignupOption ? 'hidden' : 'visible',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Name',
      variant: 'outlined',
      value: userData.name,
    },
    {
      visibility:'visible',
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Email',
      variant: 'outlined',
      value: userData.email,
    },
    {
      visibility:'visible',
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
      variant: 'outlined',
      value: userData.password,
    }
  ]

  return (
    <Container>
      <Heading>{loginSignupOption === false ? 'Sign Up' : 'Sign In'}</Heading>
      <Form>
        {
          inputProps.map((item,index)=>(
            item.visibility==='visible'&&<Input
            key={index}
            name={item.name}
            type={item.type}
            label={item.label}
            placeholder={item.placeholder}
            variant={item.variant}
            value={item.value}
            onChange={handleChange}
          />
          ))
        }
          <ButtonWrapper>
            <Button variant="contained" color="primary" onClick={submitForm}>
              {
                 !loginSignupOption?'Sign Up':'Sign In'
              }
            </Button>
            <LoginLink variant="body2">
              {
                !loginSignupOption?'Already have an account?':'Dont have a account'
              }
              <Button onClick={() =>  setloginSignupOption(!loginSignupOption)} color="primary">
                {
                  !loginSignupOption?'Sign In':'Sign Up'
                }
               
              </Button>
            </LoginLink>
          </ButtonWrapper>
      </Form>
    </Container>
  );
}

export default SignupPage;