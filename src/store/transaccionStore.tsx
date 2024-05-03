import { makeAutoObservable, observable, runInAction } from 'mobx';
import { GetTransaccionDTO, TransaccionDTO } from '../classes/appClasses';
import axios from 'axios';
import * as yup from 'yup';
import { VALIDATION_STRINGS } from '../messages/appMessages';
import useNotifications from '../utils/useNotifications';
import { renderToString } from 'react-dom/server';

import.meta.env.VITE_API_URL;

class TransaccionStore {
    totalPages = 0;
    pageNumber = 0;
    pageSize = 10;
    transaccion: TransaccionDTO = {
        idTransaccion: 0,
        clienteOrigen: 0,
        clienteDestino: 0,
        moneda: 0,
        cantidad: 0,
        codigo: '',
        fecha: new Date(),
        retirado: false
    }
    transacciones: GetTransaccionDTO[] = [];
    consultarApi: boolean = false;
    isValid: boolean = false;
    isLoading: boolean = false;
    focusInput: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            transaccion: observable,
            consultarApi: observable,
            isLoading: observable,
            focusInput: observable
        });
    }

    transaccionInicial: TransaccionDTO = {
        idTransaccion: 0,
        clienteOrigen: 0,
        clienteDestino: 0,
        moneda: 0,
        cantidad: 0,
        codigo: '',
        fecha: new Date(),
        retirado: false
    };

    limpiar = () => {
        this.setTransaccion(this.transaccionInicial);
    };

    setTransaccion(transaccion: TransaccionDTO) {
        this.transaccion = transaccion;
    }

    setTransacciones(transacciones: GetTransaccionDTO[]) {
        this.transacciones = transacciones;
    }

    setIsValid(isValid: boolean) {
        this.isValid = isValid;
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    setFocusInput(focusInput: boolean) {
        this.focusInput = focusInput;
    }

    setTotalPages(totalPages: number) {
        this.totalPages = totalPages;
    }

    setCurrentPage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    validationSchema = yup.object().shape({
        monedaOrigen: yup.number()
            .required(VALIDATION_STRINGS.monedaOrigenRequired)
            .moreThan(0, VALIDATION_STRINGS.monedaOrigenMinLength),
        monedaDestino: yup.number()
            .required(VALIDATION_STRINGS.monedaDestinoRequired)
            .moreThan(0, VALIDATION_STRINGS.monedaDestinoMinLength),
        valor: yup.number()
            .required(VALIDATION_STRINGS.valorRequired)
            .moreThan(0, VALIDATION_STRINGS.valorMinLength)
    });

    validateTransaccion() {
        try {
            this.validationSchema.validateSync(this.transaccion, { abortEarly: false });
            return true;
        } catch (error) {
            runInAction(() => {
                const validationError = error as yup.ValidationError;
                const errorMessages = validationError.inner.map((e) => (
                    <li key={e.path} className='border-0 text-start'>{e.message}</li>
                ));
                const errorMessage = renderToString(<ul>{errorMessages}</ul>);
                useNotifications(VALIDATION_STRINGS.validationError, errorMessage, 'error');
            });
            return false;
        }
    }

    async listarPaginado(pageNumber: number, pageSize: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/transacciones?pageNumber=${pageNumber}&pageSize=${pageSize}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setTransacciones(data.content);
            this.setTotalPages(data.totalPages);

            runInAction(() => {
                this.setTransacciones(data.content);
                this.setTotalPages(data.totalPages);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async buscarPorCodigo(codigo: string): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/transacciones/${codigo}`;

        try {
            const resp = await axios.get(url);
            const data = resp.data;

            runInAction(() => {
                this.setTransaccion(data);
            });
        } catch (error: any) {
            useNotifications(VALIDATION_STRINGS.withdrawError, error.response.data, 'error');
            throw error;
        }
    }

    async guardar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/transacciones`;

        try {
            await axios.post(url, this.transaccion);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            useNotifications(VALIDATION_STRINGS.validationError, error.response.data, 'error');
            throw error;
        }
    }

    async actualizar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/transacciones/${this.transaccion.idTransaccion}`;

        try {
            await axios.put(url, this.transaccion);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            useNotifications(VALIDATION_STRINGS.validationError, error.response.data, 'error');
            throw error;
        }
    }
}

const transaccionStore = new TransaccionStore();
export default transaccionStore;