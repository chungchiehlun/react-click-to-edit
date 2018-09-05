import React from "react";
import PropTypes from "prop-types";
import "normalize.css/normalize.css";

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
    }
  };
  render() {
    // const { customStyle } = this.props;
    return (
      <section className="CTE--wrapper" onClick={this.getIntoEditMode}>
        {this.state.onEditMode ? (
          <input
            type="text"
            autoFocus
            defaultValue={this.props.defaultValue}
            className="CTE--input"
            onKeyPress={this.handleEnterKey}
            onBlur={this.getOffEditMode}
            ref={this.input}
          />
        ) : (
          <span className="CTE--text">{this.props.defaultValue}</span>
        )}
      </section>
    );
  }
}

ClickToEdit.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  endEditing: PropTypes.func
};

export default ClickToEdit;
