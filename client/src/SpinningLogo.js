import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const SpinningLogo = (props) => {
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        setShowLogo(true);
    }, [showLogo]);

    if (showLogo) {
        return <img src={logo} className="App-logo" alt="logo" />;
    }
    return null;
};
export default SpinningLogo;