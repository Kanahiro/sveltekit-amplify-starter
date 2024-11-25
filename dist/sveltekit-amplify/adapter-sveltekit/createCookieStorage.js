function createCookieStorage(cookies) {
    return {
        getAll: () => cookies.getAll(),
        get: (name) => ({ name, value: cookies.get(name) }),
        set: (name, value, options) => {
            cookies.set(name, value, {
                ...options,
                path: '/'
            });
        },
        delete: (name, options) => {
            cookies.delete(name, {
                ...options,
                path: '/'
            });
        }
    };
}
export { createCookieStorage };
