import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          isMuted
          isLooping
          shouldPlay
          resizeMode={ResizeMode.COVER}
          source={{ uri: assets[0].uri }}
          style={styles.video}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Ready to change the way you money💰
        </Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={'/login'}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
        >
          <TouchableOpacity>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={'/signup'}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: '#fff' },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 21, fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    marginTop: 80,
    padding: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
    padding: 12,
  },
  loginText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '500',
  },
});

export default Page;
