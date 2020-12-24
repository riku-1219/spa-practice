import React from "react";
import { CheckBox } from "./index";

const CheckBoxes = (props) => {
  return (
    <>
      {props.prefs.map((pref) => {
        return <CheckBox name={pref.prefName} key={pref.prefCode} />;
      })}
    </>
  );
};

export default CheckBoxes;
