import { makeAutoObservable, observable, runInAction } from 'mobx';
import { ClienteDTO } from '../classes/appClasses';
import axios from 'axios';
import * as yup from 'yup';
import { VALIDATION_STRINGS } from '../messages/appMessages';
import useNotifications from '../utils/useNotifications';
import { renderToString } from 'react-dom/server';

import.meta.env.VITE_API_URL;

class ClienteStore {
    totalPages = 0;
    pageNumber = 0;
    pageSize = 5;
    cliente: ClienteDTO = {
        idCliente: 0,
        nombre: '',
        apellido: '',
        documento: '',
        tipo: 0
    }
    clientes: ClienteDTO[] = [];
    select: ClienteDTO[] = [];
    consultarApi: boolean = false;
    isValid: boolean = false;
    isLoading: boolean = false;
    focusInput: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            cliente: observable,
            consultarApi: observable,
            isLoading: observable,
            focusInput: observable
        });
    }

    clienteInicial: ClienteDTO = {
        idCliente: 0,
        nombre: '',
        apellido: '',
        documento: '',
        tipo: 0
    };

    limpiar = () => {
        this.setCliente(this.clienteInicial);
    };

    setCliente(cliente: ClienteDTO) {
        this.cliente = cliente;
    }

    setClientes(clientes: ClienteDTO[]) {
        this.clientes = clientes;
    }

    setSelect(select: ClienteDTO[]) {
        this.select = select;
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
        apellido: yup.string()
            .required(VALIDATION_STRINGS.apellidoRequired)
            .min(2, VALIDATION_STRINGS.apellidoMinLength)
            .max(50, VALIDATION_STRINGS.apellidoMaxLength),
        tipo: yup.number().oneOf([0]).required(VALIDATION_STRINGS.tipoDocumentoRequired),
        documento: yup.string()
            .matches(/^[0-9]+$/, VALIDATION_STRINGS.documentoInvalido)
            .length(11, VALIDATION_STRINGS.cedulaLength)
            .required(VALIDATION_STRINGS.cedulaRequired)
    });

    validateCliente() {
        try {
            this.validationSchema.validateSync(this.cliente, { abortEarly: false });
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

    async listar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/clientes/listar`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setSelect(data);

            runInAction(() => {
                this.setSelect(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async listarPaginado(pageNumber: number, pageSize: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/clientes?pageNumber=${pageNumber}&pageSize=${pageSize}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setClientes(data.content);
            this.setTotalPages(data.totalPages);

            runInAction(() => {
                this.setClientes(data.content);
                this.setTotalPages(data.totalPages);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async buscarPorId(id: number): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/clientes/${id}`;

        await axios.get(url).then(resp => {
            const data = resp.data;
            this.setCliente(data);

            runInAction(() => {
                this.setCliente(data);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    async guardar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/clientes`;

        try {
            await axios.post(url, this.cliente);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            useNotifications(VALIDATION_STRINGS.validationError, error.response.data, 'error');
            throw error;
        }
    }

    async actualizar(): Promise<void> {
        const url = `${import.meta.env.VITE_API_URL}/clientes/${this.cliente.idCliente}`;

        try {
            await axios.put(url, this.cliente);

            this.limpiar();
            await this.listarPaginado(this.pageNumber, this.pageSize);
        } catch (error: any) {
            useNotifications(VALIDATION_STRINGS.validationError, error.response.data, 'error');
            throw error;
        }
    }
}

const clienteStore = new ClienteStore();
export default clienteStore;