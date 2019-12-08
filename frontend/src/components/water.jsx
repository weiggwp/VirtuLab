import React from 'react'

const SvgComponent =
    ({
         style = {},
         className = '',
         // fill = "#dee4e4",
         fill = 'blue',
         fill_percent = 0,

         top_eclipse_color = "#ffffff",
         // width = '100%',
         // height = '100%',
         viewBox = "7 4 34 40",
         size = 100,
         // height="150px",
         // width="100px",
         y_top = 17.2,
         y_bot = 42.5,
         current_y = y_bot - (y_bot - y_top) * fill_percent,
         opacity = ((fill_percent === 0) ? 0 : .4),


     }) => (
        <svg
            style={style}
            width={size}
            height={size*1.5}
            viewBox={viewBox}
            className={className}
            // viewBox="0 0 48 48" height={200} width={200} {...props}

        >


            <path
                d="M38.215 17.143
            a14.033 2.25 0 11-28.066 0 14.033 2.25 0 1128.066 0z"
                fill="none"
            />
            <path
                d="M29.051 38.323a44.118 44.118 0 00-4.878-.263c-5.73 0-10.657 1.036-12.844 2.521"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.101}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M37.017 40.581c-.754-.512-1.834-.97-3.16-1.352"
                fill="#fbfbfb"
                stroke="#1e1e1e"
                strokeWidth={0.101}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M31.623 46.075c-3.906.72-20.576 1.586-21.005-4.407"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.101}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.523 16.832l26.767.171
            c.023 23.983.164 1.597.02 23.67-.005.771-.01 1.597-.203 2.481-1.277 5.363-27.43 5.926-27.878-.734.059-25.264-.105.004-.021-25.275z"
                opacity={0.801}
                fill="none"
                fillOpacity={0.596}
            />


            <g opacity={opacity}>
                    <ellipse cx={24} cy={current_y} rx={14} ry={2.5} fill={fill}/>
                    {/*<ellipse cx={24} cy={current_y} rx={14} ry={2.5} fill={top_eclipse_color} opacity={.6}/>*/}
                <g fill={fill} opacity={.6}>
                    <rect width="28" height={(y_bot - y_top) * fill_percent} x="10" y={((current_y<y_top) ? y_top:current_y)}/>
                    {/*<path d="M10 17h28v25H10z" />*/}
                    <ellipse cx={24} cy={y_bot} rx={14} ry={4.5} />
                </g>
            </g>
            <path
                d="M29.932 37.075a20.39 20.39 0 001.83-.182"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth={0.162}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M29.937 32.665c.66-.038 1.273-.1 1.83-.182M29.848 41.435c.66-.037 1.274-.098 1.83-.181"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth={0.101}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M29.9 28.258c.66-.038 1.274-.099 1.83-.182"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth={0.162}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M29.941 23.848c.66-.038 1.274-.099 1.83-.182"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth={0.101}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M29.868 19.399a20.39 20.39 0 001.83-.182"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth={0.162}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M35.833 42.11l-1.931-.721h1.416"
                fill="#fbfbfb"
                stroke="#000"
                strokeWidth={0.142}
            />
            <path
                d="M31.719 10.071c3.283.767 6.6 3.188 6.58 6.642 0 21.65.02 21.64.02 25.182 0 1.997-1.946 5.299-14.18 5.299-12.233 0-14.05-3.35-14.05-5.347 0 0 .072-22.747.072-25.119.171-3.961 2.986-5.665 6.5-6.666 4.065-.95 4.938-.661 4.955-4.098 1.805 1.033 3.418 1.202 5.628 0-.03 3.36 2.157 3.482 4.475 4.107z"
                fill="none"
                stroke="#323232"
                strokeWidth={0.162}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                transform="matrix(.20317 0 0 .16627 -11.923 -34.131)"
                d="M195.473 241.004a16.7 6.172 0 11-33.4 0 16.7 6.172 0 1133.4 0z"
                fill="#f6f5f4"
                stroke="#161413"
                strokeWidth={1.103}
                strokeMiterlimit={3.8}
            />
            <path fill="#f6f5f4" d="M20.972 1.606h6.889v4.355h-6.889z"/>
            <path
                transform="matrix(.20314 0 0 .16993 -11.916 -39.431)"
                d="M195.473 241.004a16.7 6.172 0 11-33.4 0 16.7 6.172 0 1133.4 0z"
                fill="#fbfbfb"
                stroke="#1e1e1e"
                strokeWidth={1.092}
                strokeMiterlimit={3.8}
            />
            <path
                d="M27.785 1.534v4.587"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.208}
                strokeMiterlimit={3.8}
            />
            <path
                d="M21.01 1.51V5.97"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.205}
                strokeMiterlimit={3.8}
            />
            <path
                d="M22.983 6.467c2.25.221 3.457.006 4.464-.538M21.37 5.947c.298.24.785.376 1.04.43M21.323 2.37c.962.807 5.431.886 6.24-.015"
                fill="none"
                stroke="#323232"
                strokeWidth={0.101}
                strokeLinecap="round"
            />
            <path
                transform="matrix(.21475 0 0 .21357 -15.246 -49.667)"
                d="M226.54 436.646a6.762 6.673 0 11-13.524 0 6.762 6.673 0 1113.523 0z"
                fill="#fbfbfb"
                stroke="#323232"
                strokeWidth={0.947}
            />
            <path
                d="M33.978 45.317l-2.026-.789c-.493-.651-.3-1.464.663-1.524l.968.18"
                fill="#fbfbfb"
                stroke="#323232"
                strokeWidth={0.203}
                strokeLinejoin="round"
            />
            <path
                d="M33.897 41.396c.007.628-.182 1.59.66 1.68l1.229.228c.262.043.17-.447.152-.976"
                fill="#fbfbfb"
                stroke="#000"
                strokeWidth={0.161}
                strokeLinecap="round"
            />
            <path
                d="M33.937 42.705c-.287.082-.455.29-.336.71l.672 3.295c.758.481 1.265.301 1.75.013l.468-2.345c.213-.963.417-1.375-.032-1.553"
                fill="#fbfbfb"
                stroke="#323232"
                strokeWidth={0.203}
                strokeLinejoin="round"
            />
            <path
                d="M35.913 43.291l.52-.127c.19-.039.06-.521.064-1.056"
                fill="#fbfbfb"
                stroke="#000"
                strokeWidth={0.161}
                strokeLinecap="round"
            />
            <path
                d="M36.134 43.17c-.458.035-.02-.638-.222-.839-.014-.014-3.57-1.551-3.625-1.551-.21 0-1.122-.636-.871-.887.129-.129 1.452.186 1.504.206.29.108.479.358.744.49.189.095.503.027.728.127.953.424 1.573.94 2.058 1.425.083.083.088.99.08.997-.06.06-.287.032-.396.032z"
                fill="#fbfbfb"
            />
            <path
                d="M31.309 39.885l2.164-.12 3.017 2.332"
                fill="#fbfbfb"
                stroke="#323232"
                strokeWidth={0.203}
            />
            <path
                d="M35.279 42.331l-1.33-.839.055-.11 1.29.015.587.823v.238z"
                fill="#fbfbfb"
            />
            <path
                d="M33.897 41.43c.008.628-.181 1.557.66 1.648l1.23.228c.261.043.168-.446.151-.976"
                fill="#fbfbfb"
                stroke="#323232"
                strokeWidth={0.203}
                strokeLinecap="round"
            />
            <path
                d="M31.412 39.935l-.012.519 4.538 1.876"
                fill="#fbfbfb"
                stroke="#323232"
                strokeWidth={0.203}
            />
            <path
                d="M31.699 40.158l4.31 2.028.266-.05"
                fill="#fbfbfb"
                stroke="#1e1e1e"
                strokeWidth={0.101}
                strokeLinecap="round"
            />
            <path
                d="M35.913 43.293l.52-.127c.19-.039.06-.52.064-1.055"
                fill="#fbfbfb"
                stroke="#323232"
                strokeWidth={0.203}
                strokeLinecap="round"
            />
            <path
                d="M12.543 14.386c.999 3.062 21.17 3.087 23.054 0"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.101}
                strokeLinecap="round"
            />
            <path
                d="M31.942 18.885l.244-.038a.21.21 0 00.07.13.18.18 0 00.126.04.177.177 0 00.13-.06.205.205 0 00.047-.152.191.191 0 00-.058-.138.17.17 0 00-.127-.047.475.475 0 00-.116.023l.02-.193c.068-.001.12-.017.155-.048a.143.143 0 00.049-.12.128.128 0 00-.044-.096.15.15 0 00-.107-.033.16.16 0 00-.11.047.19.19 0 00-.05.125l-.236-.027a.465.465 0 01.066-.181.328.328 0 01.133-.11.492.492 0 01.195-.048.41.41 0 01.305.098.279.279 0 01.102.2c.004.108-.055.197-.18.267a.313.313 0 01.187.093.28.28 0 01.076.187.357.357 0 01-.115.281.458.458 0 01-.312.128.458.458 0 01-.302-.083.369.369 0 01-.148-.245z"
                style={{
                    lineHeight: '125%',
                    InkscapeFontSpecification: 'Sans Bold',
                }}
                fontSize={13}
                fontWeight={700}
                letterSpacing={0}
                wordSpacing={0}
                fill="#1a1a1a"
                fontFamily="Sans"
            />
            <text
                transform="matrix(1.04483 -.07306 .0666 .95244 0 0)"
                y={40.925}
                x={27.844}
                style={{
                    lineHeight: '.01%',
                    InkscapeFontSpecification: "'Sans Bold'",
                }}
                fontWeight={700}
                fontSize={1.358}
                fontFamily="sans-serif"
                letterSpacing={0}
                wordSpacing={0}
                fill="#1a1a1a"
                strokeWidth={0.113}
            >
                <tspan y={40.925} x={27.844}>
                    <tspan
                        style={{
                            lineHeight: 1.25,
                        }}
                        y={40.925}
                        x={27.844}
                        fontSize={1.471}
                    >
                        {'1'}
                    </tspan>
                </tspan>
            </text>
            <text
                transform="matrix(1.00153 -.11057 .1089 .98645 0 0)"
                y={31.742}
                x={28.555}
                style={{
                    lineHeight: '.01%',
                    InkscapeFontSpecification: "'Sans Bold'",
                }}
                fontWeight={700}
                fontSize={1.291}
                fontFamily="sans-serif"
                letterSpacing={0}
                wordSpacing={0}
                fill="#1a1a1a"
                strokeWidth={0.108}
            >
                <tspan y={31.742} x={28.555}>
                    <tspan
                        style={{
                            lineHeight: 1.25,
                        }}
                        y={31.742}
                        x={28.555}
                        fontSize={1.399}
                    >
                        {'2'}
                    </tspan>
                </tspan>
            </text>
            <path
                d="M29.829 19.324v22.108"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth={0.162}
            />
        </svg>
    )

export default SvgComponent
