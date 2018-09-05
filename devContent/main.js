import React from "react";
import ReactDOM from "react-dom";
import ClickToEdit from "../dist/index.umd.js";
import "./main.css";

const { Provider, Consumer } = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateDefaultValue = (newValue) => {
      this.setState(state => ({
        value: newValue
      }));
    };

    this.state = {
      value: "Hello World"
    }
  }
  render() {
    return (
      <Provider value={this.state.value}>
        <Consumer>
          {value => (
            <ClickToEdit
              defaultValue={value}
              endEditing={this.updateDefaultValue}
            />
          )}
        </Consumer>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
