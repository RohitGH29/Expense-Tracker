import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, BackHandler } from 'react-native';

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const categories = ['Groceries', 'Investment', 'Food', 'Personal', 'Miscellaneous'];

  // Back button prompt for Android devices
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to exit the app?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CategoryDetail', { category: item })}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 15, marginVertical: 5, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18 },
});

export default HomeScreen;
