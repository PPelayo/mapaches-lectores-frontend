import TokenWrapper from "./tokenWrapper";
import User from "./user";

export default interface RegisterResponse {
    user :User,
    tokens : TokenWrapper
}