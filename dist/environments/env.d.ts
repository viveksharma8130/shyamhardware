export interface Environment {
    db_url: string;
    jwt_secret: string;
    site_url: string;
}
export declare function getEnvironmentVariables(): Environment;
