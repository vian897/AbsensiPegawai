/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
    Component
} from 'react';

import { Container, Text, Content, Button, Form, Item, Input, Picker, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
export default class AbsenDosen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nip: '',
            nama: '',
            absen: '',
            prodi: '',
            jabatan: '',
            jam: '',
            date: '',
            isclicked: false,
        };
        AsyncStorage.getItem('Dosen', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result)
                this.setState({
                    nama: resultParsed.nama,
                    nip: resultParsed.nip,
                    prodi: resultParsed.prodi,
                });
            }
        });

        AsyncStorage.getItem('Tombol', (error, tbl) => {
            if (tbl) {
                let resultTombol = JSON.parse(tbl)
                this.setState({
                    isclicked: resultTombol.isclicked,
                });
            }
        });
    }
    onValueChangeProdi(value: String) {
        this.setState({
            prodi: value
        });
    }
    onValueChangeAbsen(value: String) {
        this.setState({
            absen: value
        });
    }

    onSubmit() {
        const absensis = {
            nip: this.state.nip,
            nama: this.state.nama,
            absen: this.state.absen,
            prodi: this.state.prodi,
            jabatan: 'Dosen',
            jam: this.state.jam
        }
        const tombol = {
            isclicked: true
        }
        console.log(' ABSEN ', absensis);

        // axios.post('http://192.168.1.11:5000/absensis/add', absensis)
        //     .then(res => console.log(res.data))

        AsyncStorage.setItem('Dosen', JSON.stringify(absensis));
        AsyncStorage.setItem('Tombol', JSON.stringify(tombol));
        this.setState({ isclicked: true });
        // AsyncStorage.setItem('Tombol', JSON.stringify(tombol));
        // console.log("Status Tombol", AsyncStorage.setItem('Tombol', JSON.stringify(tombol)))
        // console.log("Status User", AsyncStorage.setItem('Dosen', JSON.stringify(absensis)))
    }

    async deleteToken() {
        try {
            await AsyncStorage.removeItem('Tombol')
        } catch (err) {
            console.log(`The error is: ${err}`)
        }
    }

    componentDidMount() {
        // this.setState({ isclicked: false })

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        this.setState({
            //Setting the value of the date time
            jam:
                hours + ':' + min,
        });

        if (this.state.isclicked == true) {
            this.setState({ isclicked: true })
            AsyncStorage.setItem('Tombol', this.state.isclicked);
        } else if (hours >= 0 && hours <= 8) {
            this.setState({ isclicked: false });
            this.deleteToken();
        }

        // if (this.state.isclicked === "true") {
        //     AsyncStorage.setItem('Tombol', JSON.stringify({ isclicked: "true" }));
        //     if (hours === 6) {
        //         AsyncStorage.setItem('Tombol', JSON.stringify({ isclicked: "false" }));
        //     } else {
        //         AsyncStorage.setItem('Tombol', JSON.stringify({ isclicked: "true" }));
        //     }
        // } else if (this.state.isclicked === "false") {
        //     AsyncStorage.setItem('Tombol', JSON.stringify({ isclicked: "false" }));
        //     if (hours === 6) {
        //         AsyncStorage.setItem('Tombol', JSON.stringify({ isclicked: "false" }));
        //     } else {
        //         AsyncStorage.setItem('Tombol', JSON.stringify({ isclicked: "true" }));
        //     }
        // }

        console.log(" ISCLICKED : ", this.state.isclicked)
    }

    render() {
        // if(hours > 6){
        //     this.disablebutton();
        // }else if(hours < 6){
        //     this.notdisablebutton();
        // }
        return (
            <Container>
                <Content>
                    <Text style={{ textAlign: 'center', marginTop: 24, fontFamily: 'FontAwesome', fontSize: 24 }}>
                        Absensi Dosen
                    </Text>
                    <Form style={{ marginTop: 15 }}>
                        <Item rounded
                            style={{ marginTop: 12, marginLeft: 12, marginRight: 12 }}>
                            <Input
                                placeholder='NIP'
                                keyboardType='numeric'
                                onChangeText={nip =>
                                    this.setState({ nip: nip })
                                }
                                value={this.state.nip}
                            />
                        </Item>
                        <Item rounded
                            style={{ marginTop: 12, marginLeft: 12, marginRight: 12 }}>
                            <Input
                                placeholder='Nama'
                                onChangeText={nama =>
                                    this.setState({ nama: nama })
                                }
                                value={this.state.nama}
                            />
                        </Item>
                        <Item rounded picker
                            style={{ marginTop: 12, marginLeft: 12, marginRight: 12 }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.prodi}
                                onValueChange={this.onValueChangeProdi.bind(this)}
                                onChangeText={prodi =>
                                    this.setState({ prodi: prodi })
                                }
                            >
                                <Picker.Item label="Prodi" value="key0" />
                                <Picker.Item label="Teknik Elektro" value="Teknik Elektro" />
                                <Picker.Item label="Teknik Sipil" value="Teknik Sipil" />
                                <Picker.Item label="Teknik Kimia" value="Teknik Kimia" />
                                <Picker.Item label="Teknik Mesin" value="Teknik Mesin" />
                                <Picker.Item label="Administrasi Niaga" value="Administrasi Niaga" />
                                <Picker.Item label="Akuntansi" value="Akuntansi" />
                            </Picker>
                        </Item>
                        <Item rounded
                            style={{ marginTop: 12, marginLeft: 12, marginRight: 12 }}>
                            <Input
                                placeholder='Jam'
                                onChangeText={jam =>
                                    this.setState({ jam: jam })
                                }
                                value={this.state.jam}
                                disabled
                            />
                        </Item>

                    </Form>
                    <Button rounded success block
                        style={{ marginLeft: 12, marginRight: 12, marginTop: 20 }}
                        onPress={() => {
                            this.onSubmit()
                            // this.setState({ isclicked: "true" })
                        }}
                        disabled={this.state.isclicked}>

                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
