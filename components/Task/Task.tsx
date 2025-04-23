import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';


interface TaskProps {
  text: string;
}

const Task: React.FC<TaskProps> = ({ text }) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Checkbox
          value={isSelected}
          onValueChange={setSelection}
          color="#3a5a40"
          style={styles.checkbox}
        />
        <Text
          style={{
            ...styles.itemText,
            textDecorationLine: isSelected ? 'line-through' : 'none',
          }}
        >
          {text}
        </Text>
      </View>
      {isSelected ? <Text>🥳</Text> : <View style={styles.circular} />}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    maxWidth: '80%',
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    marginRight: 10,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#3a5a40',
    borderWidth: 2,
    borderRadius: 6,
  },
});

export default Task;