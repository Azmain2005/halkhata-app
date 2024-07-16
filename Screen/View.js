import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl,Image,TextInput } from 'react-native';
import axios from 'axios';

const MyComponent = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:7000/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleSearch = () => {
    const searchTerm = searchInput.trim().toLowerCase();
    if (searchTerm === '') {
      setFilteredProducts(products);     } else {
      const filtered = products.filter(product => 
        product.IMEI.toLowerCase().includes(searchTerm) || product.SN.toLowerCase().includes(searchTerm ));
      setFilteredProducts(filtered);
    }
  };
  useEffect(() => { handleSearch(); }, [searchInput]);
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
       


 {/*   

  <Text style={{color:'black'}}>Products:</Text>
        {products.map(product => (
          <ScrollView horizontal>
         
            <View key={product.id} style={styles.perBox} >
              <View>
                 
                  <Image
                    style={styles.image}
                    source={{ uri: product.imagePRODUCT }}
                  />
              </View>
            <View style={{margin:30}}>
                <Text style={{ fontSize: 18, color: 'black',  }}>Product Name: {product.productName}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>IMEI: {product.IMEI}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>SN: {product.SN}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Used Period: {product.usedPeriod}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Price: {product.price}</Text>
            </View>
            <View>
                <Text style={{color:'black',textAlign:'center',fontSize:20,fontWeight:'bold'}}>seller details:</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Seller Name: {product.SellerName}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Nid No: {product.NidNo}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Father Name: {product.fatherName}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Mother Name: {product.motherName}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Address: {product.address}</Text>
                <Text style={{ fontSize: 18, color: 'black',  }}>Phone Number: {product.phoneNumber}</Text>
            </View>
            
          </View>

          </ScrollView>
        ))}
*/}

     <TextInput
          style={styles.searchInput}
          placeholder="Search by IMEI or SN"
          value={searchInput}
          onChangeText={text => setSearchInput(text)}
        />

<View style={styles.cardsContainers}>




{filteredProducts.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text>No data found.</Text>
          </View>
        ) : (
          <View style={styles.cardsContainers}>
            {filteredProducts.map(product => (
              <TouchableOpacity
                key={product.id}
                onPress={() => navigation.navigate('Details', { data: product })}
                style={styles.card}>
                <View style={{ alignItems: "center" }}>
                  <Image style={styles.cardImg} source={{ uri: product.imagePRODUCT }} />
                </View>
                <Text style={{ color: 'black', fontSize: 15, }}>{product.productName}</Text>
                <Text style={{ fontWeight: "bold", color: 'black', fontSize: 15, }}>৳{' '}{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      
      </View>
        
      </ScrollView>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity> */}

     
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding:5,
  },
  perBox: {
    flexDirection: 'row',
    backgroundColor: 'lavender',
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  image: {
    width: 150, 
    height:150,  
    resizeMode: 'cover', 
    marginBottom: 10,
    borderRadius:20
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: 'dodgerblue',
    borderColor: 'black',
    borderWidth: 2,
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


  searchInput:{
  borderWidth:1,
  padding:8,
  borderColor:'lavender',
  borderWidth:3,
  margin:20,
  borderRadius:20,
  backgroundColor:'white',
  },

  cardsContainers:{
    flexDirection:'row',
    flexWrap:"wrap",
    justifyContent:"space-between",
    marginHorizontal:5,
  },

  card:{
  backgroundColor:'lavender',
  padding:10,
  paddingVertical:20,
  width:"44%",
  alignItems:"center",
  marginTop:50,
  margin:9,
  marginTop:10,
  borderRadius:10,
  },
  cardImg:{
    width:130,
    height:130,
    resizeMode: 'cover',
    aspectRatio: 1,
  }
});


export default MyComponent;
