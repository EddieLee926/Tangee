import React from 'react';
import HeaderContentType1 from './HeaderContentType1';
import HeaderContentType2 from './HeaderContentType2';

const HeaderContent = ({ isLogIn }) => {
    return isLogIn ? <HeaderContentType2 /> : <HeaderContentType1 />;
};

export default HeaderContent;
