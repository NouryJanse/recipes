import { createGlobalStyle } from 'styled-components'

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
        word-break: break-word;
    }

    nav {
        min-height: 95vh;
        max-height: 100vh;
        width: 8vw;
        max-width: 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        transition: 0.3s;
        align-items: center;
        
        .navLink {
            display: flex;
            flex-direction: row;
            align-items: center;
            
            .toggleContent {
                margin: 0;
                opacity: 0;
                color: black;
                max-height: 32px;
            }
        }

        &.opened {
            width: 24vw;

            .navLink {
                .toggleContent {
                    transition-delay: 400ms;
                    transition: 200ms opacity;
                    opacity: 1;
                }
            }
        }
    }

    .content {
        transition: margin-left 0.3s;
        margin-left: 8vw;

        &.opened {
            margin-left: 24vw;
        }
    }

    .rootContainer {
        display: flex;
        flex-direction: row;
        padding: 16px;
    }

    .sprites {
        position: absolute;
        width: 0;
        height: 0;
        pointer-events: none;
        user-select: none;
    }

    svg.sprites {
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
`

// GlobalStyle.propTypes = {
//     ...themeProps,
// };
