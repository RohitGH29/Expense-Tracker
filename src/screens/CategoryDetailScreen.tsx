import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation prop types
type CategoryDetailScreenNavigationProp = StackNavigationProp<any, 'CategoryDetail'>;
type CategoryDetailScreenRouteProp = RouteProp<any, 'CategoryDetail'>;

// Define the params type for the route
interface RouteParams {
  category: string;
}

interface Props {
  navigation: CategoryDetailScreenNavigationProp;
  route: CategoryDetailScreenRouteProp;
}

const CategoryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { category } = route.params as RouteParams; // Type casting to RouteParams

  // Sample data for expenses (You would fetch this from AsyncStorage or your state management)
  const expenses = [
    { id: 1, amount: 50, description: 'Groceries' },
    { id: 2, amount: 30, description: 'Transport' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses for {category}</Text>
      
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text>{item.description} - ${item.amount}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { backgroundColor: '#f9f9f9', padding: 15, marginBottom: 10, borderRadius: 8 },
});

export default CategoryDetailScreen;
