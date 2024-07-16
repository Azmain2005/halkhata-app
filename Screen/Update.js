import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, RefreshControl,Image } from 'react-native';
import axios from 'axios';

const Update = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:7000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://10.0.2.2:7000/products/${id}`, updatedProduct);
      // Refresh data after updating
      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:7000/products/${id}`);
      // Refresh data after deleting
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text>Products:</Text>
        {products.map((product, index) => (
          <ScrollView horizontal>
            <View key={product.id} style={styles.perBox}>
            <View>
                  <Text style={{color:'black',textAlign:'center',fontSize:20,fontWeight:'bold'}}>product details:</Text>
                  <Image
                    style={styles.image}
                    source={{ uri: product.imagePRODUCT }}
                  />
                  
            </View>
            <View style={{margin:30}}>
            <Text style={{color:'black',fontSize:20,fontWeight:"bold",marginTop:20, textAlign:'center'}}>Product Details </Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Product Name:</Text> {product.productName}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.productName}
                          onChangeText={(text) => handleProductChange(index, 'productName', text)}
                          placeholder="New Product Name"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>IMEI: </Text>{product.IMEI}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.IMEI}
                          onChangeText={(text) => handleProductChange(index, 'IMEI', text)}
                          placeholder="New IMEI"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>SN: </Text>{product.SN}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.SN}
                          onChangeText={(text) => handleProductChange(index, 'SN', text)}
                          placeholder="New SN"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>Used Period:</Text>{product.usedPeriod}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.usedPeriod}
                          onChangeText={(text) => handleProductChange(index, 'usedPeriod', text)}
                          placeholder="New Used Period"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>Price:</Text>{product.price} ৳</Text>
                      <TextInput
                          style={styles.input}
                          value={product.price}
                          onChangeText={(text) => handleProductChange(index, 'price', text)}
                          placeholder="New Price"
                      />
            </View>
            <View>
            <Text style={{color:'black',textAlign:'center',fontSize:20,fontWeight:'bold'}}>seller details:</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Seller Name:</Text>{product.SellerName}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.SellerName}
                          onChangeText={(text) => handleProductChange(index, 'SellerName', text)}
                          placeholder="New Seller Name"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Nid no:</Text>{product.NidNo}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.NidNo}
                          onChangeText={(text) => handleProductChange(index, 'NidNo', text)}
                          placeholder="New Nid No"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Father's name:</Text>{product.fatherName}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.fatherName}
                          onChangeText={(text) => handleProductChange(index, 'fatherName', text)}
                          placeholder="New Father Name"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Mother's Name:</Text> {product.motherName}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.motherName}
                          onChangeText={(text) => handleProductChange(index, 'motherName', text)}
                          placeholder="New Mother Name"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Address:</Text> {product.address}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.address}
                          onChangeText={(text) => handleProductChange(index, 'address', text)}
                          placeholder="New Address"
                      />
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Phone Number:</Text> {product.phoneNumber}</Text>
                      <TextInput
                          style={styles.input}
                          value={product.phoneNumber}
                          onChangeText={(text) => handleProductChange(index, 'phoneNumber', text)}
                          placeholder="New Phone Number"
                      />
            </View>
        <View>
            

        </View>
            <View style={{ margin: 30 }}>
              <Button title="Delete" onPress={() => handleDeleteProduct(product.id)} />
              <Button title="Update" onPress={() => handleUpdateProduct(product.id, product)} />
            </View>
          </View>
          </ScrollView>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  perBox: {
    flexDirection: 'row',
    backgroundColor: 'lavender',
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 150, 
    height:150,  
    resizeMode: 'cover', 
    marginBottom: 10,
    borderRadius:20,
    backgroundColor:'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: 'dodgerblue',
    borderColor:'black',
    borderWidth:2,
    width: 70,
    height: 70,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default Update;
