import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../../assets/logo/logo.png';
import Icon from '../../../assets/icon/contractIcon.png';
import styles from './style';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const [isVisible, setVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {navigate} = useNavigation();

  const nextHandle = async () => {
    setLoading(!isLoading);
    setTimeout(async () => {
      await setVisibility(!isVisible);
      navigate('Home');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.imageLogo} />
      <TouchableOpacity
        style={styles.btnStart}
        onPress={() => setVisibility(!isVisible)}>
        <Text style={styles.btnStartText}>MULAI TES</Text>
      </TouchableOpacity>
      <View>
        <Modal isVisible={isVisible} animationOutTiming={500}>
          <View style={styles.modalContainer}>
            <Image source={Icon} style={styles.imageIcon} />
            <Text style={styles.modalText}>
              Dengan setuju, maka anda memberikan izin untuk mengakses informasi
              perangkat seperti model perangkat dan IMEI serta kebutuhan akses
              lainnya, seperti menyalakan wifi secara otomatis, akses kamera,
              akses modul accelerometer, deteksi tombol volume dan back
            </Text>
            <View style={styles.btnModalViewContainer}>
              {isLoading ? (
                <ActivityIndicator size={30} />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => setVisibility(!isVisible)}
                    activeOpacity={0.6}
                    style={styles.btnModalContainer('#439fe6')}>
                    <Text style={styles.btnModalText}>KEMBALI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => nextHandle()}
                    activeOpacity={0.6}
                    style={styles.btnModalContainer('#4cc765')}>
                    <Text style={styles.btnModalText}>SETUJU</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
