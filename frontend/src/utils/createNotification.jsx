import Swal from "sweetalert2";


export const createNotification = (options) => {
    // Eğer options içinde timer yoksa, default olarak 3000 ms'yi kullan
    const timerValue = options.timer || 3000;

    return Swal.fire({
        ...options,
        background: '#313131',
        color: 'white',
        timer: timerValue, // Burada timer değeri parametreye veya default'a ayarlanacak
    });
};


export const createNotificationForTimeout = (options) => {
    const { timer = 5000, countdownStart = 15, onTimeout } = options; // countdownStart => başlangıçta 15 saniyeyi al
    let remainingTime = countdownStart;

    const timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime -= 1; // Geriye sayma
        }
    }, 1000);

    return Swal.fire({
        title: 'Zaman bitiyor...',
        text: `Kalan süre: ${remainingTime} saniye`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Ana sayfaya git',
        confirmButtonText: 'Evet, devam et',
        background: '#313131',
        color: 'white',
        timer: timer, // 5 saniyelik geri sayım
        timerProgressBar: true,
        didClose: () => {
            clearInterval(timerInterval); // Interval'ı temizle
            if (remainingTime === 0) {
                onTimeout(); // Zaman dolarsa onTimeout çağır
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            onTimeout(); // Eğer "Evet, devam et" butonuna tıklarsa
        }
    });
};