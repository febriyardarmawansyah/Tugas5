import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, Button, Icon } from 'react-native-elements';

// Get screen width for responsive design
const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

// Daftar resep yang akan ditampilkan
const recipes = [
  { 
    id: '1', 
    title: 'Nasi Goreng', 
    description: 'Nasi goreng dengan bumbu rempah.', 
    ingredients: 'Nasi, Bawang, Kecap, Telur', 
    imageUrl: 'https://i2.wp.com/resepkoki.id/wp-content/uploads/2017/03/Resep-Nasgor-sapi.jpg?fit=1300%2C975&ssl=1'
  },
  { 
    id: '2', 
    title: 'Ayam Goreng', 
    description: 'Ayam goreng dengan bumbu kuning.', 
    ingredients: 'Ayam, Kunyit, Bawang Putih, Garam', 
    imageUrl: 'https://img-global.cpcdn.com/recipes/5f0a3dfc24f85873/680x482cq70/ayam-goreng-bumbu-kuning-versi-pecel-ayam-foto-resep-utama.jpg'
  },
  { 
    id: '3', 
    title: 'Soto Ayam', 
    description: 'Soto ayam segar dengan kuah gurih.', 
    ingredients: 'Ayam, Bumbu Soto, Jeruk Nipis', 
    imageUrl: 'https://rinaresep.com/wp-content/uploads/2021/07/Soto-ayam.jpg'
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { recipe: item })}>
            <Card containerStyle={styles.card}>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.recipeImage}
                resizeMode="cover" // Menyesuaikan gambar dengan baik
              />
              <Text style={styles.description}>{item.description}</Text>
              <Button 
                title="View Recipe" 
                onPress={() => navigation.navigate('Detail', { recipe: item })} 
                buttonStyle={styles.button}
              />
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const DetailScreen = ({ route }) => {
  const { recipe } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Icon name="utensils" type="font-awesome-5" size={50} color="#FF6347" />
      <Text style={styles.title}>{recipe.title}</Text>
      <Image source={{ uri: recipe.imageUrl }} style={styles.detailImage} resizeMode="contain" />
      <Text style={styles.subtitle}>Ingredients:</Text>
      <Text style={styles.text}>{recipe.ingredients}</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: ' Resep Enak Kami' }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Recipe Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#FFF',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  recipeImage: {
    width: '100%',  // Gambar akan mengambil lebar penuh dari kontainer
    height: 200,    // Tentukan tinggi tetap
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FF6347',
    textAlign: 'center',
  },
  detailImage: {
    width: '100%',
    height: 250, // Gambar menyesuaikan dengan lebar 100% dan tinggi tetap
    borderRadius: 15,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
});
