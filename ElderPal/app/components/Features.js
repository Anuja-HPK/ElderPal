import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Features = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's on your mind?</Text>

      <View style={styles.featureContainer1}>
        <View style={styles.featureItem}>
          <Image
            source={require('../assets/vaimages/chatgptIcon.png')}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>ChatGPT</Text>
        </View>
        <Text style={styles.featureDescription}>
          ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.
        </Text>
      </View>

      <View style={styles.featureContainer2}>
        <View style={styles.featureItem}>
          <Image
            source={require('../assets/vaimages/dalleIcon.png')}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>DALL-E</Text>
        </View>
        <Text style={styles.featureDescription}>
          DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>

      <View style={styles.featureContainer3}>
        <View style={styles.featureItem}>
          <Image
            source={require('../assets/vaimages/smartaiIcon.png')}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>SMART AI</Text>
        </View>
        <Text style={styles.featureDescription}>
          A powerful voice assistant with the abilities of ChatGPT and DALL-E, providing you the best of both worlds.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(60),
    paddingVertical: hp(2),
  },
  title: {
    fontSize: wp(6.5),
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: hp(2),
  },
  featureContainer1: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    padding: wp(4),
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  featureContainer2: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    padding: wp(4),
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  featureContainer3: {
    backgroundColor: 'rgba(216, 191, 216, 1)',
    padding: wp(4),
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  featureIcon: {
    height: hp(4),
    width: hp(4),
  },
  featureText: {
    fontSize: wp(4.8),
    fontWeight: 'bold',
    marginLeft: wp(2),
    color: 'gray',
  },
  featureDescription: {
    fontSize: wp(3.8),
    color: 'gray',
    fontWeight: '500',
  },
});

export default Features;
