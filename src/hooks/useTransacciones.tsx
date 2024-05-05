import { useEffect } from "react";
import store from '../store/transaccionStore';
import monedaStore from '../store/monedaStore';
import tasaStore from "../store/tasaStore";
import useNotifications from "../utils/useNotifications";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { GetTasaDTO, GetTransaccionDTO, MonedaDTO } from "../classes/appClasses";

const useTransacciones = () => {
    let monedaDTO: MonedaDTO | undefined;
    monedaDTO = monedaStore.select.find(moneda => moneda.idMoneda === Number(store.transaccion.moneda));

    let nav = useNavigate();

    const cargarListaPaginada = () => {
        useEffect(() => {
            store.listarPaginado(store.pageNumber, store.pageSize);
        }, [store.pageNumber, store.pageSize]);
    }

    const buscarPorCodigo = () => {
        const { codigo } = useParams();

        useEffect(() => {
            if (codigo !== undefined) {
                store.buscarPorCodigo(codigo);
            }
        }, []);
    }

    const handleInputCliente = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        store.setTransaccion({ ...store.transaccion, [name]: value });
    };

    const handleInputMoneda = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        store.setTransaccion({ ...store.transaccion, [name]: value });
    };

    const handleInputTransaccion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setTransaccion({ ...store.transaccion, [name]: value });
    };

    const handleSaveTransaccion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!store.validateTransaccion()) {
            return;
        }

        Swal.fire({
            title: `¿Está seguro que desea enviar ${store.transaccion.cantidad} ${monedaDTO?.nombre} - ${monedaDTO?.codigo}?`,
            text: "No podrá revertir esta transacción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, enviar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const transaccion = await store.guardar();
                if (transaccion === null) {
                    return;
                }

                nav('/');

                useNotifications('Enviado', 'Su transacción ha sido realizada satisfactoriamente', 'success');
            }
        });
    };

    const handleUpdateTransaccion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!store.validateTransaccion()) {
            return;
        }

        Swal.fire({
            title: `¿Está seguro que desea retirar ${store.transaccion.cantidad} ${monedaDTO?.nombre} - ${monedaDTO?.codigo}?`,
            text: "El retiro es en base a las informaciones correspondientes",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, retirar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const transaccion = await store.actualizar();
                if (transaccion === null) {
                    return;
                }

                nav('/');

                useNotifications('Retirado', 'El retiro ha sido realizado satisfactoriamente', 'success');
            }
        });
    };

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

    const handleClearTransaccion = () => {
        store.limpiar();
    }

    const handleRequestExchange = async (transaccion: GetTransaccionDTO) => {
        try {
            const tasas = tasaStore.select;

            const inputOptions = tasas
                .filter(tasa => tasa.monedaOrigen.includes(transaccion.moneda))
                .reduce((options, tasa) => {
                    options[tasa.idTasa] = `${tasa.monedaOrigen.split("-")[1]} a ${tasa.monedaDestino.split("-")[1]} = ${tasa.valor}`;
                    return options;
                }, {} as { [key: number]: string });

            const resultado = await Swal.fire({
                title: "Cambiar moneda de envío",
                input: "select",
                inputOptions,
                inputPlaceholder: "Seleccione una moneda",
                showCancelButton: true,
                confirmButtonText: "Ok",
                showLoaderOnConfirm: true,
                preConfirm: async (moneda) => {
                    let tasaDTO: GetTasaDTO | undefined;
                    tasaDTO = tasaStore.select.find(tasa => tasa.idTasa === Number(moneda));
                    store.buscarPorCodigo(transaccion.codigo);
                    return tasaDTO;
                },
                allowOutsideClick: () => !Swal.isLoading()
            });

            if (resultado.isConfirmed) {
                let calculo = resultado.value.valor * transaccion.cantidad;
                let moneda = monedaStore.select.find(moneda => moneda.codigo.includes(resultado.value.monedaDestino.split("-")[1].trim()))?.idMoneda;

                Swal.fire({
                    title: `¿Está seguro que desea intercambiar ${transaccion.cantidad} ${transaccion.moneda} x ${resultado.value.valor} ${resultado.value.monedaDestino.split("-")[1]} = ${calculo} ${resultado.value.monedaDestino}?`,
                    text: "El intercambio de remesa se realizará en base a la selección de la moneda",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, intercambiar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const transaccion = await store.intercambiar(calculo, moneda!);
                        if (transaccion === null) {
                            return;
                        }

                        nav('/');

                        useNotifications('Intercambio', 'El cambio de remesa ha sido realizado satisfactoriamente', 'success');
                    }
                });
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    const handleRequestCodigo = async () => {
        try {
            const resultado = await Swal.fire({
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
                    return valor;
                },
                allowOutsideClick: () => !Swal.isLoading()
            });

            if (resultado.isConfirmed) {
                const data = await store.buscarPorCodigo(resultado.value);
                nav(`/transacciones/retiros/${data.codigo}`);
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    const truncateCode = (codigo: string) => {
        return `${codigo.substring(0, 8)}...`;
    };

    return {
        buscarPorCodigo,
        cargarListaPaginada,
        handleInputCliente,
        handleInputMoneda,
        handleInputTransaccion,
        handleSaveTransaccion,
        handleUpdateTransaccion,
        handleRequestExchange,
        handlePageChange,
        handleClipboard,
        handleRequestCodigo,
        handleClearTransaccion,
        truncateCode
    }
}

export default useTransacciones;