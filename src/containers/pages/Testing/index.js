import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal as ModalCamera,
  Animated,
  PanResponder,
} from 'react-native';
import {
  LongPressGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import BackIcon from '../../../assets/icon/kembali.png';
import Logo from '../../../assets/logo/logo.png';
import PhoneLogo from '../../../assets/icon/hp.png';
import CapacityLogo from '../../../assets/icon/kapasitas.png';
import WifiLogo from '../../../assets/icon/wifi.png';
import AccelerometerLogo from '../../../assets/icon/accelerometer.png';
import SIMLogo from '../../../assets/icon/sim.png';
import CameraLogo from '../../../assets/icon/camera.png';
import VolUpLogo from '../../../assets/icon/up.png';
import VolDownLogo from '../../../assets/icon/down.png';
import TouchScreenLogo from '../../../assets/icon/sentuh.png';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getDeviceName,
  getTotalMemory,
  getUsedMemory,
  getModel,
} from 'react-native-device-info';
import SystemSetting from 'react-native-system-setting';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Testing = () => {
  const [deviceName, setDeviceName] = useState('');
  const [isVisibleWifi, setVisibleWifi] = useState(false);
  const [capacity, setCapacity] = useState('On Process');
  const [capacityStatus, setCapacityStatus] = useState('Proses');
  const [wifi, setWifi] = useState('On Process');
  const [wifiStatus, setWifiStatus] = useState('Antri');
  const [sim, setSim] = useState('On Process');
  const [simStatus, setSimStatus] = useState('Antri');
  const [accelerometer, setAccelerometer] = useState('On Process');
  const [accelerometerStatus, setAccelerometerStatus] = useState('Antri');

  const [camera, setCamera] = useState('On Process');
  const [cameraStatus, setCameraStatus] = useState('Antri');
  const [modalCameraVisible, setModalCamera] = useState(false);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.front);

  const [bgColor, setBgColor] = useState('#439fe6');

  const [volume, setVolume] = useState(0);
  const [volume2, setVolume2] = useState(0);

  const [modalVolumeUpVisible, setModalVolumeUp] = useState(false);
  const [volumeUp, setVolumeUp] = useState('On Process');
  const [volumeUpStatus, setVolumeUpStatus] = useState('Antri');

  const [modalVolumeDownVisible, setModalVolumeDown] = useState(false);
  const [volumeDown, setVolumeDown] = useState('On Process');
  const [volumeDownStatus, setVolumeDownStatus] = useState('Antri');

  const [touchValue, setTouchValue] = useState(0);
  const [touchModal, setTouchModal] = useState(false);
  const [touch, setTouch] = useState('On Process');
  const [touchStatus, setTouchStatus] = useState('Antri');

  const route = useRoute();

  const [wifiRestartStatus, setWifiRestartStatus] = useState(false);
  const [volumeUpRestartStatus, setVolumeUpRestartStatus] = useState(false);
  const [volumeDownRestartStatus, setVolumeDownRestartStatus] = useState(false);
  const [touchRestartStatus, setTouchRestartStatus] = useState(false);

  const [update, setUpdate] = useState(route.params.updating);

  const {navigate} = useNavigation();

  const getCapacity = async () => {
    const storage = await getTotalMemory();
    const used = await getUsedMemory();
    const free = ((storage - used) / storage) * 100;
    if (free > 60) {
      setTimeout(() => {
        setCapacity('Success');
        setCapacityStatus('Baik');
        setVisibleWifi(true);
        setWifiStatus('Proses');
      }, 500);
    } else {
      setCapacity('Failed');
      setCapacityStatus('Gagal');
      setVisibleWifi(true);
      setWifiStatus('Proses');
    }
  };

  const wifiModalHandler = async bool => {
    const go = () => {
      setVisibleWifi(false);
      if (bool) {
        setVisibleWifi(false);
        SystemSetting.isWifiEnabled().then(enable => {
          setTimeout(() => {
            setWifi('Success');
            setWifiStatus('Baik');
            setSimStatus('Proses');
            simHandler();
          }, 100);
        });
      } else {
        setVisibleWifi(false);
        setWifi('Failed');
        setWifiStatus('Gagal');
        setSimStatus('Proses');
        simHandler();
      }
    };

    const fail = () => {
      if (bool) {
        setVisibleWifi(false);
        SystemSetting.isWifiEnabled().then(enable => {
          setTimeout(() => {
            setWifi('Success');
            setWifiStatus('Baik');
          }, 100);
        });
      } else {
        setVisibleWifi(false);
        setWifi('Failed');
        setWifiStatus('Gagal');
      }
    };
    wifiRestartStatus ? fail() : go();
  };

  const simHandler = async () => {
    NetInfo.fetch('cellular').then(state => {
      if (state.cellularGeneration !== undefined) {
        setSimStatus('Gagal');
        setSim('Failed');
        setAccelerometerStatus('Proses');
        setTimeout(() => {
          setAccelerometerStatus('Baik');
          setAccelerometer('Success');
          setCameraStatus('Proses');
        }, 500);
      } else {
        setSimStatus('Baik');
        setSim('Success');
        setAccelerometerStatus('Proses');
        setTimeout(() => {
          setAccelerometerStatus('Baik');
          setAccelerometer('Success');
          setCameraStatus('Proses');
        }, 500);
      }
    });
  };

  const cameraHandler = async () => {
    setModalCamera(true);
    setTimeout(() => {
      setCameraType(RNCamera.Constants.Type.back);
      setTimeout(() => {
        // alert('hihi')
        setModalCamera(false);
        setCamera('Success');
        setCameraStatus('Baik');
        volumeUpHandler();
      }, 500);
    }, 4000);
  };

  const volumeUpHandler = async () => {
    setVolumeUpStatus('Proses');
    setModalVolumeUp(true);
  };

  const handleVolumeSuccess = () => {
    setVolumeUp('Success');
    setVolumeUpStatus('Baik');
    setVolumeUpRestartStatus(false);
  };

  const volumeUpSuccess = async () => {
    setModalVolumeUp(false);
    setVolumeUp('Success');
    setVolumeUpStatus('Baik');
    volumeUpRestartStatus ? handleVolumeSuccess() : volumeDownHandler();
  };

  const volumeUpSuccessHandler = async () => {
    volume2 > volume ? volumeUpSuccess() : null;
  };

  const volumeUpFailed = async () => {
    await setModalVolumeUp(false);
    setVolumeUp('Failed');
    setVolumeUpStatus('Gagal');
    volumeUpRestartStatus
      ? setVolumeUpRestartStatus(false)
      : volumeDownHandler();
  };

  const volumeDownHandler = async () => {
    setVolumeDownStatus('Proses');
  };

  const volumeDownSuccess = async () => {
    await setModalVolumeDown(false);
    setVolumeDown('Success');
    setVolumeDownStatus('Baik');
    const success = () => {
      setVolumeDown('Success');
      setVolumeDownStatus('Baik');
      setVolumeDownRestartStatus(false);
    };
    const touchGo = () => {
      setTouchStatus('Proses');
      start();
    };
    volumeDownRestartStatus ? success() : touchGo();
  };

  const volumeDownSuccessHandler = async () => {
    volume2 < volume ? volumeDownSuccess() : null;
  };

  const volumeDownFailed = async () => {
    await setModalVolumeDown(false);
    await setVolumeDown('Failed');
    await setVolumeDownStatus('Gagal');
    const fail = () => {
      setVolumeDown('Failed');
      setVolumeDownStatus('Gagal');
      setVolumeDownRestartStatus(false);
    };
    const go = () => {
      setTouchStatus('Proses');
      start();
    };
    volumeDownRestartStatus ? fail() : go();
  };

  const leftAnimationHandler = async box => {
    Animated.timing(box, {
      toValue: wp(40),
      duration: 1000,
    }).start();
    // setLeftPlus(box);
    await setTouchValue(touchValue + 1);
  };

  useEffect(() => {
    const getDeviceHandle = async () => {
      const getDevice = await getModel();
      await setDeviceName(getDevice);
    };
    getDeviceHandle();
  }, [deviceName]);

  useEffect(() => {
    const testHandler = async () => {
      await getCapacity();
    };
    SystemSetting.getVolume().then(async vol => {
      setVolume(vol);
    });
    console.log('Current volume is ' + volume);
    testHandler();
  }, [capacity]);

  useEffect(() => {
    setTimeout(() => {
      accelerometerStatus === 'Baik' ? cameraHandler() : null;
    }, 500);
  }, [accelerometerStatus]);

  useEffect(() => {
    setTimeout(() => {
      volumeDownStatus === 'Proses' ? setModalVolumeDown(true) : null;
    }, 500);
  }, [volumeDownStatus]);

  useEffect(() => {
    SystemSetting.addVolumeListener(data => {
      const volume = data.value;
      setVolume2(volume);
      // console.log('vollll', volume)
    });
    volumeUpSuccessHandler();
    volumeDownSuccessHandler();
  }, [volume2]);

  useEffect(() => {
    touchValue === 6 ? touchSuccessHandler() : null;
  }, [touchValue]);

  useEffect(() => {
    setTimeout(() => {
      touchStatus === 'Proses' ? setTouchModal(true) : null;
    }, 500);
  }, [touchStatus]);

  const arr = [];
  const [arrTouch, setArrTouch] = useState([1]);
  const [count, setCount] = useState(5);
  const [clickVal, setClickVal] = useState(0);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount(c => c - 1);
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCount(5);
  }, []);

  const restart = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCount(5);
    start();
  }, []);

  const btnArr = color => {
    for (let x = 1; x < 61; x++) {
      arr.push({no: x, touch: false});
      setArrTouch([...arr]);
    }
  };

  const handleTouch = (item, index) => {
    let x = [...arrTouch];
    x[index].touch = true;
    setArrTouch([...x]);
  };

  useEffect(() => {
    btnArr('royalblue');
  }, []);

  const handlePressBtn = async (item, index) => {
    restart();
    // bgColorArr('red');
    handleTouch(item, index);
    setClickVal(e => e + 1);
  };

  const touchSuccessHandler = () => {
    setTouch('Success');
    setTouchStatus('Baik');
    setTouchModal(false);
    stop();
  };
  const touchFailedHandler = () => {
    setTouch('Failed');
    setTouchStatus('Gagal');
    setTouchModal(false);
    stop();
  };

  const handleFail = () => {
    stop();
    touchFailedHandler();
  };

  useEffect(() => {
    count < 0.5 ? handleFail() : null;
  }, [count]);

  useEffect(() => {
    clickVal === arrTouch.length ? touchSuccessHandler() : null;
  }, [clickVal]);

  // const panResponder = PanResponder.create({
  //   // Enable Pan Handler
  //   onStartShouldSetPanResponder: (evt, gestureState) => true,
  //   onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
  //   onMoveShouldSetPanResponder: (evt, gestureState) => true,
  //   onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  //   onPanResponderGrant: (evt, gestureState) => {
  //     console.log('hahahaha');
  //     console.log('hihihi');
  //     // handlePressBtn(arrTouch[1],1)
  //   },
  //   onPanResponderRelease: (evt, gestureState) => {
  //     // alert('haha');
  //     // console.log('hahahaha')
  //   },
  //   onPanResponderMove: (evt, gestureState) => {
  //     console.log('moVEEEE!!');
  //   },
  //   onPanResponderTerminationRequest: (evt, gestureState) => true,
  //   onPanResponderTerminate: (evt, gestureState) => {
  //     console.log('hiahiahia');
  //   },
  // });

  const doubleTapRef = React.createRef();
  const _onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("I'm being pressed for so long");
    }
  };
  const _onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("I'm touched");
    }
  };
  const _onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert('D0able tap, good job!');
    }
  };

  const btn = arrTouch.map((item, index) => {
    return (
      //       <TouchableOpacity
      //         // {...panResponder.panHandlers}
      //         // onPress={() => handlePressBtn(item, index)}
      //         onPressIn={() => handlePressBtn(item, index)}
      // >
      //         <View
      //           // disableIntervalMomentum={true}
      //           // disableScrollViewPanResponder={true}
      //           // scrollEnabled={false}
      //           // onTouchMove={() => handlePressBtn(item, index)}
      //           onMoveShouldSetResponder={() => console.log('hihi')}
      //           onResponderTerminate={() => console.log('haha')}
      //           key={index}
      //           style={{
      //             backgroundColor: item.touch ? 'white' : 'royalblue',
      //             left: item.touch ? -1000 : 0,
      //             width: 50,
      //             height: 50,
      //             margin: 4,
      //           }}
      //         />
      //       </TouchableOpacity>
      <LongPressGestureHandler
        onHandlerStateChange={_onHandlerStateChange}
        minDurationMs={800}>
        <TapGestureHandler
          onHandlerStateChange={_onSingleTap}
          waitFor={doubleTapRef}>
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={_onDoubleTap}
            numberOfTaps={2}>
            <TouchableOpacity
              style={{
                backgroundColor: item.touch ? 'white' : 'royalblue',
                left: item.touch ? -1000 : 0,
                width: 50,
                height: 50,
                margin: 4,
              }}
              onPress={() => alert('haha')}
            />
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    );
  });

  const handleRestart = () => {
    setCapacity('On Process');
    setCapacityStatus('Proses');
    setWifi('On Process');
    setWifiStatus('Antri');
    setSim('On Process');
    setSimStatus('Antri');
    setAccelerometer('On Process');
    setAccelerometerStatus('Antri');
    setCamera('On Process');
    setCameraStatus('Antri');
    setVolumeUp('On Process');
    setVolumeUpStatus('Antri');
    setVolumeDown('On Process');
    setVolumeDownStatus('Antri');
    setTouch('On Process');
    setTouchStatus('Antri');
    setClickVal(0);
    btnArr();
    setUpdate(false);
    route.params.updating = false;
  };

  const wifiRestart = () => {
    setWifi('On Process');
    setWifiStatus('Antri');
    setVisibleWifi(true);
    setWifiRestartStatus(true);
  };

  const volumeUpRestart = () => {
    setVolumeUp('On Process');
    setVolumeUpStatus('Antri');
    setVolumeUpRestartStatus(true);
    setModalVolumeUp(true);
  };

  const volumeDownRestart = () => {
    setVolumeDown('On Process');
    setVolumeDownStatus('Antri');
    setVolumeDownRestartStatus(true);
    setModalVolumeDown(true);
  };

  const screenTestRestart = () => {
    setTouch('On Process');
    setTouchStatus('Antri');
    setTouchRestartStatus(true);
    setTouchModal(true);
    setClickVal(0);
    btnArr();
    setCount(5);
    start();
  };

  useEffect(() => {
    route.params.updating ? handleRestart() : null;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <ModalCamera
          animationType="slide"
          transparent={false}
          visible={modalCameraVisible}>
          <View style={{flex: 1}}>
            <RNCamera
              captureAudio={false}
              style={{flex: 1}}
              type={cameraType}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
          </View>
        </ModalCamera>
      </View>
      <View>
        <Modal isVisible={isVisibleWifi}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Izinkan aplikasi untuk mengaktifkan dan menonaktifkan WiFi ?
            </Text>
            <View style={styles.btnModalContainer}>
              <TouchableOpacity
                style={styles.btnModal(0, 1)}
                onPress={() => wifiModalHandler(false)}>
                <Text style={styles.btnModalText}>Tolak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnModal(1, 0)}
                onPress={() => wifiModalHandler(true)}>
                <Text style={styles.btnModalText}>Terima</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <Modal isVisible={modalVolumeUpVisible}>
          <View style={styles.modalVolumeContainer}>
            <Text style={styles.volumeTitle}>Volume Up</Text>
            <Text style={styles.volumeText('400')}>
              Tekan Tombol :{' '}
              <Text style={styles.volumeText('bold')}>Volume UP</Text>
            </Text>
            <TouchableOpacity
              style={styles.btnVolumeFailed}
              onPress={() => volumeUpFailed()}>
              <Text style={styles.btnVolumeFailedText}>TIDAK BERFUNGSI</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <Modal isVisible={modalVolumeDownVisible}>
          <View style={styles.modalVolumeContainer}>
            <Text style={styles.volumeTitle}>Volume Down</Text>
            <Text style={styles.volumeText('400')}>
              Tekan Tombol :{' '}
              <Text style={styles.volumeText('bold')}>Volume Down</Text>
            </Text>
            <TouchableOpacity
              style={styles.btnVolumeFailed}
              onPress={() => volumeDownFailed()}>
              <Text style={styles.btnVolumeFailedText}>TIDAK BERFUNGSI</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      {/* MODALLLLLLL */}
      <View style={{flex: 1}}>
        <ModalCamera
          animationType="slide"
          transparent={false}
          visible={touchModal}>
          <SafeAreaView
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {btn}
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 40}}>
                {/* {clickVal}/{arrTouch.length} */}
              </Text>
              <Text style={styles.count}>{count}</Text>
            </View>
          </SafeAreaView>
        </ModalCamera>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backContainer}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.logoIcon} />
      </View>
      <View style={styles.infoPhoneContainer}>
        <Image source={PhoneLogo} style={styles.phoneImage} />
        <View style={styles.infoPhoneTextContainer}>
          <Text style={styles.infoPhoneText1(2)}>
            Model: <Text style={styles.infoPhoneText2}>{deviceName}</Text>
          </Text>
          <Text style={styles.infoPhoneText1(0)}>
            Status:{' '}
            <Text style={styles.infoPhoneText2}>
              {volumeDownStatus === 'Gagal' || volumeDownStatus === 'Baik'
                ? 'Baik'
                : 'Memeriksa..'}
            </Text>
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.infoContainer}>
          {/* Capacity */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={CapacityLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>Kapasitas</Text>
              <Text style={styles.infoDataText2}>
                Status : {capacityStatus}
              </Text>
            </View>
            {capacity === 'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : capacity === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* WIFI */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={WifiLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>Wifi</Text>
              <Text style={styles.infoDataText2}>Status : {wifiStatus}</Text>
            </View>
            {wifiStatus === 'Antri' ? null : wifi === 'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : wifi === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity
                onPress={wifiRestart}
                style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* SIM */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={SIMLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>SIM</Text>
              <Text style={styles.infoDataText2}>Status : {simStatus}</Text>
            </View>
            {simStatus === 'Antri' ? null : sim === 'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : sim === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Accelerometer */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={AccelerometerLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>Accelerometer</Text>
              <Text style={styles.infoDataText2}>
                Status : {accelerometerStatus}
              </Text>
            </View>
            {accelerometerStatus === 'Antri' ? null : accelerometer ===
              'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : accelerometer === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* CAMERA */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={CameraLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>Kamera</Text>
              <Text style={styles.infoDataText2}>Status : {cameraStatus}</Text>
            </View>
            {cameraStatus === 'Antri' ? null : camera === 'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : camera === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* VolUp */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={VolUpLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>Volume Up</Text>
              <Text style={styles.infoDataText2}>
                Status : {volumeUpStatus}
              </Text>
            </View>
            {volumeUpStatus === 'Antri' ? null : volumeUp === 'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : volumeUp === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity
                onPress={volumeUpRestart}
                style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* VolDown */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={VolDownLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>Volume Down</Text>
              <Text style={styles.infoDataText2}>
                Status : {volumeDownStatus}
              </Text>
            </View>
            {volumeDownStatus === 'Antri' ? null : volumeDown ===
              'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : volumeDown === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity
                onPress={volumeDownRestart}
                style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* TouchScreen */}
          <View style={styles.infoDataContainer}>
            <View style={styles.infoDataImageContainer}>
              <Image source={TouchScreenLogo} style={styles.infoDataImage} />
            </View>
            <View style={styles.infoDataTextContainer}>
              <Text style={styles.infoDataText1}>Layar Sentuh</Text>
              <Text style={styles.infoDataText2}>Status : {touchStatus}</Text>
            </View>
            {touchStatus === 'Antri' ? null : touch === 'On Process' ? (
              <ActivityIndicator style={styles.loadingIcon} size={50} />
            ) : touch === 'Success' ? (
              <Text style={styles.loadingIcon}>Berhasil</Text>
            ) : (
              <TouchableOpacity
                onPress={screenTestRestart}
                style={styles.failedBtnContainer}>
                <Text style={styles.failedBtnText}>GAGAL</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            volumeDownStatus === 'Gagal' || volumeDownStatus === 'Baik'
              ? navigate('Result', {updatez: !update})
              : null
          }>
          <Text style={styles.btnText}>
            {volumeDownStatus === 'Gagal' || volumeDownStatus === 'Baik'
              ? 'SELANJUTNYA'
              : 'MEMERIKSA..'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Testing;
