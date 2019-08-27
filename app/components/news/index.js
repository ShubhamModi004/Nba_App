import React, { Component, Fragment } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { Layout, Text, Button, Avatar, AvatarProps, } from 'react-native-ui-kitten';
import Moment from 'moment';
import { connect } from 'react-redux';
import { getNews } from '../../store/actions/news_actions';

// importting icons
import Ionicons from '../../../node_modules/react-native-vector-icons/Ionicons';
import MaterialIcons from '../../../node_modules/react-native-vector-icons/MaterialIcons';



class News extends Component {
    componentDidMount() {
        this.props.dispatch(getNews());
    }
    static navigationOptions = {
        title: 'NEWS',
        headerTitleStyle: {
            fontFamily: 'AvenirNext-Heavy',
            fontSize: 22,
        },
    }

    renderArticle = (news) => (
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
                                style={{ height: 200, justifyContent: 'space-around' }}
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
                                    <View style={{ flex: 1 }}></View>
                                </Layout>
                                <View style={styles.overlay} />
                            </ImageBackground>
                            <View style={styles.cardBottom}>
                                <View style={styles.cardBottomSection}>
                                    <View style={{ display: 'flex', flexDirection: 'row', fontFamily: 'AvenirNext-DemiBold' }}>
                                        <Avatar source={{ uri: `${item.logo}` }} shape='round' size='medium' style={styles.avatar} />
                                        <Text container="c2" style={{ paddingTop: 10, paddingLeft: 10, fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{Moment(item.date).format('Do MMMM YY')}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
                                        <MaterialIcons name='chat-bubble-outline' size={20} color="black" />
                                        <Text style={{ paddingLeft: 5, paddingRight: 5, marginRight: 8, fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{item.comments}</Text>
                                        <Ionicons name='ios-heart' size={20} color="red" />
                                        <Text style={{ paddingLeft: 5, paddingRight: 5, fontSize: 12, fontFamily: 'AvenirNext-DemiBold' }}>{item.likes}</Text>
                                    </View>
                                </View>
                            </View>
                        </Layout>
                    </View>
                </TouchableOpacity>
            ))
            : null
    )

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {this.renderArticle(this.props.News)}
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0"
    },
    cardContainer: {
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#dddddd',
        shadowOffset: { width: 10, height: 30 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        overflow: 'hidden',
        height: 280,

    },
    avatar: {

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
    },
    header: {
        color: '#fff',
        paddingLeft: 20,
        zIndex: 2,
        paddingTop: 30,
        paddingBottom: 30,
        fontFamily: 'AvenirNext-Bold'
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




export default connect(mapStateToProps)(News);
