import React from 'react'

const SvgComponent =
    ({
         id,
         style = {},
         className = '',
         fill = "#dee4e4",
         equip ={},
         pre_fill_percent = equip.getFillPercent(),
         fill_percent = (pre_fill_percent>1) ? 1: (pre_fill_percent<0) ? 0: pre_fill_percent,
         degree = equip.rotate,


         viewBox = "7 4 34 40",
         size = 100,
         y_top = 17,
         y_bot = 44.3,
         current_y = y_bot - (y_bot - y_top) * fill_percent,

        y_radius_top = 1.3,
        y_radius_bot = 3,
        current_y_radius = y_radius_bot - (y_radius_bot - y_radius_top) * fill_percent, opacity = ((fill_percent === 0) ? 0 : .6),
        clip_id = equip.name+id+"clip",

     }) => (
        <svg
            id={id + equip.name}
            style={style}
            width={size}
            height={size * 1.5}
            viewBox={viewBox}
            className={className}
            transform={"rotate("+degree+")"}

        >
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse" id={clip_id}>
                    <path
                        fill="#fff"
                        strokeWidth={0.4}
                        stroke="#ff0"
                        d="M15 15.5L14 17l-1 2.7-.8 4.3.3 19.5.5 1.1 1 .95 1 .6 2 .65 2 .35 3 .2 3 .05 4-.2 2-.26 2-.49 1-.4 1-.55 1-1.04.4-.96.3-1.2.1-12.3-.1-4-.1-2-.65-4.3-1.1-2.7-1.05-1.5"
                    />
                </clipPath>
            </defs>
            <path
                d="M28.326 41.682c-6.918-.74-12.317-.083-14.73 1.73M35.062 43.31c-.764-.543-1.591-.829-3.001-1.033M35.397 43.932c-.958 3.431-19.618 3.881-21.853.23"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.117}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.522 22.183c.004-1.079 11.702-.931 13.844-.944l-.082 7.768L12.551 30"
                fill="#e9e9e9"
                stroke="#161413"
                strokeWidth={0.14}
            />

            <g opacity={opacity} fill={fill}>
                <ellipse
                    cx={24.5}
                    cy={current_y}
                    rx={12.1}
                    ry={current_y_radius}
                    clipPath={"url('#"+clip_id+"')"}
                />
                <rect x={11.5} y={current_y} width={26} height={31}
                    clipPath={"url('#"+clip_id+"')"}
                    opacity={0.6}
                />
            </g>
            <path
                d="M22.9 43.47c-1.728.618 5.424.532 3 0"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth={0.117}
                strokeLinecap="round"
            />
            <path
                d="M12.473 22.38c1.724 1.779 11.985 1.654 16.838 1.374l-.028 15.553c-1.12.31-13.336 1.411-16.89-1.485-.111-6.056-.297-14.147.08-15.443z"
                fill="#f7fafa"
            />
            <path
                d="M12.3 36.523c1.495.967 6.152 2.169 14.617 1.59"
                fill="none"
                stroke="#46443a"
                strokeWidth={0.2}
                strokeLinecap="round"
            />
            <path
                d="M12.192 31.488c2.468 1.08 5.299 1.29 6.743 1.216"
                fill="none"
                stroke="#46443a"
                strokeWidth={0.695}
            />
            <path
                d="M12.172 30.314c1.927 1.053 5.772 1.294 7.786 1.266M12.205 28.807c1.927 1.052 5.772 1.294 7.786 1.265"
                fill="none"
                stroke="#46443a"
                strokeWidth={0.2}
                strokeLinecap="round"
            />
            <path
                d="M20.99 27.289h6.088v7.015c-1.866.311-4.095.219-6.17.155z"
                fill="#fa9d00"
            />
            <path
                d="M24.27 33.262c-.113.047-.08-1.057-.31-1.065-.245-.008-.173 1.2-.41 1.19-1.235-.047-1.539-1.198-1.462-1.45.357.543.403-1.84.505-1.161.162 1.072.531-1.503.65-1.187.354.942.75-.337.738-1.043-.01-.616.654 2.748 1.102 1.115.158-.574.025 1.755.399.96.307-.654.031 1.256.421 1.008-.114 1.753-1.67 2.106-1.667 1.569"
                opacity={0.801}
            />
            <path
                d="M12.295 24.191c3.829 2.035 11.8 1.645 16.992 1.303v1.943c-5.141.211-13.394.635-17.062-1.215z"
                fill="#ff1810"
            />
            <path
                d="M12.185 29.81c1.927 1.054 5.771 1.295 7.785 1.266M12.197 29.308c1.927 1.052 5.772 1.293 7.786 1.265M12.16 28.264c1.927 1.053 5.772 1.294 7.786 1.266"
                fill="none"
                stroke="#46443a"
                strokeWidth={0.2}
                strokeLinecap="round"
            />
            <path
                d="M12.194 27.71c1.276.723 3.386 1.092 4.969 1.172M12.206 27.269c1.264.711 3.387 1.092 4.969 1.173"
                fill="none"
                stroke="#46443a"
                strokeWidth={0.17}
                strokeLinecap="round"
            />
            <path
                d="M12.33 34.123c1.494.967 6.151 2.169 14.617 1.59M12.3 36.055c1.495.967 6.152 2.168 14.617 1.589M12.3 35.551c1.495.967 6.152 2.169 14.617 1.59M12.335 34.597c1.494.967 6.151 2.168 14.617 1.589M12.318 35.083c1.494.967 6.151 2.168 14.617 1.589"
                fill="none"
                stroke="#46443a"
                strokeWidth={0.2}
                strokeLinecap="round"
            />
            <path
                d="M12.222 32.593c2.467 1.08 5.298 1.29 6.742 1.216"
                fill="none"
                stroke="#46443a"
                strokeWidth={0.695}
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
                d="M12.475 22.186c-.065 1.259 7.38 2.213 16.854 1.548l-.07 15.6c-2.642.67-14.242.815-16.94-1.561"
                fill="none"
                stroke="#161413"
                strokeWidth={0.14}
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
            <path fill="#f7fafa" d="M15.899 31.957h4.653v2.915h-4.653z"/>
            <path
                style={{
                    lineHeight: '125%',
                    InkscapeFontSpecification: 'Sans Bold',
                }}
                d="M13.88 33.717v-.563h-.539v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563zM15.56 33.717v-.563h-.54v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563z"
                fontSize={8}
                fontWeight={700}
                letterSpacing={0}
                wordSpacing={0}
                fill="none"
                fontFamily="Sans"
            />
            <path
                style={{
                    lineHeight: '125%',
                    InkscapeFontSpecification: 'Sans Bold',
                }}
                d="M17.88 33.926l-.03.385-1.378-.104c.025-.144.08-.278.165-.403.085-.124.245-.286.481-.484.19-.16.308-.27.353-.329a.472.472 0 00.1-.247.292.292 0 00-.054-.218.257.257 0 00-.19-.089.257.257 0 00-.202.063c-.052.049-.087.133-.103.253l-.39-.07c.041-.227.127-.384.257-.474a.716.716 0 01.474-.114c.202.015.357.084.464.208a.58.58 0 01.142.441.825.825 0 01-.07.274c-.04.085-.1.174-.18.264-.052.06-.144.146-.277.256a4.29 4.29 0 00-.254.22.73.73 0 00-.09.11zM18.356 34.397l.052-2.146.416.01-.044 1.782 1.033.025-.008.365z"
                fontSize={8}
                fontWeight={700}
                letterSpacing={0}
                wordSpacing={0}
                fill="#fff"
                stroke="#333"
                strokeWidth={0.117}
                fontFamily="Sans"
            />
            <path
                style={{
                    lineHeight: '125%',
                    InkscapeFontSpecification: 'Sans Bold',
                }}
                d="M20.599 33.717v-.563h-.54v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563zM22.278 33.717v-.563h-.54v-.388h.54v-.563h.36v.563h.54v.388h-.54v.563z"
                fontSize={8}
                fontWeight={700}
                letterSpacing={0}
                wordSpacing={0}
                fill="none"
                fontFamily="Sans"
            />
        </svg>
    );


export default SvgComponent
