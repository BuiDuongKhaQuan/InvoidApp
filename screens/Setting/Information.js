import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { fontSizeDefault } from '../../constant/fontSize';
import { useUserContext } from '../UserContext';
import Loading from '../../components/Loading';
import SelectDropdown from 'react-native-select-dropdown';
import Header from '../../components/SettingItem/header';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { instance } from '../../Service/api';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function Information({ route }) {
    const navigation = useNavigation();
    const { state } = useUserContext();
    const { user, company } = state;
    const { dispatch } = useUserContext();
    const genders = ['Male', 'Female'];
    const [name, setName] = useState(state.user.name);
    const [email, setEmail] = useState(state.user.email);
    const [phone, setPhone] = useState(state.user.phone);
    const [selectedGender, setSelectedGender] = useState('');
    const [photoShow, setPhotoShow] = useState(null);
    const [photoShowWallpaper, setPhotoShowWallpaper] = useState(null);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const [data, setData] = useState(route?.params?.dataModel !== undefined ? route.params.dataModel : null);
    const { dataModel, refreshData } = route.params;

    useEffect(() => {
        // Call the refreshData function when this screen is focused
        const unsubscribe = navigation.addListener('focus', () => {
            refreshData();
        });

        // Cleanup the subscription when the component unmounts
        return unsubscribe;
    }, [refreshData]);
    const takePhotoAndUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        setPhotoShow(localUri);
        let filename = localUri.split('/').pop();
        console.log(localUri);
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('id', state.user.id);
        formData.append('avartar', {
            uri: localUri,
            name: filename,
            type,
        });
        setLoading(true);
        try {
            const response = await instance.patch('/v1/auth/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: response.data, company: state.company },
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    const uploadWallpaper = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 2],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        setPhotoShowWallpaper(localUri);
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('id', state.user.id);
        formData.append('wallpaper', {
            uri: localUri,
            name: filename,
            type,
        });
        setLoading(true);
        try {
            const response = await instance.patch('/v1/auth/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: response.data, company: state.company },
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    const handlerSend = async () => {
        let formData = new FormData();
        formData.append('id', state.user.id);
        // Kiểm tra và thêm tên nếu đã nhập
        if (name) {
            formData.append('name', name);
        }

        // Kiểm tra và thêm email nếu đã nhập
        if (email) {
            formData.append('email', email);
        }
        if (phone) {
            formData.append('phone', phone);
        }
        if (selectedGender) {
            formData.append('gender', selectedGender);
        }
        setLoading(true);
        try {
            const response = await instance.patch('/v1/auth/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch({
                type: 'SIGN_IN',
                payload: { user: response.data, company: state.company },
            });
            Alert.alert(t('common:updateSuccess'));
            console.log(response.data);
        } catch (error) {
            console.error(' error:', error.response);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundImage>
            <Header title={t('common:information')} />
            {route?.params?.dataModel !== undefined ? (
                <ScrollView style={styles.container}>
                    <Loading loading={loading} />
                    <View style={styles.top}>
                        <View style={styles.image}>
                            <Image
                                style={styles.avatar_img}
                                source={
                                    data.image == null
                                        ? require('../../assets/images/default-avatar.png')
                                        : { uri: data.image }
                                }
                            />
                            <Text>{t('common:avatar')} </Text>
                        </View>
                        <View style={styles.image}>
                            <Image
                                style={styles.wallpaper_img}
                                source={
                                    data.wallpaper == null
                                        ? require('../../assets/images/default-wallpaper.png')
                                        : { uri: data.wallpaper }
                                }
                            />
                            <Text>{t('common:wallpaper')} </Text>
                        </View>
                    </View>

                    <View>
                        <View style={styles.bottom}>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:name')}:</Text>
                                <Text style={styles.name}>{data.name}</Text>
                            </View>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:email')}:</Text>
                                <Text style={styles.name}>{data.email}</Text>
                            </View>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:phone')}:</Text>
                                <Text style={styles.name}>{data.phone}</Text>
                            </View>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:gender')}:</Text>
                                <Text style={styles.name}>{data.gender}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <ScrollView style={styles.container}>
                    <Loading loading={loading} />

                    <View style={styles.top}>
                        <View style={styles.image}>
                            <Image
                                style={styles.avatar_img}
                                source={
                                    user.image == null
                                        ? require('../../assets/images/default-avatar.png')
                                        : { uri: user.image }
                                }
                            />

                            <Button
                                text="Change avatar"
                                customStylesText={styles.text}
                                customStylesBtn={{ ...styles.change_btn, height: '37%' }}
                                onPress={takePhotoAndUpload}
                            />
                        </View>
                        <View style={styles.image}>
                            <Image
                                style={styles.wallpaper_img}
                                source={
                                    user.wallpaper == null
                                        ? require('../../assets/images/default-wallpaper.png')
                                        : { uri: user.wallpaper }
                                }
                            />
                            <Button
                                text="Change wallpaper"
                                customStylesText={styles.text}
                                customStylesBtn={styles.change_btn}
                                onPress={uploadWallpaper}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={styles.bottom}>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:name')}:</Text>
                                <Input
                                    customStylesContainer={styles.container_input}
                                    holder={state.user.name}
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                />
                            </View>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:email')}:</Text>
                                <Input
                                    customStylesContainer={styles.container_input}
                                    holder={state.user.email}
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:phone')}:</Text>
                                <Input
                                    customStylesContainer={styles.container_input}
                                    holder={state.user.phone}
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                />
                            </View>
                            <View style={styles.bottom_item}>
                                <Text style={styles.text}>{t('common:gender')}:</Text>
                                <View style={styles.dropdown}>
                                    <SelectDropdown
                                        data={genders}
                                        onSelect={(selectedItem, index) => {
                                            setSelectedGender(selectedItem);
                                        }}
                                        buttonStyle={styles.dropdown_btn}
                                        defaultButtonText={state.user.gender}
                                        renderDropdownIcon={() => (
                                            <Entypo name="chevron-small-down" size={24} color="black" />
                                        )}
                                        dropdownIconPosition="right"
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem;
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item;
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <Button text="Save" onPress={handlerSend} />
                        </View>
                    </View>
                </ScrollView>
            )}
        </BackgroundImage>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    top: {
        flex: 2,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    image: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex--start',
        alignItems: 'center',
    },
    avatar_img: {
        width: 100,
        height: 100,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
        marginHorizontal: 10,
    },
    wallpaper_img: {
        width: 100,
        height: 70,
        borderWidth: 1,
        borderColor: 'gray',
        resizeMode: 'stretch',
        marginHorizontal: 10,
    },
    change_btn: {
        flex: 0.6,
        width: '70%',
        height: '54%',
        borderRadius: 5,
    },
    bottom: {
        flex: 3,
        marginTop: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom_item: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        fontWeight: 'bold',
        fontSize: fontSizeDefault,
    },
    name: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,

        lineHeight: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
    container_input: {
        height: '50%',
        paddingHorizontal: 10,
        marginBottom: 0,
        elevation: 0,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    dropdown: {
        marginHorizontal: 10,
    },
    dropdown_btn: {
        height: '70%',
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    btn: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
