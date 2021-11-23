/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

type IAuthProviderContext = {
    token: string | null;
    setToken: (token: string | null) => void;
    clearToken: () => Promise<void>;
};

const authContext = React.createContext<IAuthProviderContext>({
    token: null,
    setToken: () => {},
    clearToken: async () => {},
});

export const useAuth = () => React.useContext(authContext);

export const AuthProvider: React.FC<{
    children: (token: string | null) => JSX.Element;
}> = ({children}) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const _token = await EncryptedStorage.getItem('token');
                setToken(_token);
            } catch {
                setToken(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const clearToken = async () => {
        await EncryptedStorage.removeItem('token');
        setToken(null);
    };

    return (
        <authContext.Provider
            value={{
                token,
                setToken,
                clearToken,
            }}>
            {loading ? (
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                    <ActivityIndicator />
                </View>
            ) : (
                children(token)
            )}
        </authContext.Provider>
    );
};
