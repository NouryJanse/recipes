import { createGlobalStyle } from 'styled-components';

// import { themeProps } from '../styles/theme';

export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-family: 'opensans';
        font-weight: 400;
    }

    *, 
    *:before, 
    *:after {
        box-sizing: inherit;
    }
    
    body {
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        display: block;
        text-decoration: none;
        margin-bottom: 8px;
    }
    
    p {
        font-family: 'opensans';
        font-weight: 400;
        margin-bottom: 8px;
    }

    .Toastify__toast {
        border-radius: 0;
    }

    .Toastify__close-button {
        
    }

    .Toastify__progress-bar {
        
    }

    .Toastify__toast--success {
        
    }

    .Toastify__toast--error {
        
    }

    nav {
        margin-bottom: 40px;
    }

    .sprites {
        position: absolute;
        width: 0;
        height: 0;
        pointer-events: none;
        user-select: none;
    }

    svg {
        position: absolute;
        right: 12px;
        top: calc(50%);
        width: 10px;
        height: 6px;
        stroke-width: 2px;
        stroke: #9098a9;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        pointer-events: none;

        &:hover {
            stroke: #0077FF;
        }
    }
`;

// GlobalStyle.propTypes = {
//     ...themeProps,
// };
