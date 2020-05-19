import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getDeviceName, getModel} from 'react-native-device-info';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {} from 'react-native-vitals';

const Result = () => {
  const {navigate} = useNavigation();

  const [info, setInfo] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [storage, setStorage] = useState('');
  const [getData, setGetData] = useState(true);

  const getInfo = async () => {
    await DeviceInfo.getTotalDiskCapacity().then(res =>
      // console.log(Number(res.toString().slice(0, 3))),
      Number(res.toString().slice(0, 3)) > 200
        ? setStorage(256)
        : Number(res.toString().slice(0, 3)) > 100
        ? setStorage(128)
        : setStorage(64),
    );
    console.log('storageee', storage);
    const info = await axios.get(
      `https://dashboard.eracom.id/index.php/Api_admin/model_iphone/${deviceName}/${storage}`,
    );
    const resJSON = await info;
    const data = JSON.parse(resJSON.request._response).datamodel;
    // console.log('data', data);
    data === undefined ? null : setInfo(data);
  };

  getData ? getInfo() : null;
  const route = useRoute();

  useEffect(() => {
    const getDeviceHandle = async () => {
      const getDevice = await getModel();
      await setDeviceName(getDevice);
      console.log(deviceName);
    };
    getDeviceHandle();
    // getInfo();
    setTimeout(() => {
      setGetData(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText('gray')}>
          Model :{' '}
          <Text style={styles.headerText('black', 'bold')}>{deviceName}</Text>
        </Text>
      </View>
      <ScrollView>
        {info.length === 0 ? (
          <Text style={styles.emptyData}>Data Kosong</Text>
        ) : (
          info.map(data => {
            return (
              <View style={styles.infoContainer} key={data.judul}>
                <View style={styles.gradeContainer}>
                  <Text style={styles.gradeText}>{data.judul}</Text>
                </View>
                <TouchableOpacity style={styles.gradeInfoContainer}>
                  <Text style={styles.gradeInfoText}>
                    - Harga :{' '}
                    {new Intl.NumberFormat('de-DE').format(data.harga)}
                  </Text>
                  <Text style={styles.gradeInfoText}>
                    - Fullset :{' '}
                    {new Intl.NumberFormat('de-DE').format(data.fullset)}
                  </Text>
                  <Text style={styles.gradeInfoText}>
                    - Storage : {storage}gb
                  </Text>
                  <Text style={styles.gradeInfoText}>
                    - Subsidi : {data.subsidi}
                  </Text>
                  <Text style={styles.gradeInfoText}>
                    - Fungsi : {data.fungsi}
                  </Text>
                  <Text style={styles.gradeInfoText}>
                    - Fisik : {data.fisik}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() =>
            navigate('Testing', {updating: true, yo: true})
          }>
          <Text style={styles.btnText}>TEST ULANG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigate('First')}>
          <Text style={styles.btnText}>SELANJUTNYA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Result;
