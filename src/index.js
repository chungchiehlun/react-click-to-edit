import React from 'react'
import './styles.css'

const makeContentEditable = (WrappedComponent) => class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.children,
      onEditMode: false,
    }
    this.getIntoEditMode = this.getIntoEditMode.bind(this)
    this.handleEnterKey = this.handleEnterKey.bind(this)
    this.getOffEditMode = this.getOffEditMode.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }
  getIntoEditMode() {
    this.setState({
      ...this.state,
      onEditMode: true,
    })
  }
  getOffEditMode() {
    this.setState({
      ...this.state,
      onEditMode: false,
    })
    if (this.props.endEditing) {
      this.props.endEditing(this.state.value)
    }
  }
  handleEnterKey(e) {
    if(e.keyCode === 13 || e.charCode == 13){
      this.setState({
        ...this.state,
        onEditMode: false,
      })
      if (this.props.endEditing) {
        this.props.endEditing(this.state.value)
      }
    }
  }
  changeValue(e) {
    this.setState({
      ...this.state,
      value: e.target.value,
    })
  }
  render() {
    const { customStyle } = this.props
    return (
      <section
        styleName='wrapper'
        className={customStyle || ''}
        onClick={this.getIntoEditMode} >
        {
          (this.state.onEditMode) ? (
            <input
               type='text'
               autoFocus
               value={this.state.value}
               styleName='input'
               onChange={this.changeValue}
               onKeyPress={this.handleEnterKey}
               onBlur={this.getOffEditMode}
             />
          ) : (
            <span
              styleName='text'
            >{this.state.value}</span>
          )
        }
      </section>
    )
  }
}

const labelize = (props) => <section>{props.children}</section>

const ClickToEdit = makeContentEditable(labelize)

export default ClickToEdit
