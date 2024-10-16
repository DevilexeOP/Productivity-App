import {KeyboardAvoidingView, SafeAreaView, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const KeyboardAvoidView = ({children}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <KeyboardAvoidingView enabled style={{flex: 1}} behavior={'position'}>
        <ScrollView
          style={{padding: hp('-1%'), paddingTop: hp('-3%')}}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidView;
