export function isUserBlockLocation() {
    return localStorage.getItem('user_block_location') === 'true'
}

export function userBlockLocation() {
    localStorage.setItem('user_block_location', 'true')
}

export function userUnblockLocation() {
    localStorage.setItem('user_block_location', 'false')
}
