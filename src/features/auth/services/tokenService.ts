import TokenWrapper from "@/features/auth/definitions/tokenWrapper";

export function saveTokens(tokens: TokenWrapper): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
}

export function getTokens(): TokenWrapper | undefined {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!accessToken || !refreshToken) return

    return { accessToken, refreshToken }
}

export function deleteTokens() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}