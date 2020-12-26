import React from "react";

const CheckBox = (props) => {
  return (
    <>
      <label htmlFor='check' onClick={() => props.changeIsChecked(props.code)}>{props.name}：</label>
      <input
        type='checkbox'
        id='check'
        checked={props.isChecked}
        onChange={() => props.changeIsChecked(props.code)}
      />
    </>
  );
};

export default CheckBox;
