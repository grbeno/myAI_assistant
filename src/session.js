import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logout from './logout';

// call cookie age endpoint to get session age in seconds

const sessionAge = async () => {
    try {
        const response = await axios.get('/accounts/cookie_age/');
        console.log('response.data.cookie_age:', response.data['cookie_age']); 
        return response.data['cookie_age'];
    } catch (error) {
        console.error('Error checking session age:', error);
        return 0;
    }
};

// Convert seconds to mm:ss time format

const formatTime = (seconds) => {
    var mins = Math.floor(seconds / 60)
    var secs = seconds % 60
    return (mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0'))
}

const sessionTimer = () => {

    //const cookieAge = sessionAge();
    //const [time, setTime] = useState(cookieAge); // sessionAge() // 10

    const [time, setTime] = useState(null);

    useEffect(() => {
        const fetchSessionAge = async () => {
        const cookieAge = await sessionAge();
        setTime(cookieAge);
        localStorage.setItem('timer', cookieAge);
        };

        const storedTime = localStorage.getItem('timer');
        if (storedTime !== null) {
          setTime(parseInt(storedTime));
        } else {
          fetchSessionAge();
        }
    }, []);

    useEffect(() => {
        if (time !== null && time <= 0) {
            localStorage.removeItem('timer');
            logout();
            window.location.reload();
        } else {
            const timer = setInterval(() => {
                setTime(prevTime => {
                    const updatedTime = prevTime - 1;
                    localStorage.setItem('timer', updatedTime.toString());
                    return updatedTime;
                });
            }, 1000);
            // Clean up the interval when the component unmounts
            return () => clearInterval(timer);
        }
        }, [time]);

        /* if (time === null) {
            return null; // or some loading state
          } */
      
    console.log(time);

    return formatTime(time);

};

export default sessionTimer;

