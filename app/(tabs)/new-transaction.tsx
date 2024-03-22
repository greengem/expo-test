import React, { useState } from 'react';
import { Text, StatusBar, TextInput, Button, Platform, StyleSheet, View, Alert } from 'react-native';
import { useAddPurchase } from '../store';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


export default function TabNewTransactionScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [note, setNote] = useState('');

  const addPurchase = useAddPurchase();

  const handleSubmit = () => {
    if (!amount || !category || !note) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    addPurchase(Number(amount), category, date.toISOString(), note);
    setAmount('');
    setCategory('');
    setDate(new Date());
    setNote('');
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
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
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
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
  }
});