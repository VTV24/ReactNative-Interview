import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhotoListScreen from '@src/screens/PhotoListScreen';
import LoginScreen from './screens/LoginScreen';
import {AuthProvider} from './providers/AuthProvider';
import PhotoDetail from './screens/PhotoDetail';
import {Colors} from './config';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                {token =>
                    token ? (
                        <Stack.Navigator>
                            <Stack.Screen
                                name="PhotoList"
                                options={{
                                    title: 'Danh sách hình ảnh',
                                    headerStyle: {
                                        backgroundColor: Colors.Pink,
                                    },
                                    headerTitleStyle: {
                                        color: Colors.White,
                                    },
                                }}
                                component={PhotoListScreen}
                            />
                            <Stack.Screen
                                name="PhotoDetail"
                                component={PhotoDetail}
                                options={({route}) => ({
                                    title: route.params.title,
                                    headerStyle: {
                                        backgroundColor: Colors.Pink,
                                    },
                                    headerTitleStyle: {
                                        color: Colors.White,
                                    },
                                    headerBackVisible: false,
                                })}
                            />
                        </Stack.Navigator>
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack.Navigator>
                    )
                }
            </AuthProvider>
        </NavigationContainer>
    );
};

export default App;
