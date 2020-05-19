import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const SearchMarket = () => {
  const [country, setCountry] = useState([]);
  const [noData, setNoData] = useState(false);

  const {navigate} = useNavigation();

  const getCountry = async () => {
    const getHandle = await axios.get(
      'https://dashboard.eracom.id/index.php/Api_admin/kota',
    );
    await setCountry(JSON.parse(getHandle.request._response).datakota);
  };

  const searchText = e => {
    let text = e.toLowerCase();
    let countries = country;
    let filteredName = countries.filter(item => {
      return item.kota.toLowerCase().match(text);
    });
    if (!text || text === '') {
      getCountry();
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setNoData(true);
    } else if (Array.isArray(filteredName)) {
      setNoData(false);
      setCountry(filteredName);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Pilih Kota</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={value => searchText(value)}
          style={styles.input}
          placeholder="Cari Nama Kota..."
        />
      </View>
      {country.map(data => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigate('Market', {
                marketId: data.id,
                kota: data.kota,
              })
            }
            key={data.id}
            style={styles.cityContainer}>
            <Text style={styles.cityText}>{data.kota}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default SearchMarket;
