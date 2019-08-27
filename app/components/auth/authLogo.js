import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/images/nba_login_logo.png';

const LogoComponent = () => {
    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={Logo}
                resizeMode={'contain'}
                style={{
                    width: 170,
                    height: 150,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default LogoComponent
