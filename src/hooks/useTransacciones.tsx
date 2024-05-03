import { useEffect } from "react";
import store from '../store/transaccionStore';
import useNotifications from "../utils/useNotifications";
import Swal from "sweetalert2";

const useTransacciones = () => {
    const cargarListaPaginada = () => {
        useEffect(() => {
            store.listarPaginado(store.pageNumber, store.pageSize);
        }, [store.pageNumber, store.pageSize]);
    }

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    const handleClipboard = (codigo: string) => {
        navigator.clipboard.writeText(codigo).then(() => {
            useNotifications('Código copiado', 'Código de envío copiado en el portapapeles', 'success');
        }).catch((error) => {
            console.error('Error copying to clipboard:', error);
        });
    }

    const handleRequestCodigo = () => {
        Swal.fire({
            title: `Introduzca un código de envío válido`,
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                autocomplete: "off"
            },
            showCancelButton: false,
            confirmButtonText: "Ok",
            showLoaderOnConfirm: true,
            preConfirm: async (valor) => {
                try {
                    var resultado = valor;
                    return resultado;
                } catch (error) {
                    Swal.showValidationMessage(`
                      Código de envío fallido: ${error}
                    `);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                store.buscarPorCodigo(result.value);
            }
        });
    }

    return {
        cargarListaPaginada,
        handlePageChange,
        handleClipboard,
        handleRequestCodigo
    }
}

export default useTransacciones;