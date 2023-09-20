import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import InvoiceList from '../components/InvoiceList';
import Header from '../components/SettingItem/header';
import { backgroundColor, white } from '../constant/color';
import Input from '../components/Input';
import Button from '../components/Button';
export default function Bills() {
    const [invoices, setInvoices] = useState([
        {
            id: '1',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '2',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '3',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '4',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
        {
            id: '5',
            image: 'https://accgroup.vn/wp-content/uploads/2022/08/hoa-don-ban-hang.jpg',
        },
    ]);
    return (
        <View style={styles.container}>
            <Header title={'Hóa đơn'} />
            <View style={{ flexDirection: 'row' }}>
                <Input customStylesContainer={styles.input} iconLeft={require('../assets/icons/search.png')} />
                <Button
                    style={styles.icon1}
                    iconRight={require('../assets/icons/qr-code.png')}
                    onPress={() => navigation.navigate('Scanner')}
                />
            </View>
            <View style={styles.list}>
                <InvoiceList data={invoices} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    list: {
        flex: 1,
    },
    input: {
        flex: 6,
        width: '100%',
        marginTop: StatusBar.currentHeight || 20,
        borderRadius: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        borderRadius: 50,
        elevation: 0,
        borderColor: 'gray',
        borderWidth: 1,
    },
    icon1: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
});