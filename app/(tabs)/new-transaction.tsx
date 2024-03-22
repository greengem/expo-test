import React, { useState } from 'react';
import { Text, StatusBar, TextInput, Button, Platform, StyleSheet, View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAddPurchase } from '../store';

interface FormData {
  amount: string;
  category: string;
  note: string;
}

export default function TabNewTransactionScreen() {
  const [date, setDate] = useState(new Date());
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const addPurchase = useAddPurchase();

  const onSubmit = (data: FormData) => {
    addPurchase(Number(data.amount), data.category, date.toISOString(), data.note);
    reset();
    setDate(new Date());
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Amount"
            keyboardType="numeric"
          />
        )}
        name="amount"
        rules={{ required: 'You must enter an amount' }}
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Category"
          />
        )}
        name="category"
        rules={{ required: 'You must enter a category' }}
      />
      {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Note"
          />
        )}
        name="note"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
