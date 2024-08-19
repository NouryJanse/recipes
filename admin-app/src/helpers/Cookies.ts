import Cookies from 'js-cookie'

export const getUserCookies = () => {
    const id = Cookies.get('admin-userid')
    const token = Cookies.get('admin-jwt')
    return { token, id }
}

export const removeUserCookies = () => {
    Cookies.remove('admin-userid')
    Cookies.remove('admin-jwt')
}
