import React, {Component} from 'react'
import * as PropTypes from "prop-types";

class SvgComponent extends Component {
    constructor(props) {
        super(props);
        this.equip = props.equip;
    }

    render() {
        const size = this.equip.size;
        const viewBox ="9 13 30 20";
        return (
            <svg
                id={this.props.id + this.equip.name}
                width={size}
                style={this.props.style}
                height={size *2}
                viewBox={viewBox}
                className={this.props.className}
                // viewBox="0 0 48 48" height={200} width={200} {...props}
            >
                <defs>
                    <filter
                        colorInterpolationFilters="sRGB"
                        id="prefix__a"
                        x={-0.326}
                        width={1.651}
                        y={-0.078}
                        height={1.155}
                    >
                        <feGaussianBlur stdDeviation={1.183}/>
                    </filter>
                    <filter
                        colorInterpolationFilters="sRGB"
                        id="prefix__b"
                        x={-0.728}
                        width={2.456}
                        y={-0.147}
                        height={1.295}
                    >
                        <feGaussianBlur stdDeviation={1.131}/>
                    </filter>
                </defs>
                <path d="M19.372 29.595c-16.16 30.51-8.08 15.255 0 0zm0-.145c-16.16 30.607-8.08 15.303 0 0z"/>
                <path
                    transform="matrix(.27504 0 0 .3939 -38.145 -64.898)"
                    d="M253.735 271.78c0 4.912-12.355 8.894-27.594 8.894-15.24 0-27.594-3.982-27.594-8.895 0-4.912 12.354-8.895 27.594-8.895 15.24 0 27.594 3.983 27.594 8.895z"
                    fill="#cacfcf"
                    stroke="#161413"
                    strokeWidth={0.891}
                />
                <path
                    transform="matrix(.2914 0 0 .37333 -41.488 -59.953)"
                    d="M251.008 270.286c0 5.02-11.657 9.09-26.036 9.09-14.38 0-26.036-4.07-26.036-9.09s11.657-9.09 26.036-9.09c14.38 0 26.036 4.07 26.036 9.09z"
                    fill="#e0e5e5"
                    stroke="#161413"
                    strokeWidth={0.891}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    transform="matrix(.27685 0 0 .34569 -38.811 -50.454)"
                    d="M233.737 260.806c0 2.152-3.662 3.896-8.18 3.896-4.519 0-8.181-1.744-8.181-3.896 0-2.151 3.662-3.895 8.18-3.895 4.519 0 8.181 1.744 8.181 3.895z"
                    fill="#cacfcf"
                    stroke="#141613"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    transform="matrix(.27774 0 0 .29208 -38.182 -35.386)"
                    d="M230.75 254.379c0 2.33-3.662 4.22-8.18 4.22s-8.181-1.89-8.181-4.22c0-2.331 3.663-4.22 8.18-4.22 4.519 0 8.182 1.889 8.182 4.22z"
                    fill="#e0e5e5"
                    stroke="#141613"
                    strokeWidth={0.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22.231 33.907l.83.577 1.166.017.817-.594.013 4.995-.79.478-1.206.017-.817-.462z"
                    fill="#bababa"
                />
                <path
                    d="M24.973 35.127h2.649c-.045.512-.37.368 0 1.853l-2.64.012c-.404-.736-.256-1.315-.009-1.865z"
                    fill="#dae8e8"
                />
                <path
                    d="M320.123 241.988v19c4.065 1.704.053-.05 4.054 1.682 5.572.024.007-.017 5.586.027 4.072-1.706-.01.032 4.04-1.709v-7.385c-1.99.084-2.052-6.958 0-7.062v-4.553"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.799}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M24.927 33.858c0 .319-.577.577-1.29.577-.712 0-1.289-.258-1.289-.577 0-.319.577-.577 1.29-.577.712 0 1.29.258 1.29.577z"
                    fill="#f1f1f1"
                />
                <path
                    d="M324.098 244.004c-4.04-2.11.018.007-4.013-2.11 0 0-.01-.014 1.385-1.558 3.382-.838.14.012 3.475-.873 3.709.047.72.056 4.408.07 2.985.932-.006-.04 3.02.899 1.36 1.577.004.018 1.339 1.595-3.94 2.148-3.977 2.072-3.977 2.072-5.621-.105-.022.019-5.637-.095z"
                    fill="#858585"
                    stroke="#161413"
                    strokeWidth={0.838}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M322.571 237.163c-.063 3.892 0 .024-.063 3.802 1.243 2.321 8.424 2.07 9.124-.032.031-3.85.005-.01.031-3.864"
                    fill="#858585"
                    stroke="#161413"
                    strokeWidth={0.59}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M324.251 243.828v18.4"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.306}
                    strokeLinecap="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M329.753 244.115v18.11"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.307}
                    strokeLinecap="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M333.843 236.478c-.438 3.434-13.388 3.617-13.775.109 0-3.092 3.212-2.039 6.98-2.152 3.824-1.348 6.608.19 6.795 2.043z"
                    fill="#bababa"
                    stroke="#141613"
                    strokeWidth={0.838}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M22.206 29.028c.882.574 1.818.67 2.838 0l.026 3.346c-.68.7-2.197.777-2.89-.047z"
                    fill="#bababa"
                />
                <path
                    d="M333.848 223.088c0 .808-3.143 2.151-6.944 2.151-3.8 0-6.818-1.343-6.818-2.151 0-.809 2.956-1.901 6.756-1.901 3.8 0 7.006 1.092 7.006 1.9z"
                    fill="#858585"
                    stroke="#161413"
                    strokeWidth={0.838}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M320.082 223.376v12.686"
                    fill="none"
                    stroke="#141613"
                    strokeWidth={0.833}
                    strokeLinecap="square"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M333.844 223.378v12.696"
                    fill="none"
                    stroke="#141613"
                    strokeWidth={0.838}
                    strokeLinecap="square"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth={0.967}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M322.885 219.929h8.511v1.795h-8.511z"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M22.685 16.351c.648.269 1.296.2 1.944-.016v12.564c-.697.407-1.338.366-1.931-.067z"
                    fill="#e0e5e5"
                />
                <path
                    d="M322.406 222.402v-47.931M331.71 222.518V174.05"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.682}
                    strokeLinecap="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M322.42 222.513c2.492 1.943 8.327 1.56 9.356.046"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.513}
                    strokeLinecap="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M333.43 173.527c0 1.148-2.887 2.609-6.45 2.609-3.562 0-6.45-1.461-6.45-2.61 0-1.147 2.888-2.078 6.45-2.078 3.563 0 6.45.93 6.45 2.079z"
                    fill="#e5d41a"
                    stroke="#161413"
                    strokeWidth={0.838}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M22.31 11.586l-.027 4.197c1.122.856 1.949.637 2.657-.016l.026-4.213c-.208.498-1.903.934-2.657.032z"
                    fill="#e5d017"
                />
                <path
                    d="M333.45 156.609c-.033 3.568-12.976 3.47-12.917.031.024-2.9 12.888-2.92 12.917-.031z"
                    fill="#ffef6a"
                    stroke="#161413"
                    strokeWidth={0.838}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M320.526 156.706v16.769M333.432 156.446v16.976"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.838}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M330.468 156.645c0 .417-1.559.755-3.482.755-1.922 0-3.481-.338-3.481-.755s1.559-.755 3.481-.755c1.923 0 3.482.338 3.482.755z"
                    fill="#171714"
                    stroke="#161413"
                    strokeWidth={0.439}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M333.697 246.523h12.873"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.785}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M333.895 253.604h12.548"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.899}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M292.376 268.291v5.112"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={1.032}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M365.687 268.302l-.01 5.268"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={1.031}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M315.995 260.77V264"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.819}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    d="M337.924 260.718v3.447"
                    fill="none"
                    stroke="#141613"
                    strokeWidth={0.816}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    transform="matrix(.02141 0 0 .08095 22.703 25.804)"
                    d="M245.366 126.712c0 6.54-4.828 11.84-10.783 11.84-5.956 0-10.784-5.3-10.784-11.84s4.828-11.841 10.784-11.841c5.955 0 10.783 5.301 10.783 11.84z"
                    fill="#9ca6a6"
                    stroke="#161413"
                    strokeWidth={3.878}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M345.95 247.197c1.043 2.5.548 4.473.046 5.717M344.97 246.635c-.568.688-1.327 4.432-.031 6.843"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.5}
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    transform="matrix(.32033 0 0 .20497 -47.742 1.279)"
                    d="M222.313 146.031c0 1.847-.518 3.344-1.157 3.344-.638 0-1.156-1.497-1.156-3.344 0-1.846.518-3.344 1.156-3.344.639 0 1.156 1.498 1.156 3.344z"
                    fill="none"
                    stroke="#161413"
                    strokeWidth={0.431}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M23.474 31.229c0 .336-.108.608-.242.608-.133 0-.241-.272-.241-.608 0-.336.108-.609.241-.609.134 0 .242.273.242.609z"
                    fill="#171714"
                />
                <path
                    d="M23.463 31.212c0 .378-.163.684-.363.684-.2 0-.363-.306-.363-.684 0-.378.162-.684.363-.684.2 0 .363.306.363.684zM24.726 36.106c.07-.28.036-.687.174-.863.091-.116 2.468-.254 2.649-.14.081.052-.239 1.12-.083 1.317.116.147.128.537.128.525 0-.004-.16.025-.192.035-.161.051-.385.012-.55.012-.144 0-1.834.01-1.851-.012-.158-.2-.275-.566-.275-.874z"
                    fill="none"
                />
                <path
                    d="M24.964 35.15l2.63-.012c-.11.42-.248.784-.027 1.865h-2.594z"
                    fill="none"
                />
                <path
                    d="M324.802 155.879c-5.87-4.836 2.696-39.582 2.25-36.375-.756-3.092 7.841 32.071 2.83 36.36-5.051.096.019.095-5.08.015z"
                    opacity={0.951}
                    fill="#96dffa"
                    filter="url(#prefix__a)"
                    transform="matrix(.20738 0 0 .26375 -44.17 -29.899)"
                />
                <path
                    transform="matrix(.20738 0 0 .22462 -44.17 -23.738)"
                    d="M328.935 156.346c-3.725.062.09-.028-3.728.062 0-5.019 1.28-18.336 1.833-18.4 1.377-.161 1.895 13.319 1.895 18.338z"
                    opacity={0.832}
                    fill="#3297fa"
                    filter="url(#prefix__b)"
                />
            </svg>
        )
    }
}

export default SvgComponent
