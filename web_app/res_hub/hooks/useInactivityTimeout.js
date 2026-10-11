import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../lib/supabase";
import { clearTimeStamp, setTimeStamp } from "../redux/inactivity";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; 

export const useInactivityTimeout = () => {
    const dispatch = useDispatch();
    const lastActiveTimeStamp = useSelector((state) => state.inactivity.timeStamp);

    const handleLogout = useCallback(async () => {
        dispatch(clearTimeStamp());
        await supabase.auth.signOut();
        window.location.href = '/login';
    }, [dispatch]);

    useEffect(() => {

        const checkInactivity = () => {
            const lastActive = parseInt(lastActiveTimeStamp || '0', 10);

            if (lastActive && Date.now() - lastActive > INACTIVITY_TIMEOUT) {
                handleLogout();
            }

            console.log("checking inactivity!!")
        };

       
        checkInactivity();

        const updateActivity = () => {
            dispatch(setTimeStamp(Date.now().toString()));
        };

        
        if (!lastActiveTimeStamp) {
            updateActivity();
        }

        
        const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
        events.forEach((event) => window.addEventListener(event, updateActivity, { passive: true }));

        
        const interval = setInterval(checkInactivity, 10000); 

        return () => {
            clearInterval(interval);
            events.forEach((event) => window.removeEventListener(event, updateActivity));
        };
    }, [lastActiveTimeStamp, dispatch, handleLogout]);
};

