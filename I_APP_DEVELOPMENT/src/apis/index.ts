import axios from 'axios';

export const api = {
    login: (data: ILoginData) =>
        axios.post<{token: string}>('https://reqres.in/api/login', data),

    getListPhoto: (token: string) =>
        axios.get<IPhoto[]>('https://jsonplaceholder.typicode.com/photos', {
            headers: {
                token: token,
            },
        }),

    getDetailPhoto: (id: number, token: string) =>
        axios.get<IPhoto>(`https://jsonplaceholder.typicode.com/photos/${id}`, {
            headers: {
                token: token,
            },
        }),
};
