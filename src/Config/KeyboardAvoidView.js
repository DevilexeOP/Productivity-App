import { KeyboardAvoidingView, SafeAreaView, ScrollView  } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const KeyboardAvoidView = ({children}) => {
    return (
        <SafeAreaView style={{flex:1 ,  backgroundColor:'black'}}>
            <KeyboardAvoidingView style={{flex:1}} behavior={"height"}>
                <ScrollView style={{padding:hp('-1%') , paddingTop:hp('-3%')}}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default KeyboardAvoidView
