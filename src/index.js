import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles.css';

class ClickToEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      onEditMode: false,
    };
    this.input = React.createRef();
  }
  getIntoEditMode = () => {
    this.setState({
      onEditMode: true,
    });
  };
  getOffEditMode = () => {
    this.setState({
      onEditMode: false,
    });
    const isDifferent = this.props.value !== this.input.current.value;
    if (this.props.endEditing && isDifferent) {
      this.props.endEditing(this.input.current.value);
    }
  };
  handleKeys = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        onEditMode: false,
      });
      if (this.props.endEditing) {
        this.props.endEditing(this.input.current.value);
      }
    } else if (e.key === 'Escape') {
      this.setState({
        onEditMode: false,
      });
    }
  };
  render() {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <section
        className={classNames('CTE--wrapper', this.props.wrapperClass)}
        onClick={this.getIntoEditMode}
      >
        {this.state.onEditMode ? (
          <input
            type="text"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            defaultValue={this.props.value}
            className={classNames('CTE--input', this.props.inputClass)}
            onKeyDown={this.handleKeys}
            onBlur={this.getOffEditMode}
            ref={this.input}
          />
        ) : (
          <span className={classNames('CTE--text', this.props.textClass)}>
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
};

ClickToEdit.defaultProps = {
  wrapperClass: '',
  inputClass: '',
  textClass: '',
};

export default ClickToEdit;
