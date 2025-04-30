import Swal from "sweetalert2";

export const showMessage = (options) => {
    const timerValue = options.timer || 3000;

    return Swal.fire({
        ...options,
        background: '#313131',
        color: 'white',
        timer: timerValue,
        customClass: {
            timerProgressBar: 'my-custom-progress-bar',
        },
        confirmButtonColor: 'green',

    });
};
