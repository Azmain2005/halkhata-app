import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import axios from 'axios';

const Add = ({ navigation }) => {
  const [newProduct, setNewProduct] = useState({ 
    productName: '', 
    IMEI: '', 
    SN: '', 
    usedPeriod: '', 
    price: '', 
    SellerName: '', 
    NidNo: '', 
    fatherName: '', 
    motherName: '', 
    address: '', 
    phoneNumber: '', 
    imagePRODUCT: '' 
  });


  const handleAddProduct = async () => {
    try {
      await axios.post('http://10.0.2.2:7000/products', newProduct);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };



  return (
    <ScrollView style={{ margin: 20, padding: 10, backgroundColor: 'lavender', borderRadius: 20 }}>

      <Text style={{color:'black',textAlign:'center',fontSize:20,fontWeight:'bold'}}>Add product details:</Text>
      <TextInput
        style={styles.input}
        value={newProduct.productName}
        onChangeText={(text) => setNewProduct({ ...newProduct, productName: text })}
        placeholder="Product Name"
      />
      <TextInput
        style={styles.input}
        value={newProduct.IMEI}
        onChangeText={(text) => setNewProduct({ ...newProduct, IMEI: text })}
        placeholder="IMEI"
      />
      <TextInput
        style={styles.input}
        value={newProduct.SN}
        onChangeText={(text) => setNewProduct({ ...newProduct, SN: text })}
        placeholder="SN"
      />
      <TextInput
        style={styles.input}
        value={newProduct.usedPeriod}
        onChangeText={(text) => setNewProduct({ ...newProduct, usedPeriod: text })}
        placeholder="Used Period"
      />
      <TextInput
        style={styles.input}
        value={newProduct.price}
        onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
        placeholder="Price"
      />
      <Text style={{color:'black',textAlign:'center',fontSize:20,fontWeight:'bold'}}>Add seller details:</Text>
      <TextInput
        style={styles.input}
        value={newProduct.SellerName}
        onChangeText={(text) => setNewProduct({ ...newProduct, SellerName: text })}
        placeholder="Seller Name"
      />
      <TextInput
        style={styles.input}
        value={newProduct.NidNo}
        onChangeText={(text) => setNewProduct({ ...newProduct, NidNo: text })}
        placeholder="NID No"
      />
      <TextInput
        style={styles.input}
        value={newProduct.fatherName}
        onChangeText={(text) => setNewProduct({ ...newProduct, fatherName: text })}
        placeholder="Father Name"
      />
      <TextInput
        style={styles.input}
        value={newProduct.motherName}
        onChangeText={(text) => setNewProduct({ ...newProduct, motherName: text })}
        placeholder="Mother Name"
      />
      <TextInput
        style={styles.input}
        value={newProduct.address}
        onChangeText={(text) => setNewProduct({ ...newProduct, address: text })}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        value={newProduct.phoneNumber}
        onChangeText={(text) => setNewProduct({ ...newProduct, phoneNumber: text })}
        placeholder="Phone Number"
      />
      <TextInput
        style={styles.input}
        value={newProduct.imagePRODUCT}
        onChangeText={(text) => setNewProduct({ ...newProduct, imagePRODUCT: text })}
        placeholder="Image Product"
      />

      <TouchableOpacity onPress={handleAddProduct} style={{ backgroundColor: 'dodgerblue', padding: 15, borderRadius: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
          Add Product
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Add;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor:'white',
  }
});
