import { useNavigate } from 'react-router-dom';
import useNotifications from '../utils/useNotifications';
import store from '../store/clienteStore';

const useClientes = () => {
    let nav = useNavigate();

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
        nav('/');
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
        nav('/');
        useNotifications('Guardado', 'El registro ha sido actualizado satisfactoriamente.', 'success');
    };

    const handlePageChange = (page: number) => {
        store.setCurrentPage(page);
    };

    return {
        handleInputCliente,
        handleInputTipoDocumento,
        handleSaveCliente,
        handleUpdateCliente,
        handlePageChange
    }
}

export default useClientes;