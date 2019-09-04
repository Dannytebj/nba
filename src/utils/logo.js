import React from 'react';
import { Image } from 'react-native';
import Logo from '../assets/images/nba_login_logo.png';

const LogoComponent = () => (
    <Image
        source={Logo}
        style={{ width: 70, height: 35 }}
        resizeMode="contain"
    />
    )

export default LogoComponent
