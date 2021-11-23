import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {api} from '@src/apis';
import ImageItem from '@src/components/ImageItem';
import {Colors} from '@src/config';
import {useAuth} from '@src/providers/AuthProvider';
import * as React from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoList'>;

const PhotoListScreen: React.FC<Props> = ({navigation}) => {
    const [photos, setPhotos] = React.useState<IPhoto[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState({});
    const [searchText, setSearchText] = React.useState('');

    const {token, clearToken} = useAuth();

    React.useEffect(() => {
        (async () => {
            try {
                if (!token) {
                    return;
                }
                setIsLoading(true);
                const res = await api.getListPhoto(token);
                setPhotos(res.data);
            } catch (e) {
                Alert.alert('Error', 'An error occurred while fetching photos');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [token, refresh]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBox}>
                <TextInput
                    onChangeText={setSearchText}
                    style={styles.searchInput}
                    placeholder="Tìm kiếm..."
                />
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => setRefresh({})}
                    />
                }
                data={photos.filter(photo => photo.title?.includes(searchText))}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => (
                    <ImageItem
                        onPress={() => {
                            navigation.push('PhotoDetail', {
                                id: item.id,
                                title: item.title,
                            });
                        }}
                        index={index}
                        title={item.title}
                        thumbnailUrl={item.thumbnailUrl}
                    />
                )}
            />

            <TouchableOpacity
                onPress={() => clearToken()}
                style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {},

    searchBox: {
        backgroundColor: '#fff',
        padding: 20,
    },

    searchInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },

    logoutButton: {
        backgroundColor: Colors.Blue,
        padding: 15,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
    },

    logoutButtonText: {
        fontSize: 20,
        color: Colors.White,
        textAlign: 'center',
    },
});

export default PhotoListScreen;
