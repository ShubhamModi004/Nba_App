import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import Video from 'react-native-video';
import Moment from 'moment';

import Back from '../../assets/icons/back.png';

import { connect } from 'react-redux';
import { autoSignIn } from '../../store/actions/user_actions';

import { getTokens, setTokens } from '../../utils/misc';


import { Layout, Button, Avatar, AvatarProps, } from 'react-native-ui-kitten';
import Ionicons from '../../../node_modules/react-native-vector-icons/Ionicons';

class GameArticleComponent extends Component {

    state = {
        loading: true,
        isAuth: false,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    };

    manageState(loading, isAuth) {
        this.setState({
            loading,
            isAuth
        })
    }

    componentDidMount() {
        const User = this.props.User;
        getTokens((value) => {
            if (value[0][1] === null) {
                this.manageState(false, false)
            } else {
                this.props.dispatch(autoSignIn(value[0][1]))
                    .then(() => {
                        !User.auth.token ?
                            this.manageState(false, false)
                            :
                            setTokens(User.auth, () => {
                                this.manageState(false, true)
                            })
                    })

            }
        })
    }


    renderContent = (data) => {
        const bg = data.localData.background;
        const bg2 = data.awayData.background;
        return (
            <View
                style={{ flex: 1 }}
            >
                <Video
                    source={{ uri: data.play }}
                    controls={true}
                    muted={true}
                    paused={true}
                    style={{ width: '100%', height: 209 }}
                />
                {/* Home team */}
                <View style={{
                    backgroundColor: `${bg}`,
                }}>
                    <View style={{ padding: 15, marginVertical: 20 }}>
                        <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 60, lineHeight: 68, fontWeight: "800" }}>{data.localData.city}</Text>
                        <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 60, lineHeight: 65, fontWeight: "800" }}>{data.localData.name}</Text>
                        <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4' }}>Next Matchup: {Moment(data.date).format('YYYY-MM-DD')}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 40, fontFamily: "AvenirNext-Bold", color: '#fff', flex: 0.7 }}>Home vs <Text style={{ color: '#c4c4c4' }}>{data.awayData.name}</Text></Text>
                            <View style={{ flex: 0.3, flexDirection: 'row', position: 'relative' }}>
                                <Avatar source={{ uri: `${data.localData.logo}` }} size="giant" style={{ position: 'absolute', zIndex: 2 }} shape="square" />
                                <Avatar source={{ uri: `${data.awayData.logo}` }} size="giant" style={{ position: 'absolute', zIndex: 1, marginLeft: 50 }} shape="square" />
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 25, marginTop: 20 }}>Standing</Text>
                            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.1 }}>{data.localData.rank}</Text>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.3 }}>{data.localData.city} {data.localData.name}</Text>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.3, textAlign: 'center' }}>{data.localData.wins}-{data.localData.loss}</Text>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.3, textAlign: 'center' }}>{data.localData.ppg}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                {/* away teams */}
                <View style={{
                    backgroundColor: `${bg2}`,
                }}>
                    <View style={{ padding: 15, marginVertical: 20 }}>
                        <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 60, lineHeight: 68, fontWeight: "800" }}>{data.awayData.city}</Text>
                        <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 60, lineHeight: 65, fontWeight: "800" }}>{data.awayData.name}</Text>
                        <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4' }}>Next Matchup: {Moment(data.date).format('YYYY-MM-DD')}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                            <Text style={{ fontSize: 40, fontFamily: "AvenirNext-Bold", color: '#fff', flex: 0.7 }}><Text style={{ color: '#c4c4c4' }}>{data.localData.name}</Text> vs. Away</Text>
                            <View style={{ flex: 0.3, flexDirection: 'row', position: 'relative' }}>
                                <Avatar source={{ uri: `${data.awayData.logo}` }} size="giant" style={{ position: 'absolute', zIndex: 2 }} shape="square" />
                                <Avatar source={{ uri: `${data.localData.logo}` }} size="giant" style={{ position: 'absolute', zIndex: 1, marginLeft: 50 }} shape="square" />
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 25, marginTop: 20 }}>Standing</Text>
                            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.1 }}>{data.awayData.rank}</Text>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.3 }}>{data.awayData.city} {data.awayData.name}</Text>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.3, textAlign: 'center' }}>{data.awayData.wins}-{data.awayData.loss}</Text>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 15, flex: 0.3, textAlign: 'center' }}>{data.awayData.ppg}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        const params = this.props.navigation.state.params;
        const bg = params.localData.background;
        if (this.state.loading) {
            return (

                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: '#f0f0f0', flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            backgroundColor: `${bg}`,
                            height: 40,
                            borderBottomColor: 'transparent',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            flex: 0.12,
                            elevation: 1,
                            zIndex: 2
                        }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1 }}>
                                <Image source={Back} resizeMode='contain' style={{ width: 22, marginLeft: 15, marginTop: 55 }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'AvenirNext-Bold', flex: 3, marginTop: 58, fontSize: 18 }}>{params.localData.name} vs {params.awayData.name}</Text>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <ScrollView style={{ flex: 1 }} bounces={false}>
                            {this.renderContent(params)}
                        </ScrollView>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notAuth: {
        flex: 1,
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

function mapStateToProps(state) {
    return {
        User: state.User
    }
}




export default connect(mapStateToProps)(GameArticleComponent);
