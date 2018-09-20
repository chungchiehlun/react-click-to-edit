## React Click-To-Edit
A simple component make the text editable.

## Installation

```bash
$ npm install react-click-to-edit
or
$ yarn add react-click-to-edit
```

## General Usage

```jsx
import ClickToEdit from "react-click-to-edit"

<ClickToEdit
  /*
    String className to be applied to wrapper the input and text element.
  */
  wrapperClass="wrapperClase"
  /*
  	String className to be applied to the input element.
  */
  inputClass="inputClass"
  /*
  	String className to be applied to the text element.
  */
  textClass="textClass"
  /*
  	String value to be applied to the input and text element.
  */
  value={value}
  /*
  	Function that will be called after the input element lose focus or press carriage return.
  */
  endEditing={() => {}}
/>
```

## Issues
Feel free to submit issues and enhancement requests.

## License
MIT 
