import React from 'react'
import { View, Image } from 'react-native';
import LogoImg from '../assets/images/nba_login_logo.png';

const LogoTitle = () => {
    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={LogoImg}
                resizeMode={'contain'}
                style={{
                    width: 70,
                    height: 35,
                }}
            />
        </View>
    )
}


export default LogoTitle;
