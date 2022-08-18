import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import Input from '../components/Input';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, push } from 'firebase/database';
import Button from '../components/Button';
const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [err, setErr] = useState(false);

  // =========================
  const handelChange = (event) => {
    setErr(false);
    const { name, value } = event.target;
    console.log(name);
    // Assign new value to the appropriate form field
    const updatedForm = {
      ...form,
      [name]: value,
    };

    // Update state
    setForm(updatedForm);
  };
  const { name, email, password, confirmPassword } = form;
  console.log(name, email, password, confirmPassword);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword || name === '' || email === '') {
      setErr(true);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = user.uid;

        // ...
        console.log(user);
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
        });
        navigate('/login', {
          state: {
            userId: userId,
          },
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <h1>Todo App Registration</h1>
        <hr style={{ width: '65%', marginBottom: '30px' }} />
        {err && <p style={{ color: 'red' }}>Invalid inputs</p>}
        <form onSubmit={submitHandler}>
          <div className="input">
            <Input
              input={{
                name: 'name',
                type: 'text',
                required: true,
                placeholder: 'Name',
              }}
              value={form.name}
              onChange={handelChange}
            />
          </div>
          <div className="input">
            <Input
              input={{
                type: 'email',
                placeholder: 'Email',
                name: 'email',
              }}
              value={form.email}
              onChange={handelChange}
            />
          </div>
          <div className="input">
            <Input
              input={{
                type: 'password',
                placeholder: 'Password',
                name: 'password',
              }}
              value={form.password}
              onChange={handelChange}
            />
          </div>
          <div className="input">
            <Input
              input={{
                type: 'text',
                placeholder: 'Confirm Password',
                name: 'confirmPassword',
              }}
              value={form.confirmPassword}
              onChange={handelChange}
            />
          </div>
          <Button type="submit">Signup</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
