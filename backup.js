
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Modal ,Alert} from 'react-native';
import axios from 'axios';

const MyComponent = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '', img: '' });
  const [updatedMovie, setUpdatedMovie] = useState({ id: '', title: '', director: '', year: '', img: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:7000/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddMovie = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newMovie.title);
      formData.append('director', newMovie.director);
      formData.append('year', newMovie.year);
      formData.append('img', newMovie.img);

      await axios.post('http://10.0.2.2:7000/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh data after adding
      fetchData();
      setNewMovie({ title: '', director: '', year: '', img: '' }); // Clear input fields
      setIsAdding(false); // Close add modal
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleUpdateMovie = async () => {
    try {
      const formData = new FormData();
      formData.append('title', updatedMovie.title);
      formData.append('director', updatedMovie.director);
      formData.append('year', updatedMovie.year);
      formData.append('img', updatedMovie.img);
      await axios.put(`http://10.0.2.2:7000/movies/${updatedMovie.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh data after updating
      fetchData();
      setUpdatedMovie({ id: '', title: '', director: '', year: '', img: '' }); // Clear input fields
      setIsEditing(false); // Close edit modal
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    Alert.alert(
      'Delete Movie',
      'Are you sure you want to delete this movie?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => handleDeleteMovie(id) }
      ]
    );
  };

  const handleEditMovie = (movie) => {
    setUpdatedMovie({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      year: movie.year,
      img: movie.img
    });
    setIsEditing(true); // Open edit modal
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:7000/movies/${id}`);
      // Refresh data after deleting
      fetchData();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.movieItemContainer} onPress={() => handleEditMovie(item)}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text>{item.director}</Text>
            <Text>{item.year}</Text>
            <Button title="Delete" onPress={() => handleDeleteConfirmation(item.id)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      



      
      <Modal visible={isAdding} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Movie</Text>
          <TextInput
            style={styles.input}
            value={newMovie.title}
            onChangeText={(text) => setNewMovie({ ...newMovie, title: text })}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={newMovie.director}
            onChangeText={(text) => setNewMovie({ ...newMovie, director: text })}
            placeholder="Director"
          />
          <TextInput
            style={styles.input}
            value={newMovie.year}
            onChangeText={(text) => setNewMovie({ ...newMovie, year: text })}
            placeholder="Year"
          />
          <TextInput
            style={styles.input}
            value={newMovie.img}
            onChangeText={(text) => setNewMovie({ ...newMovie, img: text })}
            placeholder="Image URL"
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setIsAdding(false)} />
            <Button title="Add" onPress={handleAddMovie} />
          </View>
        </View>
      </Modal>






      <Modal visible={isEditing} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Movie</Text>
          <TextInput
            style={styles.input}
            value={updatedMovie.title}
            onChangeText={(text) => setUpdatedMovie({ ...updatedMovie, title: text })}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={updatedMovie.director}
            onChangeText={(text) => setUpdatedMovie({ ...updatedMovie, director: text })}
            placeholder="Director"
          />
          <TextInput
            style={styles.input}
            value={updatedMovie.year}
            onChangeText={(text) => setUpdatedMovie({ ...updatedMovie, year: text })}
            placeholder="Year"
          />
          <TextInput
            style={styles.input}
            value={updatedMovie.img}
            onChangeText={(text) => setUpdatedMovie({ ...updatedMovie, img: text })}
            placeholder="Image URL"
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
            <Button title="Update" onPress={handleUpdateMovie} />
          </View>
        </View>
      </Modal>

      <View style={styles.addContainer}>
        <Button title="Add New Movie" onPress={() => setIsAdding(true)} />
      </View>
    </View>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  movieItemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  addContainer: {
    marginTop: 20,
  },
});

export default MyComponent;
