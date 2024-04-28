import { makeAutoObservable, observable, runInAction } from 'mobx';
import { MonedaDTO } from '../classes/appClasses';
import axios from 'axios';
import * as yup from 'yup';
import { VALIDATION_STRINGS } from '../messages/appMessages';
import useNotifications from '../utils/useNotifications';
import { renderToString } from 'react-dom/server';

import.meta.env.VITE_API_URL;

class MonedaStore {
    totalPages = 0;
    pageNumber = 0;
    pageSize = 5;
    moneda: MonedaDTO = {
        idMoneda: 0,
        nombre: '',
        codigo: ''
    }
    monedas: MonedaDTO[] = [];
    consultarApi: boolean = false;
    isValid: boolean = false;
    isLoading: boolean = false;
    focusInput: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            moneda: observable,
            consultarApi: observable,
            isLoading: observable,
            focusInput: observable
        });
    }

    monedaInicial: MonedaDTO = {
        idMoneda: 0,
        nombre: '',
        codigo: ''
    };

    limpiar = () => {
        this.setMoneda(this.monedaInicial);
    };

    setMoneda(moneda: MonedaDTO) {
        this.moneda = moneda;
    }

    setMonedas(monedas: MonedaDTO[]) {
        this.monedas = monedas;
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
        nombre: yup.string()
            .required(VALIDATION_STRINGS.nombreRequired)
            .min(2, VALIDATION_STRINGS.nombreMinLength)
            .max(50, VALIDATION_STRINGS.nombreMaxLength),
        codigo: yup.string()
            .required(VALIDATION_STRINGS.codigoRequired)
            .min(3, VALIDATION_STRINGS.codigoMinLength)
            .max(3, VALIDATION_STRINGS.codigoMaxLength)
    });

    validateMoneda() {
        try {
            this.validationSchema.validateSync(this.moneda, { abortEarly: false });
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
        const url = `${import.meta.env.VITE_API_URL}/monedas?pageNumber=${pageNumber}&pageSize=${pageSize}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setMonedas(data.content);
            this.setTotalPages(data.totalPages);

            runInAction(() => {
                this.setMonedas(data.content);
                this.setTotalPages(data.totalPages);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async buscarPorId(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/monedas/${id}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setMoneda(data);

            runInAction(() => {
                this.setMoneda(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async guardar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/monedas`;

        try {
            await axios.post(url, this.moneda);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            useNotifications(VALIDATION_STRINGS.validationError, error.response.data, 'error');
            throw error;
        }
    }

    async actualizar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/monedas/${this.moneda.idMoneda}`;

        try {
            await axios.put(url, this.moneda);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            useNotifications(VALIDATION_STRINGS.validationError, error.response.data, 'error');
            throw error;
        }
    }
}

const monedaStore = new MonedaStore();
export default monedaStore;