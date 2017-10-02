import React from 'react'
import './styles.css'

const makeContentEditable = (WrappedComponent) => class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.children,
      onEdit: false,
    }
    this.enterEditMode = this.enterEditMode.bind(this)
    this.leaveEditMode = this.leaveEditMode.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }
  enterEditMode() {
    this.setState({
      ...this.state,
      onEdit: true,
    })
  }
  leaveEditMode(e) {
    if(e.keyCode === 13 || e.charCode == 13){
      this.setState({
        ...this.state,
        onEdit: false,
      })
    }
  }
  changeValue(e) {
    this.setState({
      ...this.state,
      value: e.target.value,
    })
  }
  render() {
    const { children, ...props } = this.props
    return (
      <WrappedComponent {...props} >
        <section onClick={this.enterEditMode}>
          {
            (this.state.onEdit)
            ? <input
                type='text'
                autoFocus
                value={this.state.value}
                onChange={this.changeValue}
                onKeyPress={this.leaveEditMode}
              />
            : <span>{this.state.value}</span>
          }
        </section>
      </WrappedComponent>
    )
  }
}

const labelize = (props) => <span>{props.children}</span>

const ClickToEdit = makeContentEditable(labelize)

export default ClickToEdit
