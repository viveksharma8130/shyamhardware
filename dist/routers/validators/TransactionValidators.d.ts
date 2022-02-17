export declare class TransactionValidators {
    static transaction(): import("express-validator").ValidationChain[];
    static userTransaction(): import("express-validator").ValidationChain[];
    static allUserTransaction(): import("express-validator").ValidationChain[];
    static update(): import("express-validator").ValidationChain[];
    static delete(): import("express-validator").ValidationChain[];
    static redeem(): import("express-validator").ValidationChain[];
    static reward(): import("express-validator").ValidationChain[];
    static cash(): import("express-validator").ValidationChain[];
}
