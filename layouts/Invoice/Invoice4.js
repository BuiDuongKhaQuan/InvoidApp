import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import { Entypo } from '@expo/vector-icons';
import { fontSizeDefault } from '../../constant/fontSize';
import PrintBtn from './PrintBtn';
import { useUserContext } from '../../screens/UserContext';
import { getCompaniesById, getProductById } from '../../Service/api';
import { white } from '../../constant/color';
import { Asset } from 'expo-asset';

export default function Invoice7_test({ route, data }) {
    const { state } = useUserContext();
    const currentDate = moment().format('DD/MM/YYYY');
    const currentHour = moment().format('HH:mm');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [products, setProducts] = useState([]);
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [ck, setCk] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBillPrice, setTotalBillPrice] = useState(0);
    const [id, setId] = useState(1);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState();
    const [data2, setData2] = useState(route ? route.params.invoice : null);
    const [nameCompany, setNameCompany] = useState([]);

    const imageUri = require('../../assets/images/header_seven.png');
    const imageUri2 = require('../../assets/images/bottom.png');

    const imageAsset = Asset.fromModule(imageUri);
    const imageAsset2 = Asset.fromModule(imageUri2);

    // Chuyển đổi tài nguyên hình ảnh thành URI
    const uri = imageAsset.localUri || imageAsset.uri;
    const uri2 = imageAsset.localUri || imageAsset2.uri;

    useEffect(() => {
        const getNameCompaniesById = async () => {
            try {
                const response = await getCompaniesById(state.company.id);
                setNameCompany(response);
                // console.log(nameCompany.name);
            } catch (error) {}
        };
        getNameCompaniesById();
    });
    const [productName, setProductName] = useState([]);
    const getProductId = async (id) => {
        try {
            const response = await getProductById(id);
            // console.log(response.name);
            setProductName(response);
        } catch (error) {
            // console.log(error);
        }
    };
    const [productsApi, setProductsApi] = useState([
        {
            id: 1,
            name: 'Cam',
            price: 10000,
        },
        {
            id: 2,
            name: 'Quýt',
            price: 20000,
        },
        {
            id: 3,
            name: 'Bưởi',
            price: 30000,
        },
        {
            id: 4,
            name: 'Dừa',
            price: 40000,
        },
        {
            id: 5,
            name: 'Ổi',
            price: 50000,
        },
    ]);
    const [productId, setProductId] = useState('');
    const listProductHtml = () =>
        products
            .map(
                (product) =>
                    ` <tr>
                    <td style="font-weight: 700">${product.id}</td>
                    <td style="font-weight: 700; padding-left: 30px;">${product.name}</td>
                        <td style="text-align: center" ">${product.price}</td>
                        <td style="padding-left: 30px;">${product.quantity}</td>
                        <td style="text-align: center">${product.totalPrice}</td>
                    
                </tr>`,
            )
            .join('');
    const html = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width; initial-scale=1.0" />
                    <title>Document</title>
                    <style>
                        .container {
                            display: flex;
                            flex-direction: column;
                            background-color: white;
                            margin-left: 10;
                            margin-right: 10;
                        }
                        .container_top {
                            align-items: 'center';
                            flex: 1;
                            text-align: center;
                            justify-content: 'center';
                        }
            
                        table,
                        th,
                        td {
                            border-collapse: collapse;
                        }
                        p {
                            margin: 3px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="container_top" style="margin-top: 40px">
                            <div style="text-align: right;">
                                <p style="font-weight: 600;">${nameCompany.name}</p>
                            </div>
                            <div style="text-align: right">
                                <p>${nameCompany.address}</p>
                            </div>
                            <div style="text-align: right">
                                <p>${nameCompany.phone}</p>
                            </div>
                            <div style="text-align: right">
                                <p>${nameCompany.email}</p>
                            </div>
                            <div style="text-align: left; font-weight: 600">
                                <p>HÓA ĐƠN THANH TOÁN</p>
                            </div>
                        </div>
                        <div class="container_center">
                            <div style="display: flex; flex-direction: row">
                                <div style="display: flex; flex-direction: row; flex: 2">
                                    <p style="margin-right: 20;font-weight: 600">Invoice No:</p>
                                    <p>1412</p>
                                </div>
                                
                                <div style="display: flex; flex-direction: row; flex: 1">
                                    <p style="margin-right: 20;font-weight: 600">Date:</p>
                                    <p>${currentDate}</p>
                                </div>
                            </div>
                            <div class="cashier" style="display: flex; flex-direction: row">
                                <p style="margin-right: 20;font-weight: 600">Bill to:</p>
                                <div style="flexDirection: 'column'">
                                <p>${data.name}</p>
                                <p>${nameCompany.address}</p>
                                </div>
                            </div>
                            
                            <table style="width: 100%">
                                <tr style="border-bottom: 1px dashed black">
                                    <th style="text-align: center">Item</th>
                                    <th style="text-align: left">Description</th>
                                    <th style="text-align: center">Price</th>
                                    <th style="text-align: center">total</th>
                                </tr>
                                <tr>
                                ${listProductHtml()}

                                </tr>
                            </table>
                            <p style="border-bottom: 1px dashed black"></p>
                        </div>
                        <div class="container_bottom" style="justify-content: right">
                            <div style="display: flex; flex-direction: row; justify-content: right">
                                <p style="justify-content: left; font-weight: bold">Total:</p>
                                <p>${subTotal}</p>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                            <p style="justify-content: left; font-weight: bold">Thank you</p>
                        </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold">Bank name:</p>
                                <p>${customer}</p>
                                </div>
                            <div style="display: flex; flex-direction: row; justify-content: left">
                                <p style="justify-content: left; font-weight: bold; font-size: 18px">Bank acount:</p>
                                <p>${phone}</p>
                                </div>
                            <p style="border-bottom: 1px dashed black"></p>
                            <div style="display: flex; flex-direction: row; justify-content: right"></div>
                        </div>
                    </div>
                </body>
            </html>
            
            
            `;

    const handleAddProduct = () => {
        if (nameProduct && price && quantity) {
            setProducts([
                ...products,
                {
                    id: id,
                    productId: productId,
                    name: nameProduct,
                    price: price,
                    quantity: quantity,
                    ck: ck,
                    totalPrice: totalPrice,
                },
            ]);
            setId(id + 1);
            setNameProduct('');
            setPrice();
            setCk();
            setQuantity();
            setTotalPrice();
            setProductId();
        }
    };
    useEffect(() => {
        const newSubTotal = products.reduce((total, product) => {
            return total + product.totalPrice;
        }, 0);
        setSubTotal(newSubTotal);
    }, [products]);
    const handleChangePrice = (text) => {
        setPrice(text.toString());
        setTotalPrice(quantity * text);
    };
    const handleChangeQuantity = (text) => {
        setQuantity(text.toString());
        setTotalPrice(text * price);
    };
    const handleChangeTax = (text) => {
        setTax(text);
        setTotalBillPrice(subTotal + (subTotal * text) / 100);
    };
    const removeProduct = (key) => {
        products.splice(key, 1);
        setProducts([...products]);
    };

    useEffect(() => {
        const newTotalBillPrice = products.reduce((total, product) => {
            return total + product.totalPrice;
        }, 0);
        setTotalBillPrice(newTotalBillPrice);
    }, [products]);
    useEffect(() => {
        const newTotalCk = products.reduce((ck, product) => {
            return parseInt(product.ck, 10) + parseInt(ck, 10);
        }, 0);
        setCk(newTotalCk.toString());
    }, [products]);
    //get cong ty

    return (
        <PrintBtn html={html}>
            <View style={styles.container_top}>
                <View style={styles.container_top1}>
                    <Text style={styles.Header_II}>{nameCompany.name}</Text>
                    <Text style={styles.address}>{nameCompany.address}</Text>
                    <Text style={styles.address}>{nameCompany.phone}</Text>
                    <Text style={styles.gmail}>{nameCompany.email}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>HÓA ĐƠN BÁN HÀNG</Text>
                </View>
                <View style={styles.container_top2}>
                    <View>
                        <View style={styles.casher}>
                            <Text style={styles.text_bold}>InVoice No:</Text>
                            <Text style={{ fontSize: 12 }}>1412</Text>
                        </View>
                        <View style={styles.casher}>
                            <Text style={styles.text_bold}>InVoice To:</Text>
                            <Text style={{ fontSize: 12 }}>{data.name}</Text>
                        </View>
                        <Text style={{ fontSize: 12 }}>{nameCompany.address}</Text>
                    </View>
                    <View>
                        <View style={styles.date}>
                            <Text style={styles.text_bold}>Ngày:</Text>
                            <Text style={{ marginHorizontal: 10 }}>{currentDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <KeyboardAvoidingView style={styles.container_center} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View style={styles.container_center}>
                    <Text style={styles.Header_1}></Text>

                    <View style={styles.table}>
                        <View style={styles.table_colum}>
                            <Text style={{ ...styles.text_line_header, ...styles.colum_id }}>#</Text>
                            <Text style={{ ...styles.text_line_header, ...styles.colum_name }}>Tên hàng</Text>
                            <Text style={{ ...styles.text_line_header, ...styles.colum_p }}>Đ.G</Text>
                            <Text style={{ ...styles.text_line_header, ...styles.colum_p }}>SL</Text>
                            <Text style={{ ...styles.text_line_header, ...styles.colum_p }}>TT</Text>
                            <Text style={{ ...styles.text_line_header, ...styles.colum_b }}></Text>
                        </View>
                        <Text style={styles.Header_1}></Text>

                        {products.map((product, index) => (
                            <View style={styles.table_colum_1} key={index}>
                                <View style={styles.table_colum1}>
                                    <Text style={{ ...styles.text_line, ...styles.colum_id }}>{product.id}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_name }}>{product.name}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.price}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.quantity}</Text>
                                    <Text style={{ ...styles.text_line, ...styles.colum_p }}>{product.totalPrice}</Text>
                                    <View style={{ ...styles.action_btn, ...styles.colum_b }}>
                                        <TouchableOpacity onPress={() => removeProduct(index)}>
                                            <AntDesign name="closesquare" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.table_colum2}></View>
                            </View>
                        ))}
                        <View style={styles.table_colum_2}>
                            <Text style={{ ...styles.text_line, ...styles.colum_id }}>{id}</Text>
                            <View style={{ ...styles.text_line, ...styles.colum_name }}>
                                <SelectDropdown
                                    data={productsApi}
                                    onSelect={(selectedItem) => {
                                        setProductId(selectedItem.id);
                                        setNameProduct(selectedItem.name);
                                        setPrice(selectedItem.price.toString());
                                    }}
                                    buttonStyle={{ width: '100%', height: 30 }}
                                    rowTextStyle={{ fontSize: fontSizeDefault }}
                                    defaultButtonText={'Selected product'}
                                    renderDropdownIcon={() => (
                                        <Entypo name="chevron-small-down" size={20} color="black" />
                                    )}
                                    dropdownIconPosition="right"
                                    buttonTextAfterSelection={(selectedItem) => {
                                        return selectedItem.name;
                                    }}
                                    rowTextForSelection={(item) => {
                                        return item.name;
                                    }}
                                />
                            </View>

                            <TextInput
                                onChangeText={handleChangePrice}
                                value={price}
                                placeholder="Đ.G"
                                keyboardType="numeric"
                                style={{ ...styles.text_line, ...styles.colum_p }}
                            />
                            <TextInput
                                onChangeText={handleChangeQuantity}
                                value={quantity}
                                placeholder="SL"
                                keyboardType="numeric"
                                style={{ ...styles.text_line, ...styles.colum_p }}
                            />
                            <Text style={{ ...styles.text_line, ...styles.colum_p, marginTop: 2, color: '#ccc' }}>
                                {totalPrice}
                            </Text>
                            <View style={{ ...styles.action_btn, ...styles.colum_b }}>
                                <TouchableOpacity onPress={handleAddProduct}>
                                    <AntDesign name="plussquare" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.Header_1}></Text>

                        <View style={styles.bottom_content}>
                            <View style={styles.bottom_right}>
                                <View style={styles.bottom_row}>
                                    <Text style={styles.text_bold_end}>SUBTOTAL:</Text>
                                    <Text style={styles.text_bold}>{subTotal}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={styles.bottom_row_1}>
                                <Text style={styles.text_bold}>Bank name:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nguyen Van A"
                                    onChangeText={(text) => setCustomer(text)}
                                    value={customer}
                                />
                            </View>
                            <View style={styles.bottom_row_1}>
                                <Text style={styles.text_bold}>Payment Infor: </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Bank account"
                                    onChangeText={(text) => setPhone(text)}
                                    value={phone}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.Header_1}></Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </PrintBtn>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    invoice: {
        flex: 10,
    },
    container1: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    container_top: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    address: {
        fontSize: 10,
    },
    container_center: {
        flex: 2,
    },
    date: {
        flexDirection: 'row',
    },
    casher: {
        flexDirection: 'row',
    },
    customer: {
        flexDirection: 'row',
        textAlign: 'center',
        marginTop: -10,
    },
    customer_name: {
        width: 100,
        height: 40,
    },
    input: {
        borderBottomColor: '#ccc',
        width: 150,
        height: 40,
        marginTop: -12,
    },
    customer_title: {
        marginTop: 10,
    },
    information: {
        flexDirection: 'row',
        marginTop: -10,
    },
    container_top1: {
        alignItems: 'flex-end',
    },
    container_top2: {
        flexDirection: 'row',
    },
    text_bold: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    text_bold_end: {
        fontWeight: 'bold',
    },
    text_line: {
        marginLeft: 5,
    },
    text_line_header: {
        marginLeft: 5,
        fontWeight: 'bold',
    },
    table: {
        flexDirection: 'column',
    },
    table_colum: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    table_colum_2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 1,
    },
    table_colum_1: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 1,
        // height: '20%',
    },
    colum_id: {
        flex: 1,
        textAlign: 'left',
        marginLeft: 0,
        marginRight: 5,
    },
    colum_name: {
        flex: 4,
        fontWeight: 'bold',
        textAlign: 'left',
        // marginLeft: -10,
    },
    action_btn: {
        flex: 1,
        marginVertical: 2,
        alignItems: 'flex-end',
    },
    colum_p: {
        flex: 2,
        textAlign: 'left',
        marginHorizontal: 2,
    },
    colum_b: {
        flex: 1,
        textAlign: 'left',
        marginHorizontal: 2,
    },

    bottom_content: {
        flex: 2,
        marginVertical: 10,
        paddingBottom: 50,
        alignItems: 'flex-end',
    },
    bottom_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
        // backgroundColor: 'red',
    },
    bottom_row_1: {
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    bottom_end: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    table_colum1: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'red',
    },
    table_colum2: {
        flex: 1,
        height: 15,
        marginLeft: 60,
        flexDirection: 'row',

        // backgroundColor: 'red',
    },

    line: {
        textAlign: 'center',
    },
    bottom_row_pay: {
        flexDirection: 'row',
    },
    Header_II: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    img_bottom: {
        width: '100%',
        resizeMode: 'contain',
    },
    Header_1: {
        backgroundColor: 'black',
        borderWidth: 1 / 6,
        height: 1,
    },
});