import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { Layout, Text, Button, Avatar, AvatarProps, } from 'react-native-ui-kitten';
import Moment from 'moment';
import { connect } from 'react-redux';
import { getNews } from '../../store/actions/news_actions';
// importing icons
import Ionicons from '../../../node_modules/react-native-vector-icons/Ionicons';
import MaterialIcons from '../../../node_modules/react-native-vector-icons/MaterialIcons';

class ArticleComponent extends Component {

    componentDidMount() {
        this.props.dispatch(getNews());
    }

    // static navigationOptions = {
    //     title: 'ARTICLE',
    //     headerTitleStyle: {
    //         fontFamily: 'AvenirNext-Heavy',
    //         fontSize: 22,
    //     },
    // }

    renderSimilarArticles = (news) => {
        return (
            news.articles ?
                news.articles.map((item, i) => (
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Article', {
                            ...item
                        })}
                        key={i}
                    >

                        <View style={styles.cardContainer}>
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

    formatText(content) {
        const text = content.replace(/<p>/g, "").replace(/<\/p>/g, "");
        return text;
    }

    render() {
        const params = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1 }}>
                <Image
                    style={{ height: 220, backgroundColor: "transparent" }}
                    source={{ uri: params.image }}
                    resizeMode="cover"
                />
                <View style={{ backgroundColor: "transparent" }}>
                    <Avatar source={{ uri: `${params.logo}` }} shape='round' size='giant' style={styles.avatar} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.articleContainer}>
                        <Text category="h5" style={{ fontFamily: 'AvenirNext-Bold' }}>{params.title}</Text>
                        <Text category="c1" style={{ marginTop: 10, fontFamily: 'AvenirNext-DemiBold' }}>{this.formatText(params.content)}</Text>
                        <View style={styles.cardBottomSection}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Ionicons name='ios-calendar' size={20} color="#0f0f0f" style={{ paddingTop: 10 }} />
                                <Text container="c2" style={{ paddingTop: 10, paddingLeft: 10, fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{Moment(params.date).format('Do MMMM YY')}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
                                <MaterialIcons name='chat-bubble-outline' size={20} color="black" />
                                <Text style={{ paddingLeft: 5, paddingRight: 5, marginRight: 8, fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{params.comments}</Text>
                                <Ionicons name='ios-heart' size={20} color="red" />
                                <Text style={{ paddingLeft: 5, paddingRight: 5, fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{params.likes}</Text>
                            </View>

                        </View>
                        <View style={{ width: '90%', height: 1, margin: 15, backgroundColor: '#cecece' }}></View>
                        <Text category='h5' style={{ fontFamily: 'AvenirNext-Bold' }}>Similar Posts</Text>
                        <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.renderSimilarArticles(this.props.News)}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    cardContainer: {
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
    }
})

function mapStateToProps(state) {
    return {
        News: state.News
    }
}



export default connect(mapStateToProps)(ArticleComponent);
