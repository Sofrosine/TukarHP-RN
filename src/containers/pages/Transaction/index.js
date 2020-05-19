import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import axios from 'axios';
import {getDeviceName, getModel} from 'react-native-device-info';

const Transaction = ({route}) => {
  const {nama, jalan, password, id_toko} = route.params;
  const [passwordValue, setPassword] = useState(``);
  const [deviceName, setDeviceName] = useState('');

  const handleSubmit = () => {
    if (passwordValue !== password) {
      alert('Password Salah');
    } else {
      axios
        .post(
          `https://dashboard.eracom.id/index.php/Api_admin/transaksi/${id_toko}/${deviceName}`,
        )
        .then(res => alert('Transaksi Berhasil'));
    }
  };

  useEffect(() => {
    const getDeviceHandle = async () => {
      const getDevice = await getModel();
      await setDeviceName(getDevice);
    };
    getDeviceHandle();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerComponent}>
        <Text style={styles.headerText(0)}>{nama}</Text>
        <Text style={styles.headerText(4)}>{jalan}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            // onChangeText={value => searchText(value)}
            style={styles.input}
            placeholder="Cari Stok..."
          />
        </View>
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.infoText}>
          Berikan Aplikasi ke Pihak Toko yang Dikunjungi
        </Text>
        <TextInput
          onChangeText={val => setPassword(val)}
          placeholder="Masukkan Kode"
          style={styles.codeInput}
        />
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.btnCode}>
          <Text style={styles.btnTextCode}>DEAL TRANSAKSI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Transaction;
