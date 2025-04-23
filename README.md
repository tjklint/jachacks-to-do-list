# CUSEC 2025 - Build your first Mobile App  
> Updated + Refactored by: Timothy Klint ([LinkedIn](https://www.linkedin.com/in/timothy-klint))
> Original workshop created by: Sanaa Syed ([LinkedIn](https://www.linkedin.com/in/sanaasy/))

<p align="center" width="100%"><img src='assets/inaction.gif' width=250 />

### FOR THIS WORKSHOP, YOU WILL NEED:
- an IDE (I recommend VS Code)
- [Node.js](https://nodejs.org/en/) installed on your computer
- [Git](https://git-scm.com/)
- A terminal

## 📍 Installing and Setting up Expo 
Follow the steps [here](https://docs.expo.dev/get-started/installation/) to install Expo.
### TL;DR
1. macOS and Linux users should install [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall)
2. Open your terminal and create an Expo account using the command `npx expo register` (or log in with `npx expo login` if you already have one)
3. Download the Expo Go app on your phone

You're good to go! 🤩

## 📍 Setting up your Expo project
Once you've successfully installed Expo CLI and downloaded the Expo Go app, you're ready to create a project! Expo will give you all the starter code you need to begin building your To Do List app.

1. Create a project named `<your-name>-to-do-list` by running the command below in your terminal. (Make sure to run this in a folder you can find later!)
   ```bash
   npx create-expo-app <your-name>-to-do-list --template expo-template-blank-typescript
   ```

> You should see something like this when your project is created:
<p align="center" width="100%"><img src='assets/setupexpoproject.png' width=450 /></p> 

2. Navigate into your project:
   ```bash
   cd <your-name>-to-do-list
   ```

## 📍 Starting your development server
1. Run `npx expo start` and wait for a QR code to pop up in your terminal.
2. For Android users, open the Expo Go app and tap "Scan QR Code". For iOS users, just use your default Camera app to scan the code.

Once a screen like this appears on your phone, you’re ready to build! 🥳
<p align="center" width="100%"><img src='assets/initialexpo.png' width=200 /></p>

> 💻 You can start editing the app in `App.tsx` to get a feel for how React Native works. Try adding some text and see what changes!

---

## 📍 Building the Task component

### 💻 Creating the `Task.tsx` file
1. In your root folder, create a new folder called `components`. Inside it, create a file named `Task.tsx`. We’ll store all reusable components here.

Your folder should now look like this:

```
├── components
│   └── Task.tsx
```

### 💻 Key imports from `react`
At the top of `Task.tsx`, import React and the `useState` hook:

```tsx
import React, { useState } from 'react';
```

### 💻 Key imports from `react-native`
We’ll also import the building blocks for styling and layout:

```tsx
import { View, Text, StyleSheet } from 'react-native';
```

### 💻 Checkbox component
Install `expo-checkbox`:

```bash
npx expo install expo-checkbox
```

Then import it:

```tsx
import Checkbox from 'expo-checkbox';
```

### 💻 Creating the component
Use a functional component with TypeScript props:

```tsx
type Props = {
  text: string;
};

export default function Task({ text }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.task}>
      <View style={styles.row}>
        <Checkbox
          value={checked}
          onValueChange={setChecked}
          color="#3a5a40"
          style={styles.checkbox}
        />
        <Text
          style={[
            styles.taskText,
            { textDecorationLine: checked ? 'line-through' : 'none' },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}
```

### 💻 Styling the component

```tsx
const styles = StyleSheet.create({
  task: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
  },
  checkbox: {
    marginRight: 10,
  },
});
```

You now have a clean, reusable task component!

---

## 📍 Building the main screen

We’ll use `App.tsx` as our main screen. It will include:
1. A title
2. An input bar
3. A scrollable list of tasks

### 💻 Key imports

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import Task from './components/Task';
```

### 💻 App structure

```tsx
export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState<string[]>([]);

  const addTask = () => {
    if (!task) return;
    Keyboard.dismiss();
    setTaskList([...taskList, task]);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's to do list 📝</Text>

      <ScrollView style={styles.scroll}>
        {taskList.map((item, index) => (
          <Task key={index} text={item} />
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
```

### 💻 Styling the app

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a3b18a',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  scroll: {
    flex: 1,
    marginBottom: 80,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#3a5a40',
  },
});
```

---

## ✅ Final Result

You’ve just built your first mobile app with Expo + React Native + TypeScript!

Feel free to customize the styles, add delete functionality, or improve the UI to make it your own.

---

## 🎉 Congrats!!

You've made your first mobile app using React Native and Expo 🥳  
Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/timothy-klint/)!

