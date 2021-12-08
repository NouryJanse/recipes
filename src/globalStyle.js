import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
/* 
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
} */



/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/*!
 * Bootstrap Grid v5.0.2 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors
 * Copyright 2011-2021 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
 .container,
 .container-fluid,
 .container-ul,
 .container-xxl,
 .container-xl,
 .container-lg,
 .container-md,
 .container-sm {
   width: 100%;
   padding-right: var(--bs-gutter-x, 1rem);
   padding-left: var(--bs-gutter-x, 1rem);
   margin-right: auto;
   margin-left: auto;
 }
 
 @media (min-width: 576px) {
   .container-sm, .container {
     max-width: 100%;
   }
 }
 @media (min-width: 768px) {
   .container-md, .container-sm, .container {
     max-width: 100%;
   }
 }
 @media (min-width: 992px) {
   .container-lg, .container-md, .container-sm, .container {
     max-width: 100%;
   }
 }
 @media (min-width: 1200px) {
   .container-xl, .container-lg, .container-md, .container-sm, .container {
     max-width: 1200px;
   }
 }
 @media (min-width: 1400px) {
   .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
     max-width: 1400px;
   }
 }
 @media (min-width: 1600px) {
   .container-ul, .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
     max-width: 1600px;
   }
 }
 .row {
   --bs-gutter-x: 1rem;
   --bs-gutter-y: 0;
   display: flex;
   flex-wrap: wrap;
   margin-top: calc(var(--bs-gutter-y) * -1);
   margin-right: calc(var(--bs-gutter-x) * -.5);
   margin-left: calc(var(--bs-gutter-x) * -.5);
 }
 .row > * {
   flex-shrink: 0;
   width: 100%;
   max-width: 100%;
   padding-right: calc(var(--bs-gutter-x) * .5);
   padding-left: calc(var(--bs-gutter-x) * .5);
   margin-top: var(--bs-gutter-y);
 }
 
 .col {
   flex: 1 0 0%;
 }
 
 .row-cols-auto > * {
   flex: 0 0 auto;
   width: auto;
 }
 
 .row-cols-1 > * {
   flex: 0 0 auto;
   width: 100%;
 }
 
 .row-cols-2 > * {
   flex: 0 0 auto;
   width: 50%;
 }
 
 .row-cols-3 > * {
   flex: 0 0 auto;
   width: 33.3333333333%;
 }
 
 .row-cols-4 > * {
   flex: 0 0 auto;
   width: 25%;
 }
 
 .row-cols-5 > * {
   flex: 0 0 auto;
   width: 20%;
 }
 
 .row-cols-6 > * {
   flex: 0 0 auto;
   width: 16.6666666667%;
 }
 
 @media (min-width: 576px) {
   .col-sm {
     flex: 1 0 0%;
   }
 
   .row-cols-sm-auto > * {
     flex: 0 0 auto;
     width: auto;
   }
 
   .row-cols-sm-1 > * {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .row-cols-sm-2 > * {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .row-cols-sm-3 > * {
     flex: 0 0 auto;
     width: 33.3333333333%;
   }
 
   .row-cols-sm-4 > * {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .row-cols-sm-5 > * {
     flex: 0 0 auto;
     width: 20%;
   }
 
   .row-cols-sm-6 > * {
     flex: 0 0 auto;
     width: 16.6666666667%;
   }
 }
 @media (min-width: 768px) {
   .col-md {
     flex: 1 0 0%;
   }
 
   .row-cols-md-auto > * {
     flex: 0 0 auto;
     width: auto;
   }
 
   .row-cols-md-1 > * {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .row-cols-md-2 > * {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .row-cols-md-3 > * {
     flex: 0 0 auto;
     width: 33.3333333333%;
   }
 
   .row-cols-md-4 > * {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .row-cols-md-5 > * {
     flex: 0 0 auto;
     width: 20%;
   }
 
   .row-cols-md-6 > * {
     flex: 0 0 auto;
     width: 16.6666666667%;
   }
 }
 @media (min-width: 992px) {
   .col-lg {
     flex: 1 0 0%;
   }
 
   .row-cols-lg-auto > * {
     flex: 0 0 auto;
     width: auto;
   }
 
   .row-cols-lg-1 > * {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .row-cols-lg-2 > * {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .row-cols-lg-3 > * {
     flex: 0 0 auto;
     width: 33.3333333333%;
   }
 
   .row-cols-lg-4 > * {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .row-cols-lg-5 > * {
     flex: 0 0 auto;
     width: 20%;
   }
 
   .row-cols-lg-6 > * {
     flex: 0 0 auto;
     width: 16.6666666667%;
   }
 }
 @media (min-width: 1200px) {
   .col-xl {
     flex: 1 0 0%;
   }
 
   .row-cols-xl-auto > * {
     flex: 0 0 auto;
     width: auto;
   }
 
   .row-cols-xl-1 > * {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .row-cols-xl-2 > * {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .row-cols-xl-3 > * {
     flex: 0 0 auto;
     width: 33.3333333333%;
   }
 
   .row-cols-xl-4 > * {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .row-cols-xl-5 > * {
     flex: 0 0 auto;
     width: 20%;
   }
 
   .row-cols-xl-6 > * {
     flex: 0 0 auto;
     width: 16.6666666667%;
   }
 }
 @media (min-width: 1400px) {
   .col-xxl {
     flex: 1 0 0%;
   }
 
   .row-cols-xxl-auto > * {
     flex: 0 0 auto;
     width: auto;
   }
 
   .row-cols-xxl-1 > * {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .row-cols-xxl-2 > * {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .row-cols-xxl-3 > * {
     flex: 0 0 auto;
     width: 33.3333333333%;
   }
 
   .row-cols-xxl-4 > * {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .row-cols-xxl-5 > * {
     flex: 0 0 auto;
     width: 20%;
   }
 
   .row-cols-xxl-6 > * {
     flex: 0 0 auto;
     width: 16.6666666667%;
   }
 }
 @media (min-width: 1600px) {
   .col-ul {
     flex: 1 0 0%;
   }
 
   .row-cols-ul-auto > * {
     flex: 0 0 auto;
     width: auto;
   }
 
   .row-cols-ul-1 > * {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .row-cols-ul-2 > * {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .row-cols-ul-3 > * {
     flex: 0 0 auto;
     width: 33.3333333333%;
   }
 
   .row-cols-ul-4 > * {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .row-cols-ul-5 > * {
     flex: 0 0 auto;
     width: 20%;
   }
 
   .row-cols-ul-6 > * {
     flex: 0 0 auto;
     width: 16.6666666667%;
   }
 }
 .col-auto {
   flex: 0 0 auto;
   width: auto;
 }
 
 .col-1 {
   flex: 0 0 auto;
   width: 8.33333333%;
 }
 
 .col-2 {
   flex: 0 0 auto;
   width: 16.66666667%;
 }
 
 .col-3 {
   flex: 0 0 auto;
   width: 25%;
 }
 
 .col-4 {
   flex: 0 0 auto;
   width: 33.33333333%;
 }
 
 .col-5 {
   flex: 0 0 auto;
   width: 41.66666667%;
 }
 
 .col-6 {
   flex: 0 0 auto;
   width: 50%;
 }
 
 .col-7 {
   flex: 0 0 auto;
   width: 58.33333333%;
 }
 
 .col-8 {
   flex: 0 0 auto;
   width: 66.66666667%;
 }
 
 .col-9 {
   flex: 0 0 auto;
   width: 75%;
 }
 
 .col-10 {
   flex: 0 0 auto;
   width: 83.33333333%;
 }
 
 .col-11 {
   flex: 0 0 auto;
   width: 91.66666667%;
 }
 
 .col-12 {
   flex: 0 0 auto;
   width: 100%;
 }
 
 .offset-1 {
   margin-left: 8.33333333%;
 }
 
 .offset-2 {
   margin-left: 16.66666667%;
 }
 
 .offset-3 {
   margin-left: 25%;
 }
 
 .offset-4 {
   margin-left: 33.33333333%;
 }
 
 .offset-5 {
   margin-left: 41.66666667%;
 }
 
 .offset-6 {
   margin-left: 50%;
 }
 
 .offset-7 {
   margin-left: 58.33333333%;
 }
 
 .offset-8 {
   margin-left: 66.66666667%;
 }
 
 .offset-9 {
   margin-left: 75%;
 }
 
 .offset-10 {
   margin-left: 83.33333333%;
 }
 
 .offset-11 {
   margin-left: 91.66666667%;
 }
 
 @media (min-width: 576px) {
   .col-sm-auto {
     flex: 0 0 auto;
     width: auto;
   }
 
   .col-sm-1 {
     flex: 0 0 auto;
     width: 8.33333333%;
   }
 
   .col-sm-2 {
     flex: 0 0 auto;
     width: 16.66666667%;
   }
 
   .col-sm-3 {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .col-sm-4 {
     flex: 0 0 auto;
     width: 33.33333333%;
   }
 
   .col-sm-5 {
     flex: 0 0 auto;
     width: 41.66666667%;
   }
 
   .col-sm-6 {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .col-sm-7 {
     flex: 0 0 auto;
     width: 58.33333333%;
   }
 
   .col-sm-8 {
     flex: 0 0 auto;
     width: 66.66666667%;
   }
 
   .col-sm-9 {
     flex: 0 0 auto;
     width: 75%;
   }
 
   .col-sm-10 {
     flex: 0 0 auto;
     width: 83.33333333%;
   }
 
   .col-sm-11 {
     flex: 0 0 auto;
     width: 91.66666667%;
   }
 
   .col-sm-12 {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .offset-sm-0 {
     margin-left: 0;
   }
 
   .offset-sm-1 {
     margin-left: 8.33333333%;
   }
 
   .offset-sm-2 {
     margin-left: 16.66666667%;
   }
 
   .offset-sm-3 {
     margin-left: 25%;
   }
 
   .offset-sm-4 {
     margin-left: 33.33333333%;
   }
 
   .offset-sm-5 {
     margin-left: 41.66666667%;
   }
 
   .offset-sm-6 {
     margin-left: 50%;
   }
 
   .offset-sm-7 {
     margin-left: 58.33333333%;
   }
 
   .offset-sm-8 {
     margin-left: 66.66666667%;
   }
 
   .offset-sm-9 {
     margin-left: 75%;
   }
 
   .offset-sm-10 {
     margin-left: 83.33333333%;
   }
 
   .offset-sm-11 {
     margin-left: 91.66666667%;
   }
 }
 @media (min-width: 768px) {
   .col-md-auto {
     flex: 0 0 auto;
     width: auto;
   }
 
   .col-md-1 {
     flex: 0 0 auto;
     width: 8.33333333%;
   }
 
   .col-md-2 {
     flex: 0 0 auto;
     width: 16.66666667%;
   }
 
   .col-md-3 {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .col-md-4 {
     flex: 0 0 auto;
     width: 33.33333333%;
   }
 
   .col-md-5 {
     flex: 0 0 auto;
     width: 41.66666667%;
   }
 
   .col-md-6 {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .col-md-7 {
     flex: 0 0 auto;
     width: 58.33333333%;
   }
 
   .col-md-8 {
     flex: 0 0 auto;
     width: 66.66666667%;
   }
 
   .col-md-9 {
     flex: 0 0 auto;
     width: 75%;
   }
 
   .col-md-10 {
     flex: 0 0 auto;
     width: 83.33333333%;
   }
 
   .col-md-11 {
     flex: 0 0 auto;
     width: 91.66666667%;
   }
 
   .col-md-12 {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .offset-md-0 {
     margin-left: 0;
   }
 
   .offset-md-1 {
     margin-left: 8.33333333%;
   }
 
   .offset-md-2 {
     margin-left: 16.66666667%;
   }
 
   .offset-md-3 {
     margin-left: 25%;
   }
 
   .offset-md-4 {
     margin-left: 33.33333333%;
   }
 
   .offset-md-5 {
     margin-left: 41.66666667%;
   }
 
   .offset-md-6 {
     margin-left: 50%;
   }
 
   .offset-md-7 {
     margin-left: 58.33333333%;
   }
 
   .offset-md-8 {
     margin-left: 66.66666667%;
   }
 
   .offset-md-9 {
     margin-left: 75%;
   }
 
   .offset-md-10 {
     margin-left: 83.33333333%;
   }
 
   .offset-md-11 {
     margin-left: 91.66666667%;
   }
 }
 @media (min-width: 992px) {
   .col-lg-auto {
     flex: 0 0 auto;
     width: auto;
   }
 
   .col-lg-1 {
     flex: 0 0 auto;
     width: 8.33333333%;
   }
 
   .col-lg-2 {
     flex: 0 0 auto;
     width: 16.66666667%;
   }
 
   .col-lg-3 {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .col-lg-4 {
     flex: 0 0 auto;
     width: 33.33333333%;
   }
 
   .col-lg-5 {
     flex: 0 0 auto;
     width: 41.66666667%;
   }
 
   .col-lg-6 {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .col-lg-7 {
     flex: 0 0 auto;
     width: 58.33333333%;
   }
 
   .col-lg-8 {
     flex: 0 0 auto;
     width: 66.66666667%;
   }
 
   .col-lg-9 {
     flex: 0 0 auto;
     width: 75%;
   }
 
   .col-lg-10 {
     flex: 0 0 auto;
     width: 83.33333333%;
   }
 
   .col-lg-11 {
     flex: 0 0 auto;
     width: 91.66666667%;
   }
 
   .col-lg-12 {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .offset-lg-0 {
     margin-left: 0;
   }
 
   .offset-lg-1 {
     margin-left: 8.33333333%;
   }
 
   .offset-lg-2 {
     margin-left: 16.66666667%;
   }
 
   .offset-lg-3 {
     margin-left: 25%;
   }
 
   .offset-lg-4 {
     margin-left: 33.33333333%;
   }
 
   .offset-lg-5 {
     margin-left: 41.66666667%;
   }
 
   .offset-lg-6 {
     margin-left: 50%;
   }
 
   .offset-lg-7 {
     margin-left: 58.33333333%;
   }
 
   .offset-lg-8 {
     margin-left: 66.66666667%;
   }
 
   .offset-lg-9 {
     margin-left: 75%;
   }
 
   .offset-lg-10 {
     margin-left: 83.33333333%;
   }
 
   .offset-lg-11 {
     margin-left: 91.66666667%;
   }
 }
 @media (min-width: 1200px) {
   .col-xl-auto {
     flex: 0 0 auto;
     width: auto;
   }
 
   .col-xl-1 {
     flex: 0 0 auto;
     width: 8.33333333%;
   }
 
   .col-xl-2 {
     flex: 0 0 auto;
     width: 16.66666667%;
   }
 
   .col-xl-3 {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .col-xl-4 {
     flex: 0 0 auto;
     width: 33.33333333%;
   }
 
   .col-xl-5 {
     flex: 0 0 auto;
     width: 41.66666667%;
   }
 
   .col-xl-6 {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .col-xl-7 {
     flex: 0 0 auto;
     width: 58.33333333%;
   }
 
   .col-xl-8 {
     flex: 0 0 auto;
     width: 66.66666667%;
   }
 
   .col-xl-9 {
     flex: 0 0 auto;
     width: 75%;
   }
 
   .col-xl-10 {
     flex: 0 0 auto;
     width: 83.33333333%;
   }
 
   .col-xl-11 {
     flex: 0 0 auto;
     width: 91.66666667%;
   }
 
   .col-xl-12 {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .offset-xl-0 {
     margin-left: 0;
   }
 
   .offset-xl-1 {
     margin-left: 8.33333333%;
   }
 
   .offset-xl-2 {
     margin-left: 16.66666667%;
   }
 
   .offset-xl-3 {
     margin-left: 25%;
   }
 
   .offset-xl-4 {
     margin-left: 33.33333333%;
   }
 
   .offset-xl-5 {
     margin-left: 41.66666667%;
   }
 
   .offset-xl-6 {
     margin-left: 50%;
   }
 
   .offset-xl-7 {
     margin-left: 58.33333333%;
   }
 
   .offset-xl-8 {
     margin-left: 66.66666667%;
   }
 
   .offset-xl-9 {
     margin-left: 75%;
   }
 
   .offset-xl-10 {
     margin-left: 83.33333333%;
   }
 
   .offset-xl-11 {
     margin-left: 91.66666667%;
   }
 }
 @media (min-width: 1400px) {
   .col-xxl-auto {
     flex: 0 0 auto;
     width: auto;
   }
 
   .col-xxl-1 {
     flex: 0 0 auto;
     width: 8.33333333%;
   }
 
   .col-xxl-2 {
     flex: 0 0 auto;
     width: 16.66666667%;
   }
 
   .col-xxl-3 {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .col-xxl-4 {
     flex: 0 0 auto;
     width: 33.33333333%;
   }
 
   .col-xxl-5 {
     flex: 0 0 auto;
     width: 41.66666667%;
   }
 
   .col-xxl-6 {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .col-xxl-7 {
     flex: 0 0 auto;
     width: 58.33333333%;
   }
 
   .col-xxl-8 {
     flex: 0 0 auto;
     width: 66.66666667%;
   }
 
   .col-xxl-9 {
     flex: 0 0 auto;
     width: 75%;
   }
 
   .col-xxl-10 {
     flex: 0 0 auto;
     width: 83.33333333%;
   }
 
   .col-xxl-11 {
     flex: 0 0 auto;
     width: 91.66666667%;
   }
 
   .col-xxl-12 {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .offset-xxl-0 {
     margin-left: 0;
   }
 
   .offset-xxl-1 {
     margin-left: 8.33333333%;
   }
 
   .offset-xxl-2 {
     margin-left: 16.66666667%;
   }
 
   .offset-xxl-3 {
     margin-left: 25%;
   }
 
   .offset-xxl-4 {
     margin-left: 33.33333333%;
   }
 
   .offset-xxl-5 {
     margin-left: 41.66666667%;
   }
 
   .offset-xxl-6 {
     margin-left: 50%;
   }
 
   .offset-xxl-7 {
     margin-left: 58.33333333%;
   }
 
   .offset-xxl-8 {
     margin-left: 66.66666667%;
   }
 
   .offset-xxl-9 {
     margin-left: 75%;
   }
 
   .offset-xxl-10 {
     margin-left: 83.33333333%;
   }
 
   .offset-xxl-11 {
     margin-left: 91.66666667%;
   }
 }
 @media (min-width: 1600px) {
   .col-ul-auto {
     flex: 0 0 auto;
     width: auto;
   }
 
   .col-ul-1 {
     flex: 0 0 auto;
     width: 8.33333333%;
   }
 
   .col-ul-2 {
     flex: 0 0 auto;
     width: 16.66666667%;
   }
 
   .col-ul-3 {
     flex: 0 0 auto;
     width: 25%;
   }
 
   .col-ul-4 {
     flex: 0 0 auto;
     width: 33.33333333%;
   }
 
   .col-ul-5 {
     flex: 0 0 auto;
     width: 41.66666667%;
   }
 
   .col-ul-6 {
     flex: 0 0 auto;
     width: 50%;
   }
 
   .col-ul-7 {
     flex: 0 0 auto;
     width: 58.33333333%;
   }
 
   .col-ul-8 {
     flex: 0 0 auto;
     width: 66.66666667%;
   }
 
   .col-ul-9 {
     flex: 0 0 auto;
     width: 75%;
   }
 
   .col-ul-10 {
     flex: 0 0 auto;
     width: 83.33333333%;
   }
 
   .col-ul-11 {
     flex: 0 0 auto;
     width: 91.66666667%;
   }
 
   .col-ul-12 {
     flex: 0 0 auto;
     width: 100%;
   }
 
   .offset-ul-0 {
     margin-left: 0;
   }
 
   .offset-ul-1 {
     margin-left: 8.33333333%;
   }
 
   .offset-ul-2 {
     margin-left: 16.66666667%;
   }
 
   .offset-ul-3 {
     margin-left: 25%;
   }
 
   .offset-ul-4 {
     margin-left: 33.33333333%;
   }
 
   .offset-ul-5 {
     margin-left: 41.66666667%;
   }
 
   .offset-ul-6 {
     margin-left: 50%;
   }
 
   .offset-ul-7 {
     margin-left: 58.33333333%;
   }
 
   .offset-ul-8 {
     margin-left: 66.66666667%;
   }
 
   .offset-ul-9 {
     margin-left: 75%;
   }
 
   .offset-ul-10 {
     margin-left: 83.33333333%;
   }
 
   .offset-ul-11 {
     margin-left: 91.66666667%;
   }
 }
 .order-first {
   order: -1 !important;
 }
 
 .order-0 {
   order: 0 !important;
 }
 
 .order-1 {
   order: 1 !important;
 }
 
 .order-2 {
   order: 2 !important;
 }
 
 .order-3 {
   order: 3 !important;
 }
 
 .order-4 {
   order: 4 !important;
 }
 
 .order-5 {
   order: 5 !important;
 }
 
 .order-last {
   order: 6 !important;
 }
 
 @media (min-width: 576px) {
   .order-sm-first {
     order: -1 !important;
   }
 
   .order-sm-0 {
     order: 0 !important;
   }
 
   .order-sm-1 {
     order: 1 !important;
   }
 
   .order-sm-2 {
     order: 2 !important;
   }
 
   .order-sm-3 {
     order: 3 !important;
   }
 
   .order-sm-4 {
     order: 4 !important;
   }
 
   .order-sm-5 {
     order: 5 !important;
   }
 
   .order-sm-last {
     order: 6 !important;
   }
 }
 @media (min-width: 768px) {
   .order-md-first {
     order: -1 !important;
   }
 
   .order-md-0 {
     order: 0 !important;
   }
 
   .order-md-1 {
     order: 1 !important;
   }
 
   .order-md-2 {
     order: 2 !important;
   }
 
   .order-md-3 {
     order: 3 !important;
   }
 
   .order-md-4 {
     order: 4 !important;
   }
 
   .order-md-5 {
     order: 5 !important;
   }
 
   .order-md-last {
     order: 6 !important;
   }
 }
 @media (min-width: 992px) {
   .order-lg-first {
     order: -1 !important;
   }
 
   .order-lg-0 {
     order: 0 !important;
   }
 
   .order-lg-1 {
     order: 1 !important;
   }
 
   .order-lg-2 {
     order: 2 !important;
   }
 
   .order-lg-3 {
     order: 3 !important;
   }
 
   .order-lg-4 {
     order: 4 !important;
   }
 
   .order-lg-5 {
     order: 5 !important;
   }
 
   .order-lg-last {
     order: 6 !important;
   }
 }
 @media (min-width: 1200px) {
   .order-xl-first {
     order: -1 !important;
   }
 
   .order-xl-0 {
     order: 0 !important;
   }
 
   .order-xl-1 {
     order: 1 !important;
   }
 
   .order-xl-2 {
     order: 2 !important;
   }
 
   .order-xl-3 {
     order: 3 !important;
   }
 
   .order-xl-4 {
     order: 4 !important;
   }
 
   .order-xl-5 {
     order: 5 !important;
   }
 
   .order-xl-last {
     order: 6 !important;
   }
 }
 @media (min-width: 1400px) {
   .order-xxl-first {
     order: -1 !important;
   }
 
   .order-xxl-0 {
     order: 0 !important;
   }
 
   .order-xxl-1 {
     order: 1 !important;
   }
 
   .order-xxl-2 {
     order: 2 !important;
   }
 
   .order-xxl-3 {
     order: 3 !important;
   }
 
   .order-xxl-4 {
     order: 4 !important;
   }
 
   .order-xxl-5 {
     order: 5 !important;
   }
 
   .order-xxl-last {
     order: 6 !important;
   }
 }
 @media (min-width: 1600px) {
   .order-ul-first {
     order: -1 !important;
   }
 
   .order-ul-0 {
     order: 0 !important;
   }
 
   .order-ul-1 {
     order: 1 !important;
   }
 
   .order-ul-2 {
     order: 2 !important;
   }
 
   .order-ul-3 {
     order: 3 !important;
   }
 
   .order-ul-4 {
     order: 4 !important;
   }
 
   .order-ul-5 {
     order: 5 !important;
   }
 
   .order-ul-last {
     order: 6 !important;
   }
 }

  .row-fluid {
    --bs-gutter-x: 0;
  }

  .row {
    --bs-gutter-x: 24px;
  }

  $xsOnlyBreakpoint: 575px;
  $smBreakpoint: 576px; // Mobile/portrait tablet
  $mdBreakpoint: 768px; // Tablet
  $lgBreakpoint: 992px; // Desktop
  $xlBreakpoint: 1200px; // Desktop xl
  $xxlBreakpoint: 1400px; // Desktop xxl
  $ulBreakpoint: 1600px; // Desktop ul

  // Container width
  $xsOnlyContainer: 100%;
  $smContainer: 100%;
  $mdContainer: 100%;
  $lgContainer: 100%;
  $xlContainer: 1200px;
  $xxlContainer: 1440px;
  $ulContainer: 1600px;
  
  @mixin media-xs-only {
    @media (max-width: $xsOnlyBreakpoint) { @content; }
  }

  @mixin media-sm {
      @media (min-width: $smBreakpoint) { @content; }
  }

  @mixin media-md {
      @media (min-width: $mdBreakpoint) { @content; }
  }

  @mixin media-lg {
      @media (min-width: $lgBreakpoint) { @content; }
  }

  @mixin media-xl {
      @media (min-width: $xlBreakpoint) { @content; }
  }

  @mixin media-xxl {
      @media (min-width: $xxlBreakpoint) { @content; }
  }

  @mixin media-ul {
      @media (min-width: $ulBreakpoint) { @content; }
  }    
 `