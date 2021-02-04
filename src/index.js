import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./styles.css";

const ClickToEdit = props => {
  const [value, setValue] = useState(props.initialValue);
  const [isEditMode, setEditMode] = useState(false);

  const getIntoEditMode = () => {
    if (props.startEditing && !isEditMode) {
       props.startEditing();
    }
    setEditMode(true);
 };

  const getOffEditMode = () => {
    setEditMode(false);
    if (props.endEditing) {
      props.endEditing(value);
    }
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleKeyPress = e => {
    if (
      e.keyCode === 13 ||
      e.charCode === 13 ||
      e.keyCode === 27 ||
      e.charCode === 27
    ) {
      getOffEditMode();
    }
  };

  return (
    <section
      data-value={value}
      className={classNames("CTE--wrapper", props.wrapperClass)}
    >
      {isEditMode ? (
        <input
          type="text"
          autoFocus
          value={value}
          className={classNames("CTE--input", props.inputClass)}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={getOffEditMode}
          size="1"
        />
      ) : (
        <span 
          className={classNames("CTE--text", props.textClass)}
          onClick={getIntoEditMode}
        >
          {value}
        </span>
      )}
    </section>
  );
};

export default ClickToEdit;
