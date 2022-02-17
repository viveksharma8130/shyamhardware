export declare class UserValidators {
    static session(): import("express-validator").ValidationChain[];
    static login(): import("express-validator").ValidationChain[];
    static passwordForgot(): import("express-validator").ValidationChain[];
    static passwordChange(): import("express-validator").ValidationChain[];
    static deleteUser(): import("express-validator").ValidationChain[];
    static update(): import("express-validator").ValidationChain[];
}
