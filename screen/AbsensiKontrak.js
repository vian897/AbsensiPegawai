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

import axios from 'axios'

import { Container, Text, Content, Button, Form, Item, Input, Picker, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';
import { abs } from 'react-native-reanimated';

export default class AbsensiKontrak extends Component {
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
        };
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
            jabatan: 'Kontrak',
            jam: this.state.jam
        }
        console.log(' ABSEN ', absensis);

        axios.post('http://192.168.1.11:5000/absensis/add', absensis)
            .then(res => console.log(res.data))
    }

    componentDidMount() {

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        this.setState({
            //Setting the value of the date time
            jam:
                hours + ':' + min,
        });

    }

    render() {
        return (
            <Container>
                <Content>
                    <Text style={{ textAlign: 'center', marginTop: 24, fontFamily: 'FontAwesome', fontSize: 24 }}>
                        Absensi Kontrak
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
                                selectedValue={this.state.absen}
                                onValueChange={this.onValueChangeAbsen.bind(this)}
                                onChangeText={absen =>
                                    this.setState({ absen: absen })
                                }
                            >
                                <Picker.Item label="Absen Masuk" value="Absen Masuk" />
                                <Picker.Item label="Absen Keluar" value="Absen Keluar" />
                            </Picker>
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
                                <Picker.Item label="Teknik Multimedia dan Jaringan" value="Teknik Multimedia dan Jaringan" />
                                <Picker.Item label="Teknik Komputer dan Jaringan" value="Teknik Komputer dan Jaringan" />
                                <Picker.Item label="Teknik Elektro" value="Teknik Elektro" />
                                <Picker.Item label="Teknik Listrik" value="Teknik Listrik" />
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
                        onPress={() => { this.onSubmit() }}>

                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
