import React, { useEffect, useState } from 'react';
import axios from 'axios';

// call cookie age endpoint to get session age in seconds

/* const sessionAge = async () => {
    try {
        const response = await axios.get('/accounts/cookie_age/');
        console.log('response.data.cookie_age:', response.data['cookie_age']); 
        return response.data['cookie_age'];
    } catch (error) {
        console.error('Error checking session age:', error);
        return 0;
    }
}; */

// Convert seconds to mm:ss time format

const formatTime = (seconds) => {
    var mins = Math.floor(seconds / 60)
    var secs = seconds % 60
    return (mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0'))
}

const sessionTimer = () => {

    const [time, setTime] = useState(10); // sessionAge() // 10

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);
        // Clean up the interval when the component unmounts
        return () => clearInterval(timer);
        }, []);

    if (time <= 0) {
    // console.log('Time is up!');
    window.location.reload();
    }
      
    console.log(time);

    return formatTime(time);

};

export default sessionTimer;

