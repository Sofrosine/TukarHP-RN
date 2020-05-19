import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './style';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Market = ({route}) => {
  const [market, setMarket] = useState([]);
  const {marketId, kota} = route.params;
  const {navigate} = useNavigation();

  const getMarket = async () => {
    const getData = await axios.get(
      `https://dashboard.eracom.id/index.php/Api_admin/toko/${marketId}`,
    );
    const resJSON = await JSON.parse(getData.request._response).datatoko;
    setMarket(resJSON);
  };

  useEffect(() => {
    getMarket();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{kota}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          //   onChangeText={value => searchText(value)}
          style={styles.input}
          placeholder="Cari Toko..."
        />
      </View>
      <ScrollView>
        {market.map(data => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigate('Transaction', {
                  nama: data.nama,
                  jalan: data.jalan,
                  password: data.pw_toko,
                  id_toko: data.id
                })
              }
              key={data.id}
              style={styles.infoContainer}>
              <View style={styles.infoTitleContainer}>
                <Text style={styles.infoTitle}>{data.nama}</Text>
              </View>
              <Text style={styles.infoAddress}>{data.jalan}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Market;
