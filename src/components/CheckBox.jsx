import React from "react";

const CheckBox = (props) => {
  return (
    <>
      <label htmlFor='check'>{props.name}：</label>
      <input type='checkbox' id='check' />
    </>
  );
};

export default CheckBox;
