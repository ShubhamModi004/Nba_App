import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Layout, Text, Button, Avatar, AvatarProps, } from 'react-native-ui-kitten';
import Back from '../../assets/icons/back.png';
import Moment from 'moment';

import Ionicons from '../../../node_modules/react-native-vector-icons/Ionicons';

class Match extends Component {


    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    };

    getNestedObject = (nestedObj, pathArr) => {
        return pathArr.reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
    }// pass in your object structure as array elements

    renderContent = (data) => {
        const Match = data.match
        const homeImage = (this.getNestedObject(Match, ['home_team', 'image']));
        const awayImage = (this.getNestedObject(Match, ['away_team', 'image']));
        const homeName = (this.getNestedObject(Match, ['home_team', 'last_name']));
        const awayName = (this.getNestedObject(Match, ['away_team', 'last_name']));
        const homePoints = (this.getNestedObject(Match, ['home_totals', 'points']));
        const awayPoints = (this.getNestedObject(Match, ['away_totals', 'points']));
        const eventTime = (this.getNestedObject(Match, ['event_information', 'start_date_time']));
        const home_team_nick = (this.getNestedObject(Match, ['home_team', 'abbreviation']));
        const away_team_nick = (this.getNestedObject(Match, ['away_team', 'abbreviation']));
        // event points

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 140 }}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardScore}>
                            <View style={styles.gamebox}>
                                <Image
                                    source={{ uri: `${homeImage}` }}
                                    style={{ height: 80, width: 120 }}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.gamebox}>
                                <Text category="s1" style={styles.gameTitle}>{homePoints} - {awayPoints}</Text>
                                <Text category="s1" style={{ color: '#2d2d2d', textAlign: "center", fontSize: 10 }}>Heat leads series 1-0</Text>
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
                </View>
                <View style={{ padding: 15, marginVertical: 0 }}>
                    <Text category="h5" style={{ fontFamily: 'AvenirNext-Bold' }}>On the floor</Text>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                        <Text category="h6" style={{ fontWeight: "600", fontSize: 16, fontFamily: 'AvenirNext-DemiBold' }}>{home_team_nick}</Text>
                        <Text category="h6" style={{ fontWeight: "600", fontSize: 16, fontFamily: 'AvenirNext-DemiBold' }}>{away_team_nick}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginVertical: 10, width: '49.9%' }}>
                            {Match.home_stats ?
                                Match.home_stats.splice(0, 5).map((home, item) => (
                                    <View key={item} style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 3 }}>
                                        <Text category="p2" style={{ fontSize: 14, marginTop: 2, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold' }}>{home.first_name.charAt(0)}. {home.last_name}</Text>
                                        <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 14, fontFamily: 'AvenirNext-DemiBold' }}>{home.position}</Text>
                                    </View>
                                )) : null
                            }
                        </View>
                        <View style={{ backgroundColor: '#000', height: '90%', width: '0.2%', justifyContent: 'center', alignItems: 'center' }}>
                        </View>
                        <View style={{ marginVertical: 10, width: '49.9%' }}>
                            {Match.away_stats ?
                                Match.away_stats.splice(0, 5).map((away, item) => (
                                    <View key={item} style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 3 }}>
                                        <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 14, fontFamily: 'AvenirNext-DemiBold' }}>{away.position}</Text>
                                        <Text category="s2" style={{ fontSize: 14, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', textAlign: 'right' }}>{away.first_name.charAt(0)}. {away.last_name}</Text>
                                    </View>
                                )) : null
                            }
                        </View>
                    </View>
                </View>
                <View style={{ padding: 15, marginVertical: 0 }}>
                    <Text category="h5" style={{ fontFamily: 'AvenirNext-Bold' }}>Line Score</Text>
                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 20 }}>
                        <Text style={{ width: '25%' }}></Text>
                        <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 14, fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>1</Text>
                        <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 14, fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>2</Text>
                        <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 14, fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>3</Text>
                        <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 14, fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>4</Text>
                        <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 14, fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>T</Text>
                    </View>
                    {Match.home_period_scores ?
                        (
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: 2 }}>
                                <Text category="s1" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 16, fontFamily: 'AvenirNext-DemiBold', width: '25%' }}>{homeName}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.home_period_scores[0]}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.home_period_scores[1]}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.home_period_scores[2]}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.home_period_scores[3]}</Text>
                                <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 16, fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.home_period_scores[0] + Match.home_period_scores[1] + Match.home_period_scores[2] + Match.home_period_scores[3]}</Text>
                            </View>
                        )
                        : null
                    }
                    {Match.away_period_scores ?
                        (
                            <View style={{ flexDirection: 'row', flex: 1, marginTop: 2 }}>
                                <Text category="s1" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 16, fontFamily: 'AvenirNext-DemiBold', width: '25%' }}>{awayName}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.away_period_scores[0]}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.away_period_scores[1]}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.away_period_scores[2]}</Text>
                                <Text category="s2" style={{ fontWeight: '300', fontSize: 14, paddingHorizontal: 10, color: '#3a3a3a', fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.away_period_scores[3]}</Text>
                                <Text category="s2" style={{ fontWeight: '600', paddingHorizontal: 10, fontSize: 16, fontFamily: 'AvenirNext-DemiBold', width: '15%' }}>{Match.away_period_scores[0] + Match.away_period_scores[1] + Match.away_period_scores[2] + Match.away_period_scores[3]}</Text>
                            </View>
                        )
                        : null
                    }
                </View>
            </View>
        )
    }


    renderComparison = (data) => {
        const Match = data.match
        // required
        const home_team_nick = (this.getNestedObject(Match, ['home_team', 'abbreviation']));
        const away_team_nick = (this.getNestedObject(Match, ['away_team', 'abbreviation']));
        const homeAssists = (this.getNestedObject(Match, ['home_totals', 'assists']));
        const awayAssists = (this.getNestedObject(Match, ['away_totals', 'assists']));
        const homeBlocks = (this.getNestedObject(Match, ['home_totals', 'blocks']));
        const awayBlocks = (this.getNestedObject(Match, ['away_totals', 'blocks']));
        const homeRebounds = (this.getNestedObject(Match, ['home_totals', 'defensive_rebounds']));
        const awayRebounds = (this.getNestedObject(Match, ['away_totals', 'defensive_rebounds']));
        const homeFieldgoal = (this.getNestedObject(Match, ['home_totals', 'field_goal_percentage']));
        const awayFieldgoal = (this.getNestedObject(Match, ['away_totals', 'field_goal_percentage']));
        const homeFreethrow = (this.getNestedObject(Match, ['home_totals', 'free_throw_percentage']));
        const awayFreethrow = (this.getNestedObject(Match, ['away_totals', 'free_throw_percentage']));
        const homeMinutes = (this.getNestedObject(Match, ['home_totals', 'minutes']));
        const awayMinutes = (this.getNestedObject(Match, ['away_totals', 'minutes']));
        const homeFouls = (this.getNestedObject(Match, ['home_totals', 'personal_fouls']));
        const awayFouls = (this.getNestedObject(Match, ['away_totals', 'personal_fouls']));
        const homePoints = (this.getNestedObject(Match, ['home_totals', 'points']));
        const awayPoints = (this.getNestedObject(Match, ['away_totals', 'points']));
        const homeThreepoint = (this.getNestedObject(Match, ['home_totals', 'three_point_field_goals_made']));
        const awayThreepoint = (this.getNestedObject(Match, ['away_totals', 'three_point_field_goals_made']));
        const homeTurnover = (this.getNestedObject(Match, ['home_totals', 'turnovers']));
        const awayTurnover = (this.getNestedObject(Match, ['away_totals', 'turnovers']));

        // event info   
        const attendance = (this.getNestedObject(Match, ['event_information', 'attendance']));
        const duration = (this.getNestedObject(Match, ['event_information', 'duration']));
        const season_type = (this.getNestedObject(Match, ['event_information', 'season_type']));
        const start_date_time = (this.getNestedObject(Match, ['event_information', 'start_date_time']));

        return (
            <View style={{ flex: 1, backgroundColor: "#000", paddingTop: 10, paddingBottom: 20 }}>
                <View style={{ justifyContent: 'center', display: 'flex', paddingVertical: 10 }}>
                    <Text category="s2" style={{ width: '100%', textAlign: 'center', fontFamily: 'AvenirNext-DemiBold', color: '#ededed' }}>Team Comparison</Text>
                    <Ionicons name="ios-arrow-down" size={22} color='#fff' style={{ width: '100%', textAlign: 'center' }} />
                </View>
                <View style={{ padding: 15, marginVertical: 0 }}>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 12 }}>
                        <Text category="h4" style={{ fontFamily: 'AvenirNext-Bold', color: '#fff' }}>{home_team_nick}</Text>
                        <Text category="h4" style={{ fontFamily: 'AvenirNext-Bold', color: '#fff' }}>{away_team_nick}</Text>
                    </View>

                    {/* points section */}
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginVertical: 10, width: '33.33%' }}>
                            <Text category="s1" style={styles.comparison}>{homeAssists}</Text>
                            <Text category="s1" style={styles.comparison}>{homeBlocks}</Text>
                            <Text category="s1" style={styles.comparison}>{homeRebounds}</Text>
                            <Text category="s1" style={styles.comparison}>{homeFieldgoal * 100}%</Text>
                            <Text category="s1" style={styles.comparison}>{homeFreethrow * 100}%</Text>
                            <Text category="s1" style={styles.comparison}>{homeMinutes}</Text>
                            <Text category="s1" style={styles.comparison}>{homeFouls}</Text>
                            <Text category="s1" style={styles.comparison}>{homeThreepoint}</Text>
                            <Text category="s1" style={styles.comparison}>{homeTurnover}</Text>
                            <Text category="s1" style={styles.comparison}>{homePoints}</Text>
                        </View>
                        <View style={{ width: '33.33%', marginVertical: 10, }}>
                            <Text category="s1" style={styles.stats}>Assists</Text>
                            <Text category="s1" style={styles.stats}>Blocks</Text>
                            <Text category="s1" style={styles.stats}>Rebounds</Text>
                            <Text category="s1" style={styles.stats}>Field Goals %</Text>
                            <Text category="s1" style={styles.stats}>Free Throws %</Text>
                            <Text category="s1" style={styles.stats}>Minutes</Text>
                            <Text category="s1" style={styles.stats}>Fouls</Text>
                            <Text category="s1" style={styles.stats}>Three Pointers</Text>
                            <Text category="s1" style={styles.stats}>Turnover</Text>
                            <Text category="s1" style={styles.stats}>Points</Text>
                        </View>
                        <View style={{ marginVertical: 10, width: '33.33%' }}>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayAssists}</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayBlocks}</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayRebounds}</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayFieldgoal * 100}%</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayFreethrow * 100}%</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayMinutes}</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayFouls}</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayThreepoint}</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayTurnover}</Text>
                            <Text category="s1" style={[styles.comparison, { textAlign: 'right' }]}>{awayPoints}</Text>
                        </View>
                    </View>

                    {/* EVENT */}
                    <View style={{ marginTop: 18 }}>
                        <Text category="h4" style={{ fontFamily: 'AvenirNext-Bold', color: '#fff' }}>Event Info</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ marginVertical: 10, width: '40%' }}>
                                <Text category="s1" style={[styles.comparison, { fontSize: 18 }]}>Attendance</Text>
                                <Text category="s1" style={[styles.comparison, { fontSize: 18 }]}>Duration</Text>
                                <Text category="s1" style={[styles.comparison, { fontSize: 18 }]}>Season Type</Text>
                                <Text category="s1" style={[styles.comparison, { fontSize: 18 }]}>Date</Text>
                            </View>
                            <View style={{ width: '60%', marginVertical: 10, }}>
                                <Text category="s1" style={[styles.stats, { fontSize: 18, textAlign: 'left' }]}>{attendance}</Text>
                                <Text category="s1" style={[styles.stats, { fontSize: 18, textAlign: 'left' }]}>{duration}</Text>
                                <Text category="s1" style={[styles.stats, { fontSize: 18, textAlign: 'left' }]}>{season_type}</Text>
                                <Text category="s1" style={[styles.stats, { fontSize: 18, textAlign: 'left' }]}>{Moment(start_date_time).format('YYYY-MM-DD')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{
                        backgroundColor: `#000`,
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
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            flexWrap: 'nowrap'
                        }}>

                            {this.renderContent(params)}
                            {this.renderComparison(params)}
                        </View>
                    </ScrollView>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    scoreCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    cardBox: {
        flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -30, zIndex: 2
    },
    cardContainer: {
        position: 'relative',
        textAlign: 'center',
        zIndex: 2,
        paddingVertical: 20,
        paddingHorizontal: 15,
        width: '100%',
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
        fontFamily: 'AvenirNext-Bold',
        fontSize: 22,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    comparison: {
        fontWeight: '600',
        paddingVertical: 5,
        fontSize: 16,
        fontFamily: 'AvenirNext-DemiBold',
        color: '#fff',

    },
    stats: {
        fontWeight: '400',
        paddingVertical: 5,
        fontSize: 16,
        fontFamily: 'AvenirNext-DemiBold',
        textAlign: 'center',
        fontFamily: 'AvenirNext-DemiBold',
        color: '#ededed'
    }
})


export default Match;
