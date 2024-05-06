import { useNavigate, useParams } from 'react-router-dom';
import useNotifications from '../utils/useNotifications';
import store from '../store/tasaStore';
import { useEffect } from 'react';
import { GetTasaDTO } from '../classes/appClasses';
import Swal from 'sweetalert2';

const useTasas = () => {
    let nav = useNavigate();

    const buscarPorId = () => {
        const { id } = useParams();

        useEffect(() => {
            if (id !== undefined) {
                store.buscarPorId(parseInt(id));
            }
        }, []);
    }

    const listarTasas = () => {
        useEffect(() => {
            store.listar();
        }, []);
    }

    const cargarListaPaginada = () => {
        useEffect(() => {
            store.listarPaginado(store.pageNumber, store.pageSize);
        }, [store.pageNumber, store.pageSize]);
    }

    const handleCalculate = (tasa: GetTasaDTO) => {
        Swal.fire({
            title: `1 ${tasa.monedaOrigen} = ${tasa.valor} ${tasa.monedaDestino}`,
            input: "number",
            inputAttributes: {
                autocapitalize: "off",
                autocomplete: "off",
                step: ".0001",
                min: '0.01'
            },
            showCancelButton: false,
            confirmButtonText: "Calcular",
            showLoaderOnConfirm: true,
            preConfirm: async (valor: number) => {
                try {
                    const resultado = valor * tasa.valor;
                    return resultado;
                } catch (error) {
                    Swal.showValidationMessage(`
                      Cálculo fallido: ${error}
                    `);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value} ${tasa.monedaDestino.split("-")[1]}`
                });
            }
        });
    }

    const handleInputTasa = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setTasa({ ...store.tasa, [name]: value });
    };

    const handleInputMoneda = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        store.setTasa({ ...store.tasa, [name]: value });
    };

    const handleSaveTasa = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateTasa()) {
            return;
        }
        const moneda = await store.guardar();
        if (moneda === null) {
            return;
        }
        nav('/tasas');
        useNotifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    const handleUpdateTasa = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateTasa()) {
            return;
        }
        const moneda = await store.actualizar();
        if (moneda === null) {
            return;
        }
        nav('/tasas');
        useNotifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    const handleClearTasa = () => {
        store.limpiar();
    }

    return {
        buscarPorId,
        listarTasas,
        cargarListaPaginada,
        handleInputTasa,
        handleInputMoneda,
        handleSaveTasa,
        handleUpdateTasa,
        handleCalculate,
        handlePageChange,
        handleClearTasa
    }
}

export default useTasas;