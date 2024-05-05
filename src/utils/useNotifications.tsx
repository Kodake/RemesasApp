import Swal, { SweetAlertIcon } from 'sweetalert2';

const useNotifications = (title: string, detail: string | HTMLElement | JQuery | undefined, icon: SweetAlertIcon) => {
    return (
        Swal.fire({
            title: `${title}`,
            html: `${detail}`,
            icon: `${icon}`,
            confirmButtonColor: '#3085d6',
            allowOutsideClick: true
        })
    )
}

export default useNotifications;