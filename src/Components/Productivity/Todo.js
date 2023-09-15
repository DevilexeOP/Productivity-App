/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {updateAllTodos} from '../../Redux/Action-Creators';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect, useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {ROOT_URL} from '../../Config/constants';
import {DARKMODE} from "../../Config/colors";

const TodoScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const allTodo = useSelector(state => state.addTodo.allTodos);
    const {jwtToken} = route.params;

    useEffect(() => {
        console.log('TODOS 1 ' + jwtToken);
        getTodos();
        navigation.addListener('focus', () => {
            getTodos();
            console.log('TODOS 2 ' + jwtToken);
        });
        console.log('TODOS 3' + jwtToken);
    }, []);

    const getTodos = async () => {
        if (!jwtToken) {
            console.log(
                'Token is not available yet. ------------------------ ' + jwtToken,
            );
            return;
        }
        try {
            const response = await fetch(`${ROOT_URL}/user/api/v1/todos`, {
                // 209 for linux , 154 pc
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            const todos = await response.json();
            if (todos.length === 0) {
                console.log('Todos not found');
            } else if (response.status === 200) {
                dispatch(updateAllTodos(todos));
                successToast();
            }
        } catch (error) {
            errorToast();
            console.log('Error Fetching todos' + error);
        }
    };

    const deleteTodo = async _id => {
        try {
            const res = await fetch(
                `${ROOT_URL}/user/api/v1/todos/delete/${_id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                },
            );
            const data = await res.json();
            if (res.status === 200) {
                dispatch(updateAllTodos(allTodo.filter(todo => todo._id !== _id)));
                console.log(data);
            } else {
                console.log('Error couldnt remove todo');
            }
        } catch (error) {
            console.log('ERROR : ' + error);
        }
    };

    const navigateToAddTodo = token => {
        navigation.navigate('AddTodo', {
            jwtToken: token,
        });
    };

    const navigateToUpdateTodo = (
        jwtToken,
        _id,
        title,
        description,
        status,
        priority,
    ) => {
        navigation.navigate('UpdateTodo', {
            jwtToken: jwtToken,
            id: _id,
            todoTitle: title,
            todoDescription: description,
            todoStatus: status,
            todoPriority: priority,
        });
    };

    const successToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Fetched Todos',
        });
    };

    const errorToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Error Fetching Todos',
        });
    };

    const navigateToHome = (token) => {
        navigation.navigate("Home", {
            jwtToken: token
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => {
                    navigateToHome(jwtToken)
                }}>
                    <Image source={require("../../Assets/backlight.png")} alt="Back" style={styles.hamBtn}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Your To-Do's </Text>
            </View>
            <ScrollView>
                <View>
                    {allTodo && allTodo.length === 0 ? (
                        <>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{color: 'white', fontSize: wp('4%')}}>
                                    No To-Dos Found
                                </Text>
                            </View>
                        </>
                    ) : allTodo ? (
                        <>
                            {allTodo.map(todo => (
                                <View style={styles.todoContainer} key={todo._id}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.todoTitle}>{todo.todoTitle}</Text>
                                    </View>
                                    <Text style={styles.todoDescription}>
                                        {todo.todoDescription}
                                    </Text>
                                    {todo.todoStatus ? (
                                        <Text style={styles.todoStatus}>
                                            Completed : {todo.todoStatus}
                                        </Text>
                                    ) : (
                                        <Text style={styles.todoStatus}>Completed : No</Text>
                                    )}
                                    {todo.todoPriority ? (
                                        <Text style={styles.todoPriortiy}>
                                            Priority : {todo.todoPriority}
                                        </Text>
                                    ) : (
                                        <Text style={styles.todoPriortiy}>Priority : None</Text>
                                    )}
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'flex-end',
                                            flexDirection: 'row-reverse',
                                        }}>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigateToUpdateTodo(
                                                        jwtToken,
                                                        todo._id,
                                                        todo.todoTitle,
                                                        todo.todoDescription,
                                                        todo.todoStatus,
                                                        todo.todoPriority,
                                                    )
                                                }>
                                                <Image
                                                    style={styles.icon}
                                                    source={require('../../Assets/edit.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => deleteTodo(todo._id)}>
                                                <Image
                                                    style={styles.icon2}
                                                    source={require('../../Assets/bin.png')}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </>
                    ) : (
                        <>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{color: 'white', fontSize: wp('4%')}}>
                                    Loading ...
                                </Text>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.todoButton}
                    onPress={() => {
                        navigateToAddTodo(jwtToken);
                    }}>
                    <Text style={styles.todoText}>Add a Todo? </Text>
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
    headerText: {
        fontSize: wp('5%'),
        fontWeight: '600',
        marginVertical: hp('5%'),
        color: DARKMODE.headerText,
        marginRight: wp('25%')
    },
    todoButton: {
        width: wp('50%'),
        height: wp('10%'),
        borderRadius: 10,
        marginBottom: wp('25%'),
        marginTop: wp('5%'),
        backgroundColor: '#dbac00',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoText: {
        fontSize: wp('3%'),
        color: 'white',
        fontWeight: 'bold',
    },
    todoContainer: {
        borderWidth: 1,
        borderColor: '#f2ae41',
        width: wp('80%'),
        height: null,
        borderRadius: 10,
        marginVertical: wp('2%'),
        marginHorizontal: hp('5%'),
    },
    todoTitle: {
        marginVertical: hp('1%'),
        fontSize: wp('3.5%'),
        marginHorizontal: hp('2%'),
        color: '#f0cf9c',
    },
    todoDescription: {
        marginVertical: hp('.5%'),
        fontSize: wp('2.5%'),
        marginHorizontal: hp('2%'),
    },
    todoStatus: {
        marginVertical: hp('.5%'),
        fontSize: wp('2.5%'),
        marginHorizontal: hp('2%'),
    },
    todoPriortiy: {
        marginVertical: hp('.5%'),
        fontSize: wp('2.5%'),
        marginHorizontal: hp('2%'),
    },
    icon: {
        width: wp('2%'),
        height: hp('2%'),
        marginHorizontal: hp('3.5%'),
        marginVertical: hp('1%'),
        padding: wp('3%'),
    },
    icon2: {
        width: wp('2.5%'),
        height: hp('2.5%'),
        marginVertical: hp('1%'),
        padding: wp('3%'),
    },
    hamBtn: {
        width: wp('4%'),
        height: wp('4%'),
        padding: wp('3%'),
        marginHorizontal: wp('5%'),
        tintColor: DARKMODE.iconColor
    },
});

const mapStateToProps = state => ({
    allTodos: state.addTodo.allTodos, // Map allNotes state to props
});

export default connect(mapStateToProps)(TodoScreen);
