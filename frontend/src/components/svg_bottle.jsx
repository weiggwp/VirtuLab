import React from 'react'

const SvgComponent =
    ({
         id,
         style = {},
         className = '',
         fill = "#dee4e4",
         equip = {},
         pre_fill_percent = equip.getFillPercent(),
         degree = equip.rotate,
         fill_percent = (pre_fill_percent > 1) ? 1 : (pre_fill_percent < 0) ? 0 : pre_fill_percent,


         viewBox = "7 4 34 40",
         size = 100,
         y_top = 17,
         y_bot = 44.3,
         current_y = y_bot - (y_bot - y_top) * fill_percent,

         y_radius_top = 1.3,
         y_radius_bot = 3,
         current_y_radius = y_radius_bot - (y_radius_bot - y_radius_top) * fill_percent,
         opacity = ((fill_percent === 0) ? 0 : .6),


     }) => (
        <svg
            id={id + equip.name}
            style={style}
            width={size}
            height={size * 1.5}
            viewBox={viewBox}
            className={className}
            transform={"rotate("+degree+")"}
            // viewBox="0 0 48 48" height={200} width={200} {...props}

        >
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse" id="a">
                    <path
                        fill="#fff"
                        strokeWidth={0.4}
                        stroke="#ff0"
                        d="M15 15.5L14 17l-1 2.7-.8 4.3.3 19.5.5 1.1 1 .95 1 .6 2 .65 2 .35 3 .2 3 .05 4-.2 2-.26 2-.49 1-.4 1-.55 1-1.04.4-.96.3-1.2.1-12.3-.1-4-.1-2-.65-4.3-1.1-2.7-1.05-1.5"
                    />
                </clipPath>
            </defs>


            <g opacity={opacity} fill={fill}>
                <ellipse
                    cx={24.5}
                    cy={current_y}
                    rx={12.1}
                    ry={current_y_radius}
                    clipPath="url('#a')"
                />
                <rect x={11.5} y={current_y} width={26} height={31}
                      clipPath="url('#a')"
                      opacity={0.6}
                />
            </g>
            <path
                d="M28.326 41.682c-6.918-.74-12.317-.083-14.73 1.73M35.062 43.31c-.764-.543-1.591-.829-3.001-1.033M35.397 43.932c-.958 3.431-19.618 3.881-21.853.23"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.117}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22.9 43.47c-1.728.618 5.424.532 3 0"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.117}
                strokeLinecap="round"
            />
            <path
                d="M36.688 41.826c-.186 1.944.055 5.564-12.342 5.57-12.429.006-11.838-3.586-11.88-5.384 0 0-.354-12.096-.354-14.609.051-6.621 1.338-9.915 2.791-11.704 1.803-2.219 3.863-2.12 4.14-3.182.234-.903-1.155-1.313-1.695-1.003-.927.816-2.516-.311-.928-1.616.25-.201.219-.565.145-.973-.256-1.75 1.223-4.296 4.755-3.033.695.254.641-2.15.611-3.076.07.753 5.133.676 5.097.018-.03 3.562 1.192 8.845 1.841 9.511 1.887 2.313 7.641.261 7.904 14.824.059 7.775-.086 12.27-.085 14.657z"
                fill="none"
                stroke="#323232"
                strokeWidth={0.187}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22.236 3.048c.871-.364 3.75-.368 4.499.035"
                fill="none"
                stroke="#333"
                strokeWidth={0.117}
                strokeLinecap="round"
            />
            <path
                d="M21.949 2.83c.091-.588 5.1-.669 5.032.051"
                fill="none"
                stroke="#333"
                strokeWidth={0.234}
            />
            <path
                d="M21.974 3.487c.829.4 3.754.648 4.996.002"
                fill="none"
                stroke="#000"
                strokeWidth={0.094}
                strokeLinecap="round"
            />
            <path
                d="M195.473 241.004a16.7 6.172 0 11-33.4 0 16.7 6.172 0 1133.4 0z"
                transform="matrix(.18052 0 0 .09352 -7.813 -18.872)"
                fill="#382e3f"
                stroke="#161413"
                strokeWidth={1.799}
                strokeMiterlimit={3.8}
            />
            <path
                d="M21.416 1.414V3.7c1.917.55 5.961.145 6.084 0l-.05-2.334c-1.348.698-4.722.631-6.034.048z"
                fill="#382e3f"
            />
            <path
                d="M195.473 241.004a16.7 6.172 0 11-33.4 0 16.7 6.172 0 1133.4 0z"
                transform="matrix(.18049 0 0 .09557 -7.807 -21.853)"
                fill="#736c77"
                stroke="#161413"
                strokeWidth={1.78}
                strokeMiterlimit={3.8}
            />
            <path
                d="M27.467 1.185v2.464M21.447 1.173V3.64"
                fill="none"
                stroke="#161413"
                strokeWidth={0.234}
                strokeMiterlimit={3.8}
            />
            <path d="M21.477 1.892c.926.668 5.162.643 5.941-.041" fill="none"/>
            <path
                d="M21.208 8.732a1.58 1.532 0 11-3.159 0 1.58 1.532 0 113.159 0z"
                fill="none"
                stroke="#323232"
                strokeWidth={0.187048}
            />
            <path
                d="M19.454 12.438c.135-.28-.129-.823-.35-.94-.56-.292-.305-1.07.644-.81.253.06.93-.204 1.164-.474M21.359 7.997c-.052-.248-.343-.62-.476-.683-1.048-.498-.6-1.476.673-.942.287.12.608-.486.733-.923M16.232 10.78c-.278.278.012.724.333.656.309-.064.18-.487.03-.557"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.07}
                strokeLinecap="round"
            />
            <path
                style={{
                    lineHeight: '125%',
                    InkscapeFontSpecification: 'Sans Bold',
                }}
                d="M13.88 33.717v-.563h-.539v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563zM15.56 33.717v-.563h-.54v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563zM20.599 33.717v-.563h-.54v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563zM22.278 33.717v-.563h-.54v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563z"
                fontSize={8}
                fontWeight={700}
                letterSpacing={0}
                wordSpacing={0}
                fill="none"
                fontFamily="Sans"
            />
        </svg>
    )

export default SvgComponent
