/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
    title: string;
    thumbnailUrl: string;
    index: number;
    onPress: () => void;
};

const ImageItem: React.FC<Props> = ({title, thumbnailUrl, index, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: index % 2 === 0 ? '#E4F0FB' : '#F5F5F5',
                }}>
                <Image style={styles.thumbnail} source={{uri: thumbnailUrl}} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    title: {
        marginLeft: 10,
    },
});

export default ImageItem;
