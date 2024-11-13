import TokenWrapper from "../definitions/tokenWrapper";

export function saveTokens(tokens: TokenWrapper): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
}