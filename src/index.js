import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./styles.css";

const ClickToEdit = props => {
  const [value, setValue] = useState(props.value);
  const [isEditMode, setEditMode] = useState(false);

  const getIntoEditMode = () => {
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
      className={classNames("CTE--wrapper", props.wrapperClass)}
      onClick={getIntoEditMode}
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
        />
      ) : (
        <span className={classNames("CTE--text", props.textClass)}>
          {value}
        </span>
      )}
    </section>
  );
};

export default ClickToEdit;
