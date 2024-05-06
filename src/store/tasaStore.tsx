import { makeAutoObservable, observable, runInAction } from 'mobx'
import { GetTasaDTO, TasaDTO } from '../classes/appClasses'
import axios from 'axios'
import * as yup from 'yup'
import { VALIDATION_STRINGS } from '../messages/appMessages'
import useNotifications from '../utils/useNotifications'
import { renderToString } from 'react-dom/server'

import.meta.env.VITE_API_URL

class TasaStore {
  totalPages = 0
  pageNumber = 0
  pageSize = 5
  tasa: TasaDTO = {
    idTasa: 0,
    monedaOrigen: 0,
    monedaDestino: 0,
    valor: 0,
  }
  tasas: TasaDTO[] = []
  select: GetTasaDTO[] = []
  consultarApi: boolean = false
  isValid: boolean = false
  isLoading: boolean = false
  focusInput: boolean = false

  constructor() {
    makeAutoObservable(this, {
      tasa: observable,
      consultarApi: observable,
      isLoading: observable,
      focusInput: observable,
    })
  }

  tasaInicial: TasaDTO = {
    idTasa: 0,
    monedaOrigen: 0,
    monedaDestino: 0,
    valor: 0,
  }

  limpiar = () => {
    this.setTasa(this.tasaInicial)
  }

  setTasa(tasa: TasaDTO) {
    this.tasa = tasa
  }

  setTasas(tasas: TasaDTO[]) {
    this.tasas = tasas
  }

  setSelect(select: GetTasaDTO[]) {
    this.select = select
  }

  setIsValid(isValid: boolean) {
    this.isValid = isValid
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  setFocusInput(focusInput: boolean) {
    this.focusInput = focusInput
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages
  }

  setCurrentPage(pageNumber: number) {
    this.pageNumber = pageNumber
  }

  validationSchema = yup.object().shape({
    monedaOrigen: yup
      .number()
      .required(VALIDATION_STRINGS.monedaOrigenRequired)
      .moreThan(0, VALIDATION_STRINGS.monedaOrigenMinLength),
    monedaDestino: yup
      .number()
      .required(VALIDATION_STRINGS.monedaDestinoRequired)
      .moreThan(0, VALIDATION_STRINGS.monedaDestinoMinLength),
    valor: yup
      .number()
      .required(VALIDATION_STRINGS.valorRequired)
      .moreThan(0, VALIDATION_STRINGS.valorMinLength),
  })

  validateTasa() {
    try {
      this.validationSchema.validateSync(this.tasa, { abortEarly: false })
      return true
    } catch (error) {
      runInAction(() => {
        const validationError = error as yup.ValidationError
        const errorMessages = validationError.inner.map((e) => (
          <li key={e.path} className="border-0 text-start">
            {e.message}
          </li>
        ))
        const errorMessage = renderToString(<ul>{errorMessages}</ul>)
        useNotifications(
          VALIDATION_STRINGS.validationError,
          errorMessage,
          'error'
        )
      })
      return false
    }
  }

  async listar(): Promise<void> {
    const url = `${import.meta.env.VITE_API_URL}/tasas/listar`

    await axios
      .get(url)
      .then((resp) => {
        const data = resp.data
        this.setSelect(data)

        runInAction(() => {
          this.setSelect(data)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async listarPaginado(pageNumber: number, pageSize: number): Promise<void> {
    const url = `${import.meta.env.VITE_API_URL}/tasas?pageNumber=${pageNumber}&pageSize=${pageSize}`

    await axios
      .get(url)
      .then((resp) => {
        const data = resp.data
        this.setTasas(data.content)
        this.setTotalPages(data.totalPages)

        runInAction(() => {
          this.setTasas(data.content)
          this.setTotalPages(data.totalPages)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async buscarPorId(id: number): Promise<void> {
    const url = `${import.meta.env.VITE_API_URL}/tasas/${id}`

    await axios
      .get(url)
      .then((resp) => {
        const data = resp.data
        this.setTasa(data)

        runInAction(() => {
          this.setTasa(data)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async guardar(): Promise<void> {
    const url = `${import.meta.env.VITE_API_URL}/tasas`

    try {
      await axios.post(url, this.tasa)

      this.limpiar()
      await this.listarPaginado(this.pageNumber, this.pageSize)
    } catch (error: any) {
      useNotifications(
        VALIDATION_STRINGS.validationError,
        error.response.data,
        'error'
      )
      throw error
    }
  }

  async actualizar(): Promise<void> {
    const url = `${import.meta.env.VITE_API_URL}/tasas/${this.tasa.idTasa}`

    try {
      await axios.put(url, this.tasa)

      this.limpiar()
      await this.listarPaginado(this.pageNumber, this.pageSize)
    } catch (error: any) {
      useNotifications(
        VALIDATION_STRINGS.validationError,
        error.response.data,
        'error'
      )
      throw error
    }
  }
}

const tasaStore = new TasaStore()
export default tasaStore
