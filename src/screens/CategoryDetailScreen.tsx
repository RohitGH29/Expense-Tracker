import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryDetailScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const storedExpenses = await AsyncStorage.getItem(category);
      setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
    };
    fetchExpenses();
  }, [category]);

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Expenses</Text>
      {expenses.length === 0 ? (
        <Text style={styles.noDataText}>No expenses yet. Add your first expense!</Text>
      ) : (
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <Text style={styles.expenseItem}>
              {item.description} - ₹{item.amount}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddExpense', { category, setExpenses })}
      >
        <Text style={styles.addButtonText}>Add New Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.totalButton}
        onPress={() => alert(`Total Expenses: ₹₹{calculateTotal()}`)}
      >
        <Text style={styles.totalButtonText}>Show Total</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  noDataText: { color: '#555', fontSize: 16 },
  expenseItem: { fontSize: 18, marginVertical: 5 },
  addButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginVertical: 10 },
  addButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
  totalButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8 },
  totalButtonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});

export default CategoryDetailScreen;
