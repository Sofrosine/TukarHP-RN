import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {getDeviceName, getModel} from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info';

const Trade = () => {
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
    const info = await axios.get(
      `https://dashboard.eracom.id/index.php/Api_admin/model_iphone/${deviceName}/${storage}`,
    );
    const resJSON = await info;
    const data = JSON.parse(resJSON.request._response).datamodel;
    console.log('data', data);
    data === undefined ? null : setInfo(data.reverse());
  };
  getData ? getInfo() : null;

  useEffect(() => {
    const getDeviceHandle = async () => {
      const getDevice = await getModel();
      await setDeviceName(getDevice);
    };

    getDeviceHandle();

    getInfo();
    setTimeout(() => {
      setGetData(false);
    }, 1000);
  }, []);

  getData ? getInfo() : null;

  const handleCheck = () => {
    Linking.openURL('https://www.facebook.com/groups/ninja.store/').catch(err =>
      console.error('An error occurred', err),
    );
  };

  const handleSend = () => {
    info.length === 0
      ? Linking.openURL(
          `https://api.whatsapp.com/send?phone=6281283348866&text=Model : ${deviceName}
      Fungsi : Berhasil, Data Kosong`,
        ).catch(err => console.error('An error occurred', err))
      : Linking.openURL(
          `https://api.whatsapp.com/send?phone=6281283348866&text=Model : ${deviceName}
      Fungsi : Berhasil, ${info.map(item => {
        return `${item.judul}  \n - Harga: ${item.harga} \n - Fullset: ${item.fullset} \n - Subsidi: ${item.subsidi} \n - Fungsi: ${item.fungsi} - Fisik: ${item.fisik} \n \n`;
      })}`,
        ).catch(err => console.error('An error occurred', err));
  };

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
              <View key={data.judul} style={styles.infoContainer}>
                <View style={styles.gradeContainer}>
                  <Text style={styles.gradeText}>{data.judul}</Text>
                </View>
                <TouchableOpacity style={styles.gradeInfoContainer}>
                  <Text style={styles.gradeInfoText}>
                    - Harga : {data.harga}
                  </Text>
                  <Text style={styles.gradeInfoText}>
                    - Fullset : {data.fullset}
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
          onPress={() => handleCheck()}>
          <Text style={styles.btnText}>CEK STOK HP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => handleSend()}>
          <Text style={styles.btnText}>KIRIM HP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Trade;
