import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { IAuth } from '../models/Auth'
import { Session } from '../models/Session'
import { UserData } from '../models/UserData'
import getFingerprint from '../utils/fingerprint'
import moment from 'moment'
import { Intention } from '../models/Intention'

const storageName = process.env.REACT_APP_LOCAL_STORAGE_NAME || 'userData'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '',
    headers: { 'Content-Type': 'application/json' },
})

class API {
    //private fields
    private session: Session | undefined
    private fingerprint: string | undefined

    //public fields
    public userData: UserData = {}

    public async build() {
        const dataFromStorage = this.getSessionFromStorage()
        if (dataFromStorage) {
            this.session = dataFromStorage
            await this.setFingerprint()
            await this.getUserData()
        }
    }

    //private methods
    private setSession(session: Session): void {
        this.session = session
        localStorage.setItem(storageName, JSON.stringify(session))
    }

    private getSessionFromStorage(): Session {
        return JSON.parse(localStorage.getItem(storageName)!)
    }

    private async setFingerprint() {
        this.fingerprint = await getFingerprint()
    }

    private getAxiosConfig(): AxiosRequestConfig {
        return {
            headers: { Authorization: `Bearer ${this.session?.accessToken}` },
        }
    }

    private async getUserData() {
        await this.refreshToken()
        const response: AxiosResponse = await axiosInstance.get('api/users', this.getAxiosConfig())

        if (response.status === 200) this.userData = response.data.user
    }

    private async refreshToken() {
        if (this.session) {
            const expiresAt: number = Number(this.session.expiresAt)
            if (expiresAt && moment(expiresAt) < moment()) {
                try {
                    const response: AxiosResponse = await axiosInstance.post('/api/auth/token', {
                        fingerprint: this.fingerprint,
                        refreshToken: this.session.refreshToken,
                    })

                    if (response.status === 200) this.setSession(response.data)
                    else throw new Error()
                } catch (err) {
                    this.logout()
                    window.location.reload()
                }
            }
        }
    }

    //getters
    get Session() {
        if (this.session) return this.session
        else throw new Error(`Session didn't define`)
    }

    get isAuthenticated() {
        return !!this.session && !!this.fingerprint
    }

    //auth
    public async login(formData: IAuth): Promise<void> {
        const response: AxiosResponse = await axiosInstance.post('/api/auth/login', {
            ...formData,
            fingerprint: this.fingerprint,
        })

        if (response.status === 200) {
            this.setSession(response.data)
            await this.getUserData()
        } else throw new Error('Incorrect user sign in data')
    }

    public async signUp(formData: IAuth): Promise<string> {
        const response: AxiosResponse = await axiosInstance.post('/api/auth/signup', formData)
        if (response.status === 201) return response.data.message
        else throw new Error('Incorrect user sign up data')
    }

    public logout(): void {
        localStorage.removeItem(storageName)
        this.session = undefined
        this.userData = {}
        this.fingerprint = undefined
    }

    //api
    public async uploadFiles(data: File | File[]): Promise<any> {
        await this.refreshToken()

        const formData = new FormData()
        if (Array.isArray(data))
            data.forEach((file: File, index) => formData.append(`${index} file`, file, file.name))
        else formData.append('file', data, data.name)

        const response: AxiosResponse = await axiosInstance.post(
            '/api/media',
            formData,
            this.getAxiosConfig()
        )
        if (response.status === 201) {
            return response.data
        } else throw new Error()
    }

    public async updateUserData(): Promise<string> {
        await this.refreshToken()

        const response: AxiosResponse = await axiosInstance.put(
            '/api/users/update',
            this.userData,
            this.getAxiosConfig()
        )
        if (response.status === 200) return response.data.message
        else throw new Error('Please, try again later')
    }

    public async getUserIntentions(): Promise<Intention> {
        await this.refreshToken()

        const response: AxiosResponse = await axiosInstance.get('api/intentions', this.getAxiosConfig())
        if (response.status === 200) return response.data.intentions
        else throw new Error('Please, try again later')
    }

    public async deleteIntentionById(intentionId: string): Promise<string> {
        await this.refreshToken()

        const response: AxiosResponse = await axiosInstance.delete(
            `/api/intentions/${intentionId}`,
            this.getAxiosConfig()
        )
        if (response.status === 200) return response.data.message
        else throw new Error('Please, try again later')
    }

    public async createIntention(intention: Intention): Promise<string> {
        await this.refreshToken()

        const response: AxiosResponse = await axiosInstance.post(
            '/api/intentions/create',
            intention,
            this.getAxiosConfig()
        )
        console.log(response)
        if (response.status === 201) return response.data.message
        else throw new Error('Please, try again later')
    }
}

const clientApi = new API()
export default clientApi
