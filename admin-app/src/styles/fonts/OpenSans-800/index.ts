import FontWOFF from './open-sans-v27-latin-800.woff'
import FontWOFF2 from './open-sans-v27-latin-800.woff2'

// eslint-disable-next-line import/prefer-default-export
export const OpenSans800 = `
    @font-face {
        font-display: swap;
        font-family: 'opensans';
        src: url(${FontWOFF2}) format('woff2'),
             url(${FontWOFF}) format('woff');
        font-weight: 800;
        font-style: normal;
    }
`
