import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenseScreen = ({ route, navigation }) => {
  const { category, setExpenses } = route.params;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isCurrentDateTime, setIsCurrentDateTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isCurrentDateTime) {
      const now = new Date();
      setDate(now.toISOString().split('T')[0]); // Set current date in YYYY-MM-DD format
      setTime(now.toTimeString().split(' ')[0]); // Set current time in HH:mm:ss format
    }
  }, [isCurrentDateTime]);

  const saveExpense = async () => {
    setIsLoading(true);
    const newExpense = { amount: parseFloat(amount), description, date, time };
    const storedExpenses = await AsyncStorage.getItem(category);
    const updatedExpenses = storedExpenses ? [...JSON.parse(storedExpenses), newExpense] : [newExpense];

    await AsyncStorage.setItem(category, JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);
    navigation.goBack();
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="gray" // Set placeholder text color to gray
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="gray"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 2024-11-17)"
        placeholderTextColor="gray"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g., 14:30)"
        placeholderTextColor="gray"
        value={time}
        onChangeText={setTime}
      />
      
      <CheckBox
        title="Pick Current Date & Time"
        checked={isCurrentDateTime}
        onPress={() => setIsCurrentDateTime(!isCurrentDateTime)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveExpense} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 },
  saveButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8 },
  saveButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});

export default AddExpenseScreen;