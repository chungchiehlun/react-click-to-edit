import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./styles.css";

class ClickToEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      onEditMode: false
    };
    this.input = React.createRef();
  }
  getIntoEditMode = () => {
    this.setState({
      onEditMode: true
    });
  };
  getOffEditMode = () => {
    this.setState({
      onEditMode: false
    });
    if (this.props.endEditing) {
      this.props.endEditing(this.input.current.value);
    }
  };
  handleEnterKey = e => {
    if (e.keyCode === 13 || e.charCode == 13) {
      this.setState({
        onEditMode: false
      });
      if (this.props.endEditing) {
        this.props.endEditing(this.input.current.value);
      }
    } else {
      if (this.props.onKeyPress && typeof this.props.onKeyPress === 'function') {
        this.props.onKeyPress(e);
      }
    }
  };
  render() {
    return (
      <section
        className={classNames("CTE--wrapper", this.props.wrapperClass)}
        onClick={this.getIntoEditMode}
      >
        {this.state.onEditMode ? (
          <input
            type="text"
            autoFocus
            defaultValue={this.props.value}
            className={classNames("CTE--input", this.props.inputClass)}
            onKeyPress={this.handleEnterKey}
            onBlur={this.getOffEditMode}
            ref={this.input}
          />
        ) : (
            <span className={classNames("CTE--text", this.props.textClass)}>
              {this.props.value}
            </span>
          )}
      </section>
    );
  }
}

ClickToEdit.propTypes = {
  wrapperClass: PropTypes.string,
  inputClass: PropTypes.string,
  textClass: PropTypes.string,
  value: PropTypes.string.isRequired,
  endEditing: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func
};

ClickToEdit.defaultProps = {
  wrapperClass: "",
  inputClass: "",
  textClass: ""
};

export default ClickToEdit;
