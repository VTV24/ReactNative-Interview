import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {api} from '@src/apis';
import {Colors} from '@src/config';
import {useAuth} from '@src/providers/AuthProvider';
import * as React from 'react';
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoDetail'>;

const PhotoDetail: React.FC<Props> = ({route, navigation}) => {
    const [photo, setPhoto] = React.useState<IPhoto>();

    const {token} = useAuth();

    React.useEffect(() => {
        (async () => {
            try {
                if (!token) {
                    return;
                }
                const res = await api.getDetailPhoto(route.params.id, token);
                setPhoto(res.data);
            } catch {
                Alert.alert('Error', 'Cannot get photo detail');
            } finally {
            }
        })();
    }, [route.params.id, token]);

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={{uri: photo?.url}} />

            <TouchableOpacity
                onPress={() => {
                    navigation.pop();
                }}
                style={styles.backButton}>
                <Text style={styles.backButtonText}>Trở lại</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Pink,
        flex: 1,
    },

    image: {
        flex: 1,
    },

    backButton: {
        backgroundColor: Colors.Blue,
        padding: 15,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
    },

    backButtonText: {
        fontSize: 20,
        color: Colors.White,
        textAlign: 'center',
    },
});

export default PhotoDetail;
