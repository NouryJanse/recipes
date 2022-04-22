import FontWOFF from './open-sans-v27-latin-regular.woff'
import FontWOFF2 from './open-sans-v27-latin-regular.woff2'

export const OpenSans400 = `
    @font-face {
        font-display: swap;
        font-family: 'opensans';
        src: url(${FontWOFF2}) format('woff2'),
             url(${FontWOFF}) format('woff');
        font-weight: 400;
        font-style: normal;
    }
`
