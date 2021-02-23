export interface Intention {
    date: string
    owner?: string
    importance: number
    time: string
    tags: Array<string>
    fileLinks: Array<string>
    title: string
    description: string
    _id?: string
}
