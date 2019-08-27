import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import Video from 'react-native-video';
import Moment from 'moment';

import Back from '../../assets/icons/back.png';
import { connect } from 'react-redux';

import { Layout, Button, Avatar, AvatarProps, } from 'react-native-ui-kitten';
import Ionicons from '../../../node_modules/react-native-vector-icons/Ionicons';

const height = Dimensions.get('window').height;
const topH = Math.floor(height / 3);
const bottomH = Math.floor(height -topH)
class Player extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    };

    renderContent = (data) => {
        const bg = data.bgTeam;
        const bg2 = data.bgPlayer;
        return (
            <View style={{ flex: 1}}>
                 <View style={{ height: topH, backgroundColor: `${bg}`, flex: 1, position: 'relative' }}>
                    <View style={{ padding: 15, marginVertical: 20, flexDirection: 'column'}}>
                            <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 40, fontWeight: '800', lineHeight: 50}}>{data.team_name}</Text>
                            <View style={{ flexDirection: "row"}}>
                                <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 12}}>Rank {data.rank}. </Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4' }}>Win {data.wins} : loss {data.loss} / PPG {data.ppg}</Text>
                            </View>
                            <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 17, marginTop: 25}}>Player's weekly average</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#fff', width: '14.28%' }}>FG</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#fff', width: '14.28%' }}>FG%</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#fff', width: '14.28%' }}>3P</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#fff', width: '14.28%' }}>3P%</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#fff', width: '14.28%' }}>FT</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#fff', width: '14.28%' }}>FT%</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#fff', width: '14.28%' }}>POS</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2}}>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', width: '14.28%' }}>{data.field_goals_made}</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', width: '14.28%' }}>{data.field_goal_percentage_string}%</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', width: '14.28%' }}>{data.three_point_field_goals_made}</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', width: '14.28%' }}>{data.three_point_field_goal_percentage_string}%</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', width: '14.28%' }}>{data.free_throws_made}</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', width: '14.28%' }}>{data.free_throw_percentage_string}%</Text>
                                <Text style={{ fontSize: 12, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', width: '14.28%' }}>{data.position}</Text>
                            </View>
                        </View>
                 </View>
                 <View style={{ height: bottomH, backgroundColor: `${bg2}`, flex: 1, position: 'relative' }}>
                    <View style={{ padding: 15, marginVertical: 20}}>
                            <Text style={{ fontFamily: "AvenirNext-Bold", color: "#fff", fontSize: 40,fontWeight: '800', zIndex: 20, lineHeight: 50}}>{data.display_name}</Text>
                            <Text style={{ fontSize: 14, fontFamily: "AvenirNext-DemiBold", color: '#c4c4c4', marginBottom: 20 }}>Weekly Stats</Text>
                            <Text style={{ fontSize: 30, fontFamily: "AvenirNext-Bold", color: '#fff', marginVertical: 3 }}>{data.points} PTS</Text>
                            <Text style={{ fontSize: 30, fontFamily: "AvenirNext-Bold", color: '#fff', marginVertical: 3 }}>{data.assists} AST</Text>
                            <Text style={{ fontSize: 30, fontFamily: "AvenirNext-Bold", color: '#fff', marginVertical: 3 }}>{data.rebounds} RBD</Text>
                            <Text style={{ fontSize: 30, fontFamily: "AvenirNext-Bold", color: '#fff', marginVertical: 3 }}>{data.turnovers} TRO</Text>
                            <Text style={{ fontSize: 30, fontFamily: "AvenirNext-Bold", color: '#fff', marginVertical: 3 }}>{data.minutes} MIN</Text>
                            <View style={styles.playerBox}>
                                <Image
                                    source={{ uri: `${data.image}` }}
                                    style={{ height: 760, width: 580 }}
                                    resizeMode="contain"
                                    transform= {data.display_name === "Russell Westbrook" ? [{scaleX: -1}] : [{scaleX: 1}]}
                                />
                            </View>
                        </View>
                 </View>
            </View>
        )
    }

    render() {
        const params = this.props.navigation.state.params;
        console.log(params);
        const bg = params.bgTeam;
        return (
             <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        backgroundColor: `${bg}`,
                        height: 10,
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

                    </View>
                    <ScrollView bounces={false} style={{ backgroundColor: '#fff', flex: 1 }}>
                            {this.renderContent(params)}
                    </ScrollView>
                </View>
            </View>
            )
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
    playerBox:{
        position: 'absolute',
        top: -10,
        left: 2,
        zIndex: 10
    }
})




export default Player;
