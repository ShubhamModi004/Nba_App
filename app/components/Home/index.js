import React, { Component, Fragment } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Layout, Text, Button, Avatar, AvatarProps, } from 'react-native-ui-kitten';
import Moment from 'moment';
import { connect } from 'react-redux';
import { getNews } from '../../store/actions/news_actions';
import { getGames } from '../../store/actions/games_actions';
import { getMatch } from '../../store/actions/match_actions';
import { getPlayer } from '../../store/actions/player_actions';

// importing images
import HomeImage from '../../assets/images/Home.jpg';

// importting icons
import Ionicons from '../../../node_modules/react-native-vector-icons/Ionicons';
import MaterialIcons from '../../../node_modules/react-native-vector-icons/MaterialIcons';

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(getNews());
        this.props.dispatch(getGames());
        this.props.dispatch(getMatch());
        this.props.dispatch(getPlayer());

    }

    getNestedObject = (nestedObj, pathArr) => {
        return pathArr.reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
    }// pass in your object structure as array elements

    renderToday = () => {
        const Match = this.props.Match.match
        const homeImage = (this.getNestedObject(Match, ['home_team', 'image']));
        const awayImage = (this.getNestedObject(Match, ['away_team', 'image']));
        const homePoints = (this.getNestedObject(Match, ['home_totals', 'points']));
        const awayPoints = (this.getNestedObject(Match, ['away_totals', 'points']));
        const eventTime = (this.getNestedObject(Match, ['event_information', 'start_date_time']));
        // const
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Match', {
                ...this.props.Match
            })}>
                <View style={styles.cardContainer}>
                    <Text category="h6" style={{ width: '100%', textAlign: 'center', fontFamily: 'AvenirNext-DemiBold' }}>View Stats</Text>
                    <View style={styles.cardScore}>
                        <View style={styles.gamebox}>
                            <Image
                                source={{ uri: `${homeImage}` }}
                                style={{ height: 90, width: 120 }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.gamebox}>
                            <Text category="s1" style={styles.gameTitle}>{homePoints} - {awayPoints}</Text>
                            <Text category="s1" style={styles.gameTitle}>{Moment(eventTime).format('d MMMM')}</Text>
                        </View>
                        <View style={styles.gamebox}>
                            <Image
                                source={{ uri: `${awayImage}` }}
                                style={{ height: 60, width: 80 }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }

    renderNews = (news) => {
        return (
            news.articles ?
                news.articles.map((item, i) => (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Article', {
                            ...item
                        })}
                        key={i}
                    >

                        <View style={styles.cardContainerNews}>
                            <Layout>
                                <ImageBackground
                                    style={{ height: 280, justifyContent: 'space-around' }}
                                    source={{ uri: `${item.image}` }}
                                    resizeMode='cover'
                                >
                                    <Layout style={styles.cardHeader}>
                                        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                                            <Text category='h6' style={styles.header}>{item.title}</Text>
                                            <View style={styles.secondarySection}>
                                                <Ionicons name='ios-basketball' size={25} color="white" style={{ flex: 1 }} />
                                                <Text category='s1' style={styles.secondaryHeader}>{item.team}</Text>
                                            </View>
                                        </View>
                                    </Layout>
                                    <View style={styles.overlay} />
                                </ImageBackground>
                            </Layout>
                        </View>
                    </TouchableOpacity>
                ))
                : null
        )
    }

    renderPlayer = (players) => {
        return (
            players.players ?
                players.players.map((player, i) => (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Player', {
                            ...player
                        })}
                        key={i}
                    >
                        <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text category="s1" style={{ fontFamily: 'AvenirNext-DemiBold', width: "5%", fontSize: 15 }}>{i + 1}</Text>
                            <Text category="s1" style={{ fontFamily: 'AvenirNext-DemiBold', width: "45%", fontSize: 15 }}>{player.display_name}</Text>
                            <Text category="s1" style={{ fontFamily: 'AvenirNext-DemiBold', width: "20%", fontSize: 15 }}>{player.points}</Text>
                            <Text category="s1" style={{ fontFamily: 'AvenirNext-DemiBold', width: "30%", fontSize: 10, textAlign: 'right' }}>View Stats</Text>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#000', marginBottom: 15, marginTop: 5 }}></View>
                    </TouchableOpacity>
                )
                ) : null
        )
    }

    renderMatch = (list) => {

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
        return (
            <ScrollView bounces={false} style={{ backgroundColor: '#f0f0f0' }}>
                <ImageBackground style={styles.ImageBackground} source={HomeImage} resizeMode='cover'>
                    <LinearGradient
                        colors={['rgba(255, 255, 255,0.0)', 'rgba(240, 240, 240,0.2)', 'rgb(240, 240, 240)']}
                        style={{ width: '100%', height: '100%' }}
                        opacity={1}
                    >
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.cardBox}>
                    {this.renderToday()}
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, padding: 20 }}>
                    <Text category="h5" style={styles.gameTitle}>Latest News</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('News')}
                    >
                        <Text category="s2" style={[styles.gameTitle, { paddingTop: 5 }]}>View All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.renderNews(this.props.News)}
                </ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 20 }}>
                    <Text category="h5" style={styles.gameTitle}>Top players of the Week</Text>
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                    {this.renderPlayer(this.props.Players)}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 20 }}>
                    <Text category="h5" style={styles.gameTitle}>Watch Matches</Text>
                </View>
                <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.renderMatch(this.props.Games)}
                </ScrollView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    ImageBackground: {
        width: '100%',
        height: 250,
    },
    cardBox: {
        flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -30, zIndex: 2
    },
    cardContainer: {
        position: 'relative',
        textAlign: 'center',
        zIndex: 2,
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: 340,
        backgroundColor: '#fff',
        shadowColor: '#dddddd',
        shadowOffset: { width: 10, height: 30 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 1,
    },
    cardScore: {
        flexDirection: 'row',
    },
    gamebox: {
        width: '33.3%',
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    gameTitle: {
        fontFamily: 'AvenirNext-Bold'
    },
    cardContainerNews: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#dddddd',
        shadowOffset: { width: 10, height: 30 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        overflow: 'hidden',
        height: 260,
        width: 240,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
    },
    header: {
        color: '#fff',
        paddingLeft: 20,
        fontFamily: 'AvenirNext-Bold',
        zIndex: 2,
        paddingTop: 30,
        paddingBottom: 30,
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        zIndex: 2,
        flex: 1,
    },
    secondarySection: {
        display: 'flex',
        flexDirection: 'row',
        flex: 5,
        paddingLeft: 20,
        zIndex: 2
    },
    secondaryHeader: {
        color: '#fff',
        fontSize: 15,
        flex: 4,
        paddingTop: 2,
        fontFamily: 'AvenirNext-DemiBold'
    },
    articleContainer: {
        flex: 1,
        padding: 15,
        marginTop: 5
    },
    avatar: {
        marginTop: -20,
        marginLeft: 15,
        backgroundColor: 'transparent',
    },
    cardBottom: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    cardBottomHeader: {
        color: '#fff',
        fontWeight: '700',
    },
    cardBottomSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    // games section
    gameContainer: {
        width: 300,
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
        News: state.News,
        Games: state.Games,
        Match: state.Match,
        Players: state.Players
    }
}



export default connect(mapStateToProps)(Home);