import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Header from '../Header';

export default function InvoiceItem({ data, onPress }) {
    const handlePress = () => {
        alert(data.image);
    };

    return (
        <TouchableOpacity style={styles.invoice} onPress={handlePress}>
            <Image style={styles.img} source={{ uri: data.image }} />
            <View style={styles.mode}>
                <Text style={styles.text}>...</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    invoice: {
        alignItems: 'flex-end',
        marginHorizontal: 6,
    },
    img: {
        width: 180,
        height: 260,
        resizeMode: 'stretch',
        borderRadius: 10,
    },
    mode: {
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 30,
    },
});
