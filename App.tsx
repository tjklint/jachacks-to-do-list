import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from 'react-native';
import Task from './components/Task/Task';
import fetch from 'node-fetch';

export default function App() {
  const [task, setTask] = useState<string | null>(null);
  const [taskList, setTaskList] = useState<string[]>([]);

  const addTask = () => {
    if (task) {
      Keyboard.dismiss();
      setTaskList([...taskList, task]);
      setTask(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's to do list 📝</Text>
      <View style={styles.tasksWrapper}>
        <ScrollView style={styles.items}>
          {taskList.map((item, index) => (
            <Task text={item} key={index} />
          ))}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputTask}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task || ''}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={addTask}>
          <View style={styles.addButton}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    marginLeft: 20,
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 20,
  },
  inputTask: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});