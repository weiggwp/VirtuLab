import React from 'react'

const SvgComponent =
    ({
        id,
         style = {},
         className = '',
         fill = "white",
         equip ={},
         pre_fill_percent = equip.getFillPercent(),
         fill_percent = (pre_fill_percent>1) ? 1: (pre_fill_percent<0) ? 0: pre_fill_percent,


         viewBox="12 0 24 48",
         size = 100,

         y_top = 16.1,
         y_bot = 40,
         current_y = y_bot - (y_bot - y_top) * fill_percent,

         radius_top = 1.3,
         radius_bot = 10,
         current_top_radius = radius_bot- (radius_bot-radius_top) *fill_percent,

         y_radius_top = .286,
         y_radius_bot = 1.3,
         current_top_y_radius = y_radius_bot- (y_radius_bot-y_radius_top) *fill_percent,

         opacity = ((fill_percent === 0) ? 0 : .6),


     }) => (
        <svg
            id={id+equip.name}
            width={size}
            style={style}
            height={size*2}
            viewBox={viewBox}
            className={className}
            // viewBox="0 0 48 48" height={200} width={200} {...props}
        >
            <defs id="prefix__defs3479">
                <clipPath clipPathUnits="userSpaceOnUse" id="clippath1">
                    <path
                        transform="matrix(.36 0 0 .39 117.1 -137.5)"
                        className="prefix__st0"
                        id="prefix__polyline4156"
                        fill="#00f"
                        stroke="#010101"
                        strokeMiterlimit={10}
                        d="M-262.5 370v43h0l-.2 1.6-.2.4-1.3 2.5-1.6 1.7-1.4 1.7-1.7 2-2 2-1.5 1.7-1.4 1.4-1.2 1.3-1.3 1.7-1.8 2.6-1.1 1.8-1.1 1.8-.3.9-.3 1.4-.5 2.2v3.2l.5 4.1.6 1.8.7 1.5 1.2 1.6 1.2 1.1 1.3 1.1 1.3.8.9.4.4.4 1.2.4 1 .2 1.8.6 2.8.3 3.2.3h5-.4 5l3.2-.3 2.8-.3 1.8-.6 1-.2 1.2-.4.4-.4.9-.4 1.2-.8 1.2-1.1 1.2-1.1 1.2-1.6.5-1.5.9-1.7.3-4.2.3-3.2-.5-2.2-.3-1.4-.3-.9-1.1-1.8-1.1-1.8-1.8-2.6-1.3-1.7-1.2-1.3-1.4-1.4-1.5-1.7-2.1-2-1.6-2-1.4-1.7-1.9-1.7-1-1.8-.4-1.1V370"
                    />
                </clipPath>
            </defs>
            <style type="text/css" id="style3415">
                {'.prefix__st0{fill:none;stroke:#000;stroke-miterlimit:10}'}
            </style>

            <g id="prefix__vf1000" transform="matrix(.13333 0 0 .13333 11.56 -33.22)">
                <path
                    className="prefix__st0"
                    id="prefix__XMLID_62_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                    d="M103.2 426V303.8"
                />
                <path
                    className="prefix__st0"
                    id="prefix__XMLID_14_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                    d="M88 561.8h14.6l9.1-1 8.2-1 5.2-1.6 2.9-.9 3.4-1.1 1.4-1.1 2.5-1.3 3.7-2.3 3.9-3.3 3.5-3.4 3.5-4.7 2-4.4 1.7-5.3 1.5-12.5v-9.1l-1.4-6.8-.9-4.2-.9-2.5-3.1-5.4-3.4-5.4-5.2-7.6-3.7-5.1-3.5-3.8-4.1-4.2-4.5-5.1-5.7-6-4.8-6-4-4.9-3.5-5.2-2.3-5.2-.9-3.4v-2.7"
                />
                <path
                    className="prefix__st0"
                    id="prefix__XMLID_60_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                    d="M98.6 561.8H84l-9.1-1-8.2-1-5.1-1.6-3-.9-3.4-1.1-1.4-1.1-2.5-1.3-3.7-2.3-3.9-3.3-3.5-3.4-3.4-4.7-2.1-4.4-1.7-5.3-1.5-12.5v-9.1l1.4-6.8.9-4.2.9-2.5 3.1-5.4 3.5-5.4 5.1-7.6 3.7-5.1 3.6-3.8 4-4.2 4.5-5.1 5.7-6 4.8-6 4.1-4.9 3.4-5.2 2.3-5.2.9-3.4v-2.7"
                />
                <path
                    className="prefix__st0"
                    id="prefix__XMLID_61_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                    d="M83.4 426V303.8"
                />
                <path
                    d="M56.1 550.1c-.1 4.2 11 7.7 24.7 8"
                    className="prefix__st0"
                    id="prefix__XMLID_17_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                />
                <path
                    d="M131.2 550.3c.1-6-12.8-11-28.8-11.3"
                    className="prefix__st0"
                    id="prefix__XMLID_18_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                />
                <path
                    d="M131.3 552.4c-.1 3.6-21.4 6.1-47.7 5.6"
                    className="prefix__st0"
                    id="prefix__XMLID_19_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                />
                <path
                    d="M56.2 547.5c.1-5.2 19.4-9 43.2-8.6"
                    className="prefix__st0"
                    id="prefix__XMLID_20_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                />
                <ellipse
                    ry={2}
                    rx={9.9}
                    cy={370.2}
                    cx={93.3}
                    id="prefix__XMLID_4_"
                    fill="none"
                    stroke="#000"
                    strokeWidth={0.5}
                    strokeMiterlimit={10}
                />
                <path
                    className="prefix__st0"
                    id="prefix__XMLID_8_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                    d="M81.2 299.7v2.5"
                />
                <path
                    className="prefix__st0"
                    id="prefix__XMLID_9_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                    d="M105.4 299.7v2.5"
                />
                <path
                    d="M104.4 300.9c.7.4 1 .8 1 1.3 0 1.8-5.4 3.2-12.1 3.2-6.7 0-12.1-1.4-12.1-3.2 0-.4.3-.9 1-1.2"
                    className="prefix__st0"
                    id="prefix__XMLID_6_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                />
                <path
                    d="M82.1 300.9c1.8-1.1 6.1-1.9 11.2-1.9 5 0 9.2.8 11.1 1.9"
                    id="prefix__XMLID_1_"
                    fill="none"
                    stroke="#4d4d4f"
                    strokeMiterlimit={10}
                />
                <ellipse
                    ry={3.2}
                    rx={12.1}
                    cy={299.7}
                    cx={93.3}
                    className="prefix__st0"
                    id="prefix__XMLID_5_"
                    fill="none"
                    stroke="#000"
                    strokeMiterlimit={10}
                />
            </g>

            <g opacity={opacity}>
                <ellipse
                    cx={24}
                    cy={current_y}
                    rx={current_top_radius}
                    ry={current_top_y_radius}
                    clipPath="url('#clippath1')"
                    fill={fill}
                />
                <g fill={fill} opacity={.6}>
                    <rect width={18} height={26}
                          x="15" y={((current_y<y_top) ? y_top:current_y)}
                          clipPath="url('#clippath1')"
                    />
                </g>
            </g>
        </svg>
    );

export default SvgComponent
