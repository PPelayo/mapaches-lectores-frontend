import TokenWrapper from "../definitions/tokenWrapper";

export function saveTokens(tokens: TokenWrapper): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
}

export function getTokens(): TokenWrapper | undefined {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('accessToken')

    if(!accessToken || !refreshToken) return

    return { accessToken, refreshToken }
}