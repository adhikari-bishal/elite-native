# Elite Native

A high-quality set of reusable components for React Native.

## Components

### 📌 Buttons

- **Button** - Standard button component.
- **Text Button** - A button with text-only styling.
- **Floating Action Button** - A floating action button for quick actions.

### 📌 Form Inputs

- **CheckboxGroup** - A group of checkboxes for multiple selections.
- **Checkbox** - A single checkbox component.
- **DatePicker** - A date picker for selecting dates.
- **EmailInput** - An input field for email addresses with validation.
- **MaskedInput** - An input field with customizable masking.
- **NepaliDatePicker** - A date picker supporting Nepali date format.
- **NumberInput** - An input field for numeric values.
- **PasswordInput** - An input field with secure text entry.
- **RadioButton** - A radio button for single selection options.
- **Select** - A dropdown select component.
- **SwitchSelector** - A switch-style selector for toggling between options.
- **TextareaInput** - A multi-line text input field.
- **TimePicker** - A time picker for selecting time values.

### 📌 Loaders

- **Full-Screen Loader** - A loader that covers the entire screen during loading states.

## Compatibility

- **Tested with**: React Native (Expo)
- **Supported Platforms**: iOS, Android

## Installation

```sh
npm install elite-native
# or
yarn add elite-native
```

## Usage Example

```tsx
import {Button, TextInput, Select} from "elite-native";

const App = () => {
    return (
        <View>
            <TextInput control={control} label="Name" name="name" placeholder="Enter your name"/>
            <Button title="Submit" onPress={() => alert("Submitted!")}/>
        </View>
    );
};
```

## 📖 Wiki

Check out the [Wiki](https://github.com/adhikari-bishal/elite-native/wiki) for more documentation.

## Roadmap

🚀 More components and enhancements will be added in future updates. Stay tuned!

## License

MIT

