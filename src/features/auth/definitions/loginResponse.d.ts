import TokenWrapper from "./tokenWrapper";
import User from "./user";

export default interface loginResponse {
    user: User,
    tokens : TokenWrapper
}