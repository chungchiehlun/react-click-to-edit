import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import classNames from "classnames";
import "./styles.css";

interface Props {
  wrapperClass?: string
  inputClass?: string
  textClass?: string
  initialValue: string
  startEditing?: () => void
  endEditing?: (value: string) => void
}

const ClickToEdit: React.FC<Props> = (props) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
          size={1}
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
