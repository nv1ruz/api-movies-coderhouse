export class DbConfig {
    static get() {
        return {
            persistencia: {
                tipo: 'mongo',
                descripcion: 'base mongo atlas',
                URL: process.env.URL_MONGO_DB,
            },
        };
    }
}
