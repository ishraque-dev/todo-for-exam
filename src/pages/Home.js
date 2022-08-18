import React, { useState, useEffect } from 'react';
import Item from '../components/Item';
import { useLocation } from 'react-router-dom';
import './home.css';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
const Home = () => {
  const location = useLocation();
  const userId = location.state.userId;
  const [item, setItem] = useState([]);
  const [content, setContent] = useState('');
  const db = getDatabase();
  const submitHandler = (e) => {
    e.preventDefault();
    if (content === undefined) {
      return;
    }
    set(push(ref(db, 'items/' + userId)), {
      content: content,
      status: false,
    });
    setContent('');
  };
  useEffect(() => {
    const starCountRef = ref(db, 'items/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      for (const key in data) {
        arr.push({ ...data[key], id: key });
      }
      setItem(arr);
    });
  }, [db, userId]);
  return (
    <div className="home">
      <div className="container">
        <h1>To Do App</h1>
        <hr style={{ width: '65%', marginBottom: '10px' }} />
        <form onSubmit={submitHandler}>
          <input
            placeholder="Some words "
            className="form-input"
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button type="submit" className="btn-add">+</button>
        </form>
        {item?.map((item) => {
          return (
            <Item
              content={item.content}
              status={item.status}
              userId={userId}
              itemId={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
