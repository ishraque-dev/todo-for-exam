import React from 'react';

import './Item.css';
import { getDatabase, ref, remove, update } from 'firebase/database';
const Item = ({ content, status, onClick, userId, itemId }) => {
  console.log(itemId);
  const db = getDatabase();
  const clickHandler = () => {
    console.log('Update');
    update(ref(db, `items/${userId}/${itemId}`), {
      status: true,
    });
  };
  const deleteHandler = () => {
    remove(ref(db, `items/${userId}/${itemId}`));
  };
  const buttonClass = status ? 'done' : null;
  const wrapperClass = status ? 'opacity' : 'wrapper';
  console.log(status);
  return (
    <div className="item">
      <div className={wrapperClass}>
        <div className="left">
          <button
            style={{
              padding: '10px',
              border: '1px solid #3F72AF',
              outline: 'none',
            }}
            className={buttonClass}
            onClick={clickHandler}
          ></button>
          <p>{content}</p>
        </div>
        <div className="right">
          <button style={{ padding: '10px' }} onClick={deleteHandler}>
            {status ? 'Done' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
