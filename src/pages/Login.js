import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Button from './../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = user.uid;
        console.log(user);
        // ...
        navigate('/home', {
          state: {
            userId: userId,
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="login">
      <div className="container">
        <h1>To Do App Login</h1>
        <hr style={{ width: '65%', marginBottom: '30px' }} />
        <form onSubmit={submitHandler}>
          <div className="input">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
