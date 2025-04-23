import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

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

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#fff',
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
