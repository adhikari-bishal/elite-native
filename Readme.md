# Elite Native

A high-quality set of reusable components for React Native.

## Components

### 📌 Buttons

- **Button** - Standard button component.
- **Text Button** - A button with text-only styling.
- **Counter Button** - A counter button.
- **Floating Action Button** - A floating action button for quick actions.
- **Expandable - Floating Action Button** - A floating action button for multiple actions.
- **Floating Action Button Group** - A floating action button for multiple elements.

### 📌 Carousels

- **Carousel** - A carousel component.

### 📌 Form Inputs

- **Checkbox** - A single checkbox component.
- **Checkbox Group** - A group of checkboxes for multiple selections.
- **Date Picker** - A date picker for selecting dates.
- **Email Input** - An input field for email addresses with validation.
- **Masked Input** - An input field with customizable masking.
- **Nepali Date Picker** - A date picker supporting Nepali date format.
- **Number Input** - An input field for numeric values.
- **Password Input** - An input field with secure text entry.
- **Radio Button** - A radio button for single selection options.
- **Select** - A dropdown select component.
- **Switch Selector** - A switch-style selector for toggling between options.
- **Textarea Input** - A multi-line text input field.
- **Text Input** - A customizable text input field.
- **Time Picker** - A time picker for selecting time values.
- **Toggle Switch** - A toggle switch input.

### 📌 Loaders

- **Full-Screen Loader** - A loader that covers the entire screen during loading states.

### 📌 Modals

- **Alert Modal** - A customizable modal to display alerts.

### 📌 Selectors

- **Color Selector** - A component to display and select colors.

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
import {useForm} from 'react-hook-form';
import {Button, TextInput} from "elite-native";

const App = () => {
    const {control, handleSubmit} = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };
    
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

