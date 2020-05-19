import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Logo from '../../../assets/logo/logo.png';
import PhoneLogo from '../../../assets/icon/hp.png';
import {getDeviceName, getModel} from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [deviceName, setDeviceName] = useState('');

  const {navigate} = useNavigation();

  useEffect(() => {
    const getDeviceHandle = async () => {
      const getDevice = await getModel();
      await setDeviceName(getDevice);
      console.log('modell', getDevice)
    };
    getDeviceHandle();
  }, [deviceName]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
      <Image source={PhoneLogo} style={styles.phoneLogoImage} />
      <Text style={styles.deviceNameTitle}>Model HP :</Text>
      <Text style={styles.deviceNameText}>{deviceName}</Text>
      <Text style={styles.infoText}>
        Harap melanjutkan tes untuk mendapatkan harga final sesuai dengan
        kondisi HP anda
      </Text>
      <TouchableOpacity
        style={styles.btnStartContainer}
        onPress={() => navigate('Testing', {updating: false})}>
        <Text style={styles.btnStartText}>Mulai Test</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
