export declare class TransactionController {
    static update(req: any, res: any, next: any): Promise<void>;
    static transaction(req: any, res: any, next: any): Promise<void>;
    static userTransaction(req: any, res: any, next: any): Promise<void>;
    static TransactionStatus(req: any, res: any, next: any): Promise<void>;
    static allTransaction(req: any, res: any, next: any): Promise<void>;
    static allUserTransaction(req: any, res: any, next: any): Promise<void>;
    static allAdminTransaction(req: any, res: any, next: any): Promise<void>;
    static delete(req: any, res: any, next: any): Promise<void>;
    static redeem(req: any, res: any, next: any): Promise<void>;
    static cash(req: any, res: any, next: any): Promise<void>;
    static reward(req: any, res: any, next: any): Promise<void>;
}
