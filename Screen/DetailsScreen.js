import { StyleSheet, Text, View,Image,ScrollView } from 'react-native'
import React from 'react'

const DetailsScreen = ({route}) => {
    const {data} = route.params || {};
  return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image style={styles.cardImg} source={{uri: data.imagePRODUCT}}/>
            <View style={styles.details}>
            <Text style={{color:'black',fontSize:20,fontWeight:"bold",marginTop:20, textAlign:'center'}}>Product Details </Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Product Name:</Text> {data.productName}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>IMEI: </Text>{data.IMEI}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>SN: </Text>{data.SN}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>Used Period:</Text>{data.usedPeriod}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10  }}><Text style={{fontWeight:'bold'}}>Price:</Text>{data.price} ৳</Text>
            </View>
            <View style={styles.details}>
                      <Text style={{color:'black',textAlign:'center',fontSize:20,fontWeight:'bold'}}>seller details:</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Seller Name:</Text>{data.SellerName}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Nid no:</Text>{data.NidNo}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Father's name:</Text>{data.fatherName}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Mother's Name:</Text> {data.motherName}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Address:</Text> {data.address}</Text>
                      <Text style={{ fontSize: 18, color: 'black', textAlign:'center',margin:10 }}><Text style={{fontWeight:'bold'}}>Phone Number:</Text> {data.phoneNumber}</Text>
            </View>
      </ScrollView>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: "white",
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderRadius: 20,
    },
    cardImg:{
        width:300,
        height:300,
        borderTopLeftRadius:150,
        borderTopRightRadius:150,
    },
    details:{
        backgroundColor: 'lavender',
        paddingLeft:65,
        paddingRight:65,
        borderRadius:20,
        paddingBottom:20,
        margin:20,
    },
})