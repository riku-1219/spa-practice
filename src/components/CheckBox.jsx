import React from "react";

const CheckBox = (props) => {
  return (
    <>
      <label>
      {props.name}：
        <input
          type='checkbox'
          checked={props.isChecked}
          onChange={props.changeIsChecked}
        />
      </label>
    </>
  );
};

export default CheckBox;
