import React, { useState } from 'react';
import { StatusBar, TextInput, Button, Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAddPurchase } from '../store';

export default function TabTwoScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const addPurchase = useAddPurchase();

  const handleSubmit = () => {
    addPurchase(Number(amount), category, date, note);
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Date"
      />
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Note"
      />
      <Button title="Submit" onPress={handleSubmit} />
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});