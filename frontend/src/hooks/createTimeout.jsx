import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../utils/showMessage";

export const useTimeout = (time) => {
    const navigate = useNavigate();
    const [timeoutEndFlag, setTimeoutEndFlag] = useState(false);
    const [timeoutStartFlag, setTimeoutStartFlag] = useState(false);
    const [choosedContinueFlag, setChoosedContinueFlag] = useState(false);
    const startTimeout = () => {
        setTimeoutStartFlag(true);
    };

    useEffect(() => {
        if (timeoutStartFlag) {
            var timeout = setTimeout(() => {
                setTimeoutStartFlag(false);
                setTimeoutEndFlag(true);
            }, time);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [timeoutStartFlag, time, choosedContinueFlag]);

    const wantToContinue = async () => {

        const buttonResult = await showMessage({
            title: "Devam etmek ister misiniz?",
            text: `İşleminiz ${15} saniye sonra otomatik iptal edilecek.`,
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "İptal",
            confirmButtonText: "Devam",
            timer: 15 * 1000,
            timerProgressBar: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
        });

        if (buttonResult.isConfirmed) {
            console.log("Devam edildi");
            setChoosedContinueFlag(true);
            setTimeoutEndFlag(false);
            startTimeout();
        }

        else if (buttonResult.isDismissed) {
            console.log("İptal edildi");
            navigate("/");
        }

    };

    useEffect(() => {
        if (timeoutEndFlag && !choosedContinueFlag) {
            console.log('bura calisti')
            wantToContinue();
        } else if (timeoutEndFlag && choosedContinueFlag) {
            showMessage({
                title: "Zaman Aşımına Uğradı!",
                icon: "error",
                showConfirmButton: false,
            })
            navigate("/");
        }
    }, [timeoutEndFlag]);

    return { startTimeout, timeoutEndFlag, wantToContinue };
};
