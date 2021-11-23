import {api} from '@src/apis';
import Input from '@src/components/Input';
import {Colors} from '@src/config';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '@src/providers/AuthProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = () => {
    const {setToken} = useAuth();

    const {control, handleSubmit} = useForm<ILoginData>({
        defaultValues: {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
        },
    });
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (data: ILoginData) => {
        try {
            setIsLoading(true);
            const token = (await api.login(data)).data.token;
            setToken(token);
        } catch (e) {
            Alert.alert('Error', 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const onError = () => {
        Alert.alert('Error', 'Username or password is required!');
    };

    return (
        <View style={styles.container}>
            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            )}

            <View style={styles.formContainer}>
                <Input control={control} name="email" placeholder="Username" />
                <Input
                    control={control}
                    name="password"
                    placeholder="Password"
                />
            </View>

            <KeyboardAvoidingView
                style={styles.buttonContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableOpacity
                    onPress={() => handleSubmit(onSubmit, onError)()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Pink,
        flex: 1,
    },

    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White,
        opacity: 0.2,
        zIndex: 1,
    },

    formContainer: {
        flex: 1,
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
    },

    buttonContainer: {
        flexDirection: 'column',
    },

    button: {
        backgroundColor: Colors.Blue,
        padding: 15,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
    },

    buttonText: {
        color: Colors.White,
        fontSize: 20,
        textAlign: 'center',
    },
});

export default LoginScreen;
