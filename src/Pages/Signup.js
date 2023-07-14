import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignupPage.module.css';
import { Box, Typography, TextField, Button} from '@mui/material';
import { useState } from 'react';
function SignupPage() {

    const [userData, setuserData] = useState({
        email: '',
        password: '',
    });
    
    const handleChange = (e) => {
        setuserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };
    


    const submitForm = (e) => {
        e.preventDefault();
        let AllData = JSON.parse(localStorage.getItem('usersData'));
        if (AllData === null) {
            AllData = [];
        }
        let index=AllData.findIndex((user)=>user.email===userData.email);
        if(index!==-1){
            alert('User already exists');
            return;
        }
        AllData.push(userData);
        localStorage.setItem('usersData', JSON.stringify(AllData));
        alert("Users creatd successfully")
    };
    
  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form className={styles.form}>
        <input name='email' type="email" placeholder="Email" className={styles.input} onChange={handleChange} />
        <input name='password' type="password" placeholder="Password" className={styles.input} onChange={handleChange}/>
        <button className={styles.button} onClick={submitForm}>Sign Up</button>
      </form>
      <p className={styles.loginLink}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
