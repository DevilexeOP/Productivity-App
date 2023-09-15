import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../Redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {DARKMODE} from "../../Config/colors";


const CreateWorkSpace = ({navigation}) => {
    const [token, setToken] = useState('');
    // State Management
    const dispatch = useDispatch();
    const actions = bindActionCreators(actionCreators, dispatch);
    const workspaceTitle = useSelector(state => state.workspace.workspaceName)
    const projectName = useSelector(state => state.workspace.projectName)
    // handlers
    const handleWorkSpaceTitle = workspaceTitle => {
        actions.updateWorkspaceName(workspaceTitle)
    }
    const handleProjectName = projectName => {
        actions.updateProjectName(projectName)
    }

    // navigations
    const navigateToWorkspaceHome = () => {
        navigation.replace("WorkSpaceHome")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={navigateToWorkspaceHome}>
                    <Image source={require("../../Assets/backlight.png")} alt="Back" style={styles.hamBtn}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>New Work Space</Text>
            </View>
            <View style={styles.userInputContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.customLabel}>
                        Workspace title
                    </Text>
                    <TextInput
                        placeholder="My Workspace 1"
                        style={styles.textInput}
                        placeholderTextColor={DARKMODE.labelText}
                        value={workspaceTitle}
                        onChangeText={handleWorkSpaceTitle}
                    />
                </View>
                <View style={styles.projectContainer}>
                    <Text style={styles.customLabel}>
                        Project name
                    </Text>
                    <TextInput
                        placeholder="# My App Project"
                        style={styles.textInput}
                        placeholderTextColor={DARKMODE.labelText}
                        value={projectName}
                        onChangeText={handleProjectName}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.workSpaceButton}
                    onPress={() => {
                        navigation.navigate("")
                    }}>
                    <Text style={styles.todoText}>Create Space</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: wp('100%'),
        height: null,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: wp('2%')
    },
    headerText: {
        fontSize: wp('6.5%'),
        fontWeight: '600',
        marginVertical: hp('5%'),
        color: DARKMODE.headerText,
        marginRight: wp('25%')
    },
    workSpaceButton: {
        borderRadius: 10,
        width: wp('60%'),
        height: hp('6%'),
        backgroundColor: DARKMODE.buttons,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todoText: {
        color: 'white',
        fontSize: wp('3%'),
        fontWeight: 'bold',
    },
    hamBtn: {
        width: wp('4%'),
        height: wp('4%'),
        padding: wp('3%'),
        marginHorizontal: wp('10%'),
        tintColor:DARKMODE.iconColor
    },
    userInputContainer: {
        width: wp('80%'),
        display: 'flex',
        height: wp('40%'),
        margin: wp('10%'),
    },
    nameContainer: {
        padding: wp('4%')
    },
    customLabel: {
        fontSize: wp('2.8%'),
        color: DARKMODE.labelText,
    },
    textInput: {
        height: wp('10%'),
        backgroundColor: 'white',
        marginTop: wp('2%'),
        padding: wp('2%'),
        color: DARKMODE.inputText,
        fontSize: wp('3%'),
        borderRadius: wp('1%')
    },
    projectContainer: {
        paddingBottom: wp('4%'),
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        paddingTop: wp('2%')
    },
});

export default CreateWorkSpace;
