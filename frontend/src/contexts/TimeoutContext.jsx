import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createNotification, createNotificationForTimeout } from "../utils/createNotification";

const TimeoutContext = createContext();

export const TimeoutProvider = ({ children, timeoutDuration = 60000 }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const allowedRoutes = ["/process-options", "/card-reader", "/credit-loader", "/credit-card-reader", "/bill-preference"]; // Timeout'un aktif olacağı sayfalar
    const isTimeoutActive = allowedRoutes.includes(location.pathname);

    const timerRef = useRef(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (isTimeoutActive) {
            console.log("Timer başlatılıyor...");
            timerRef.current = setTimeout(async () => {
                console.log("Zaman doldu!");

                // SweetAlert ile bildirim göster
                await createNotificationForTimeout({
                    timer: 5000,
                    countdownStart: 15,  // Son 15 saniye
                    onTimeout: () => {
                        // Zaman dolarsa ana sayfaya git
                        navigate("/");
                    }
                });
            }, timeoutDuration);
        }
    }, [isTimeoutActive, timeoutDuration, location.pathname, navigate]);

    useEffect(() => {
        resetTimer();

        const handleUserActivity = () => resetTimer();
        const events = ["mousemove", "keydown", "click"];

        events.forEach(event => window.addEventListener(event, handleUserActivity));

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach(event => window.removeEventListener(event, handleUserActivity));
        };
    }, [resetTimer]);

    const extendSession = () => resetTimer();
    const goToHome = () => {
        console.log("zaman doldu");
        navigate("/");
    };

    return (
        <TimeoutContext.Provider value={{ extendSession, goToHome }}>
            {children}
        </TimeoutContext.Provider>
    );
};

export const useTimeout = () => useContext(TimeoutContext);
