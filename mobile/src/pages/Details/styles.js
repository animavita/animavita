import styled from 'styled-components/native';
import { StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 15;
  left: 20;
`;

export const ObservationContainer = styled.ScrollView`
  height: 30%;
  width: 100%;
`;

export const Container = styled.View`
  flex: 1;
`;

export const PetImage = styled.ImageBackground`
  flex: 1;
`;

export const Slide = styled.View`
  height: 62%;
`;

export const PetDetail = styled.View`
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: white;
  justify-content: space-between;
  border-radius: 30px;
  padding: 20px 30px;
  width: ${width};
  height: 42%;
`;

export const PetData = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const FooterContent = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const TopContent = styled.View`
  width: 100%;
  position:relative;
  flex-direction: row;
  justify-content: space-between;
`;

export const styles = StyleSheet.create({
  wrapper: {
    height: '50%',
  },
  slider: wp('100%'),
  dotContainer: {
    position: 'absolute', top: (hp('50%') - 20), left: 0, bottom: 0, right: 0,
  },
  icon: { fontSize: 35 },
  observations: { textAlign: 'center' },
  dot: {
    width: hp('2%'),
    height: hp('2%'),
    borderRadius: hp('2%'),
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  heart: {
    position: 'absolute',
    right: 0,
    bottom: (hp('5%')),
    zIndex: 99,
  },
});
