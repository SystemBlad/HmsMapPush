/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Clipboard,
} from 'react-native';

import {Colors, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

import {hasGms, hasHms} from 'react-native-device-info';

import HMSMap, {
  HMSMarker,
  HMSPolyline,
  MapTypes,
} from '@hmscore/react-native-hms-map';
import {
  HmsPushMessaging,
  HmsPushInstanceId,
} from '@hmscore/react-native-hms-push';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isHuaweiSupported, setIsHuaweiSupported] = useState(false);
  const [isGoogleSupported, setIsGoogleSupported] = useState(false);

  React.useEffect(() => {
    hasHms().then(result => {
      setIsHuaweiSupported(result);
    });
    hasGms().then(result => {
      setIsGoogleSupported(result);
    });
  }, []);

  React.useEffect(() => {
    if (isHuaweiSupported) {
      HmsPushInstanceId.getToken('')
        .then(result => {
          console.log('getToken', result.result);
          Clipboard.setString(result.result);
        })
        .catch(err => {
          console.log('[getToken] Error/Exception: ' + JSON.stringify(err));
        });
    }
  }, [isHuaweiSupported]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="Huawei MAP">
          For testing android huawei mobile services
        </Section>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {'Support Google Services: ' + isGoogleSupported.toString()}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {'Support Huawei Services: ' + isHuaweiSupported.toString()}
        </Text>
        <HMSMap
          style={{height: 406}}
          camera={{
            target: {latitude: 0, longitude: -73},
            zoom: 11,
            bearing: 5,
            tilt: 70,
          }}
          useAnimation={true}
          animationDuration={2000}
          mapType={MapTypes.NORMAL}
          rotateGesturesEnabled={true}
          scrollGesturesEnabled={true}
          tiltGesturesEnabled={true}
          zoomControlsEnabled={true}
          zoomGesturesEnabled={true}
          buildingsEnabled={true}
          trafficEnabled={true}
          markerClusterIcon={{asset: 'ic_launcher.png'}}
          description="Huawei Map"
          myLocationEnabled={true}
          myLocationButtonEnabled={true}>
          <HMSMarker
            title="Maiden's Tower"
            snippet="This is a default marker"
            draggable
            coordinate={{
              latitude: 41.02155220194891,
              longitude: 29.0037998967586,
            }}
          />
          <HMSPolyline
            points={[
              {latitude: 40.827129114265524, longitude: 29.373611701881106},
              {latitude: 40.790073321984195, longitude: 29.512501011809462},
              {latitude: 40.69835270230068, longitude: 29.49504690851675},
            ]}
          />
        </HMSMap>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
