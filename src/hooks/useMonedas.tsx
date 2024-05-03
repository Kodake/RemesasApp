import { useNavigate, useParams } from 'react-router-dom';
import useNotifications from '../utils/useNotifications';
import store from '../store/monedaStore';
import { useEffect } from 'react';

const useMonedas = () => {
    let nav = useNavigate();

    const buscarPorId = () => {
        const { id } = useParams();

        useEffect(() => {
            if (id !== undefined) {
                store.buscarPorId(parseInt(id));
            }
        }, []);
    }

    const cargarListaPaginada = () => {
        useEffect(() => {
            store.listarPaginado(store.pageNumber, store.pageSize);
        }, [store.pageNumber, store.pageSize]);
    }

    const handleInputMoneda = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setMoneda({ ...store.moneda, [name]: value });
    };

    const handleSaveMoneda = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateMoneda()) {
            return;
        }
        const moneda = await store.guardar();
        if (moneda === null) {
            return;
        }
        nav('/');
        useNotifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    const handleUpdateMoneda = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateMoneda()) {
            return;
        }
        const moneda = await store.actualizar();
        if (moneda === null) {
            return;
        }
        nav('/');
        useNotifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    return {
        buscarPorId,
        cargarListaPaginada,
        handleInputMoneda,
        handleSaveMoneda,
        handleUpdateMoneda,
        handlePageChange
    }
}

export default useMonedas;