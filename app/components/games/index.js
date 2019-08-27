import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Layout, Text, Button, Avatar, AvatarProps, } from 'react-native-ui-kitten';


import { connect } from 'react-redux';
import { getGames } from '../../store/actions/games_actions';
import Moment from 'moment';


class Games extends Component {
    static navigationOptions = {
        title: 'GAMES',
        headerTitleStyle: {
            fontFamily: 'AvenirNext-Heavy',
            fontSize: 22,
        },
    }

    componentDidMount() {
        this.props.dispatch(getGames());
    }

    showGames = (list) => {
        return (
            list.games ?
                list.games.map((item, i) => (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('GamesArticle', {
                            ...item
                        })}
                        key={i}
                    >
                        <View style={styles.gameContainer}>
                            <View style={styles.gamebox}>
                                <Image
                                    source={{ uri: `${item.localData.logo}` }}
                                    style={{ height: 60, width: 80 }}
                                    resizeMode="contain"
                                />
                                <Text category="c2" style={{ fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{item.localData.wins}-{item.localData.loss}</Text>
                            </View>
                            <View style={styles.gamebox}>
                                <Text category="s1" style={styles.gameTitle}>{item.time}</Text>
                                <Text category="s1" style={styles.gameTitle}>{Moment(item.date).format('d MMMM')}</Text>
                            </View>
                            <View style={styles.gamebox}>
                                <Image
                                    source={{ uri: `${item.awayData.logo}` }}
                                    style={{ height: 60, width: 80 }}
                                    resizeMode="contain"
                                />
                                <Text category="c2" style={{ fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{item.awayData.wins}-{item.awayData.loss}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
                : null
        )
    }

    render() {
        console.log(this.props.Games.games)
        return (
            <ScrollView style={{ backgroundColor: '#f0f0f0', flex: 1 }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    flexWrap: 'nowrap'
                }}>
                    {this.showGames(this.props.Games)}
                </View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    gameContainer: {
        margin: 10,
        backgroundColor: '#fff',
        shadowColor: '#dddddd',
        shadowOffset: { width: 10, height: 30 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        elevation: 1,
    },
    gamebox: {
        width: '33.3%',
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameTitle: {
        fontFamily: 'AvenirNext-Bold'
    }
})

function mapStateToProps(state) {
    return {
        Games: state.Games
    }
}



export default connect(mapStateToProps)(Games);
