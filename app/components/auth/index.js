import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    ActivityIndicator, ImageBackground
} from 'react-native';

import AuthLogo from './authLogo';
import AuthForm from './authForm';

import Splash from '../../assets/images/splash.jpg';
import { connect } from 'react-redux';
import { autoSignIn } from '../../store/actions/user_actions';
import { bindActionCreators } from 'redux';

import { getTokens, setTokens } from '../../utils/misc';


class Auth extends Component {
    state = {
        loading: true
    }

    static navigationOptions = {
        header: null,
    };

    goNext = () => {
        this.props.navigation.navigate('App');
    }

    componentDidMount() {
        getTokens((value) => {
            if (value[0][1] === null) {
                this.setState({ loading: false })
            } else {
                this.props.autoSignIn(value[1][1]).then(() => {
                    if (!this.props.User.auth.token) {
                        this.setState({ loading: false })
                    } else {
                        setTokens(this.props.User.auth, () => {
                            this.goNext();
                        })
                    }
                })
            }
        })
    }
    render() {

        if (this.state.loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <ImageBackground
                    style={{ height: '100%', width: '100%' }}
                    source={Splash}
                    resizeMode='cover'
                >
                    <View style={styles.container}>
                        <View>
                            <AuthForm goNext={this.goNext} />
                        </View>

                    </View>
                </ImageBackground>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        padding: 20
    }, loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ autoSignIn }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
