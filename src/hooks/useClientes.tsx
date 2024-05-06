import { useNavigate, useParams } from 'react-router-dom';
import useNotifications from '../utils/useNotifications';
import store from '../store/clienteStore';
import { useEffect } from 'react';

const useClientes = () => {
    let nav = useNavigate();

    const listarClientes = () => {
        useEffect(() => {
            store.listar();
        }, []);
    }

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

    const handleInputCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        store.setCliente({ ...store.cliente, [name]: value });
    };

    const handleInputTipoDocumento = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        store.setCliente({ ...store.cliente, [name]: value });
    };

    const handleSaveCliente = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateCliente()) {
            return;
        }
        const cliente = await store.guardar();
        if (cliente === null) {
            return;
        }
        nav('/clientes');
        useNotifications('Guardado', 'El registro ha sido guardado satisfactoriamente.', 'success');
    };

    const handleUpdateCliente = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!store.validateCliente()) {
            return;
        }
        const cliente = await store.actualizar();
        if (cliente === null) {
            return;
        }
        nav('/clientes');
        useNotifications('Guardado', 'El registro ha sido actualizado satisfactoriamente.', 'success');
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    const handleClearCliente = () => {
        store.limpiar();
    }

    return {
        listarClientes,
        buscarPorId,
        cargarListaPaginada,
        handleInputCliente,
        handleInputTipoDocumento,
        handleSaveCliente,
        handleUpdateCliente,
        handlePageChange,
        handleClearCliente
    }
}

export default useClientes;