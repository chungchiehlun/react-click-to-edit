## React Click-To-Edit
A simple wrapper component make any text editable.

## Getting Started
### Installation
`npm install react-click-to-edit`

### Usage

```jsx
import ClickToEdit from 'react-click-to-edit'

<ClickToEdit
  customStyle='myStyle'
  endEditing={(value) => console.log(`New value: ${value}`)}
  >
  Click to edit here !
</ClickToEdit>
```

### Optional Props
**customStyle: {String}**

Customize component style which will be added to the outer container.

```css
.myStyle {
  font-size: 1.3em;
  width: 200px;
  height: 40px;
}
```

**endEditing: {Function}**

Access the latest value after editing. It's convenient to dispatch actions to update store if you using **redux** or **flux** in your project.


## Issues
Feel free to submit issues and enhancement requests.

## License
MIT 
