# React-Click-To-Edit

Add it to your component including text such as label, article and table and make the text editable.

## Installation

```bash
$ npm install react-click-to-edit
or
$ yarn add react-click-to-edit
```

## Usage

```jsx
// ESM
import CTE from "react-click-to-edit";
or;
// Commonjs
const CTE = require("react-click-to-edit");
```

| props        | type          | usage                                                                            |
| :----------- | ------------- | -------------------------------------------------------------------------------- |
| wrapperClass | string        | css class applied to the _wrapper_ (or container) consists of _input_ and _text_ |
| inputClass   | string        | css class applied to the _input_                                                 |
| textClass    | string        | css class applied to the _text_                                                  |
| initialValue | string        | initial value of text                                                            |
| endEditing   | (value) => {} | callback invoked when leaving edit mode by clicking ENTER or ESC                 |

[See elaborate examples](https://react-click-to-edit.web.app/docs-examples)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT
