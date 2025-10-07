import Cookies from 'js-cookie';

export const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
    set: (token: string): void => {
        Cookies.set(TOKEN_KEY, token, {
            expires: 7,
            secure: true,
            sameSite: 'strict',
        });
    },

    get: (): string | undefined => {
        return Cookies.get(TOKEN_KEY);
    },

    remove: (): void => {
        Cookies.remove(TOKEN_KEY, { path: '/' });
    }
};
