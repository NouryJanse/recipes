import { createGlobalStyle } from 'styled-components'
import './tailwind.output.css'

const GlobalStyle = createGlobalStyle`
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
        word-break: break-word;
    }

    nav {
        width: 60px;
        transition: 0.3s;
        
        @media screen and (min-width: 600px) {
            min-height: 100vh;
        }

        &.opened {
            width: 250px;

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

    .cardAnimation {
        animation-name: cardAni;
        animation-duration: 750ms;
    }

    @keyframes cardAni {
        from {transform: translateY(12px)}
        to {transform: translateY(0px)}
    }   



.react-switch-checkbox:checked + .react-switch-label .react-switch-button {
  transform: translateX(51px);
}

.react-switch-label:active .react-switch-button {
  width: 31px;
}    
`
export default GlobalStyle
