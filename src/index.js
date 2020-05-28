import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./styles.css";

const ClickToEdit = props => {
  const [isEditMode, setEditMode] = useState(false);
  const inputEl = useRef(null);

  const getIntoEditMode = () => {
    setEditMode(true);
  };
  const getOffEditMode = () => {
    setEditMode(false);
    if (props.endEditing) {
      props.endEditing(inputEl.current.value);
    }
  };
  const handleEnterKey = e => {
    if (e.keyCode === 13 || e.charCode == 13) {
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
          ref={inputEl}
          type="text"
          autoFocus
          defaultValue={props.value}
          className={classNames("CTE--input", props.inputClass)}
          onKeyPress={handleEnterKey}
          onBlur={getOffEditMode}
        />
      ) : (
        <span className={classNames("CTE--text", props.textClass)}>
          {props.value}
        </span>
      )}
    </section>
  );
};

// ClickToEdit.propTypes = {
//   wrapperClass: PropTypes.string,
//   inputClass: PropTypes.string,
//   textClass: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   endEditing: PropTypes.func.isRequired
// };

// ClickToEdit.defaultProps = {
//   wrapperClass: "",
//   inputClass: "",
//   textClass: ""
// };

export default ClickToEdit;
