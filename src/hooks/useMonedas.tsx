import { useNavigate } from 'react-router-dom';
import useNotifications from '../utils/useNotifications';
import store from '../store/monedaStore';

const useMonedas = () => {
    let nav = useNavigate();

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
        handleInputMoneda,
        handleSaveMoneda,
        handleUpdateMoneda,
        handlePageChange
    }
}

export default useMonedas;