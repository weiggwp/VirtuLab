import React, {Component} from 'react'
import * as PropTypes from "prop-types";

class SvgComponent extends Component {
    constructor(props) {
        super(props);
        this.equip= props.equip;
        this.zero = this.zero.bind(this);
    }

    zero(){
        // this.setState({value:0});
        this.equip.zero();
        this.forceUpdate();
    }

    render() {
        const size= this.equip.size;
        const viewBox= "-25 0 250 100";
        console.log("this.equip.items",this.equip.items,"this.equip.items ===[]",this.equip.items <1);
        const mass = (this.equip.items.length<1)? 0:this.equip.items[0].getWeight();
        return (
            <svg
                id={this.props.id + "scale"}
                width={size}
                style={this.props.style}
                height={size / 2 * 1.4}
                viewBox={viewBox}
                className={this.props.className}
                // viewBox="0 0 48 48" height={200} width={200} {...props}
            >
                <g transform="translate(0 -943.462)">
                    {
                        'rect style=&quot;opacity:1;fill:#800000;fill-opacity:1;stroke:#800000;stroke-width:0.17552786;image-rendering:auto&quot; width=&quot;40.34763&quot; height=&quot;17.26265&quot; x=&quot;-29.971291&quot; y=&quot;1017.6305&quot; transform=&quot;matrix(-0.98480775,0.17364818,0.17364818,0.98480775,0,0)&quot; ry=&quot;8.0833635&quot; inkscape:label=&quot;#rect4207&quot;/&gt;'
                    }
                    <text
                        style={{
                            lineHeight: '125%',
                        }}
                        x={-115.357}
                        y={1034.505}
                        fontWeight={400}
                        fontSize={40}
                        fontFamily="sans-serif"
                        letterSpacing={0}
                        wordSpacing={0}
                    />
                    <path
                        d="M.895 962.027l110.571-15.08 68.876 34.405 16.272 36.17.979 12.733c-41.488 6.894-72.54 15.953-114.186 21.725l-12.033-1.217-18.9-12.192-48.179-28.818-.503-21.13c-3.072-1.96-3.65-.906-3.4-2.079z"
                        fill="#9da697"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M82.15 1039.716l1.04 10.957 114.963-20.543-1.04-12.326z"
                        fill="#6b7564"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M8.288 956.273v7.154l49.819 30.609 106.703-19.148-.688-8.074-56.843-22.667c-98.86 11.999-66.147 7.64-98.991 12.126z"
                        fill="#c9cfc8"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M7.964 955.34l.144 8.07 49.883 30.604 106.705-19.033-.578-8.07"
                        fill="#e8e5e2"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M9.033 956.023l48.928 29.734 104.674-18.899-54.996-23.008z"
                        fill="#f6f5f4"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M65.482 1000.414l111.75-17.927"
                        fill="none"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                        strokeLinecap="round"
                    />
                    <path
                        d="M3.772 988.437l.367 20.917 46.263 28.848 21.813 12.419-30.425-37.547z"
                        fill="#5c6557"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M82.304 1039.955l1.287 11.815"
                        fill="none"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M.566 962.05l62.21 38.978 19.634 39.236.78 11.23-11.039-.76-31.617-36.49-40.083-27.36z"
                        fill="#77826f"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M86.832 1039.169l106.12-20.817"
                        fill="none"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                        strokeLinecap="round"
                    />
                    <path
                        d="M70.193 1003.985l7.08 16.203 107.037-19.608-6.627-14.089z"
                        fill="#1d1920"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <path
                        d="M57.557 985.183l.145 8.679"
                        fill="none"
                        stroke="#1e1e1e"
                        strokeWidth={0.68}
                    />
                    <rect
                        width={40.348}
                        height={17.263}
                        x={-9.883}
                        y={1018.44}
                        transform="scale(-1 1) rotate(10)"
                        ry={8.083}
                        fill="maroon"
                        stroke="maroon"
                        strokeWidth={0.176}
                    />
                    <text
                        style={{
                            lineHeight: '125%',
                        }}
                        x={-98.081}
                        y={1054.296}
                        transform="matrix(1.02332 -.18044 .16711 .94775 0 0)"
                        fontWeight={400}
                        fontSize={24.352}
                        fontFamily="sans-serif"
                        letterSpacing={0}
                        wordSpacing={0}
                    >
                        <tspan
                            x={-98.081}
                            y={1054.296}
                            style={{
                                InkscapeFontSpecification: 'Silom',
                            }}
                            fontSize={13.5}
                            fontFamily="Silom"
                            fill="#0f0"
                        >
                            {parseFloat(mass).toFixed(4).toString() + ' g'}
                        </tspan>
                    </text>
                    <text
                        style={{
                            lineHeight: '125%',
                        }}
                        x={-42.682}
                        y={1030.649}
                        transform="rotate(-11)"
                        fontWeight={400}
                        fontSize={36}
                        fontFamily="sans-serif"
                        letterSpacing={0}
                        wordSpacing={0}
                        cursor="pointer"
                    >
                        <tspan onClick={this.zero}
                               x={-42.682}
                               y={1030.649}
                               style={{
                                   InkscapeFontSpecification: "'sans-serif Bold'",
                               }}
                               fontWeight={700}
                               fontSize={10.125}
                               fill="#fff"
                        >
                            {'ZERO'}
                        </tspan>
                    </text>
                </g>
            </svg>
        )
    }


}

export default SvgComponent
