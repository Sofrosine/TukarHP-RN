import React from 'react';
import {Text, SafeAreaView, Image, TouchableOpacity, View} from 'react-native';
import Logo from '../../../assets/logo/logo.png';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const Choice = () => {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.image} />
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceText}>Pilih Cara Tukar Tambah</Text>
        <TouchableOpacity
          style={styles.choiceBtnContainer}
          onPress={() => navigate('SearchMarket')}>
          <Text style={styles.choiceBtnText}>DATANGI TOKO TERDEKAT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choiceBtnContainer}
          onPress={() => navigate('Trade')}>
          <Text style={styles.choiceBtnText}>TUKAR TAMBAH ONLINE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Choice;
