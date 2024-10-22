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


         viewBox = "14 11 21 25",
         size = 100,

         y_top = -5.47,
         y_bot = 17.8,
         current_y = y_bot - (y_bot - y_top) * fill_percent,
         opacity = ((fill_percent === 0) ? 0 : 1),

        x_top = 1.35,
        x_bot = .3,
        current_x = x_bot + (x_top-x_bot) * fill_percent,
         clip_id = equip.name+id+"clip",


     }) => (
        <svg
            style={style}
            width={size}
            height={size * 2}
            viewBox={viewBox}
            className={className}
            transform={"rotate("+degree+")"}


        >

            <g fill="none" strokeLinecap="round" strokeLinejoin="round">

                <g
                    id="g9614"
                    transform="translate(23.555356,20.190304)"
                    opacity={opacity} fill={fill}>
                    <ellipse cx={current_x} cy={current_y} rx={3.7} ry={1} transform="rotate(-3)" />
                    <g opacity={0.6}>
                        <rect x={-2.6} y={current_y} width={7.45} height={(y_bot - y_top) * fill_percent} />
                        <ellipse cx={.3} cy={17.8} rx={3.6} ry={1.1} transform="rotate(-3)" />
                    </g>
                </g>
                <path
                    d="M115.542 40.205c-1.181-.558-1.452-1.264-1.452-1.86M130.739 38.345c0 1.192-1.075 2.825-8.315 2.825-2.493 0-4.254-.193-5.493-.496M129.886 39.37c0-.603-1.302-1.135-3.283-1.45M124.391 37.682a30.91 30.91 0 00-1.972-.062c-4.124 0-7.467.783-7.467 1.75M125.44 36.295a28.324 28.324 0 00-3.02-.158c-3.548 0-6.6.619-7.954 1.505M130.372 37.642c-.485-.318-1.114-.573-1.956-.807"
                    stroke="#1e1e1e"
                    strokeWidth={0.123}
                />
                <path
                    d="M127.773 34.866c-.54.119-1.14.22-1.786.303V16.587a20.862 20.862 0 001.786-.303"
                    stroke="#000"
                    strokeWidth={0.204}
                />
                <path
                    d="M112.072 8.15c.117-.075.382-.152.507-.175 1.004-.191 1.698-.153 2.899.121 1.729.395 4.117.64 6.756.64 3.87 0 7.06-.557 8.57-1.285.364-.176.558-.416.597-.59"
                    stroke="#323232"
                    strokeWidth={0.163}
                />
                <path
                    d="M131.255 8.77v29.847c0 1.21-1.142 3.24-8.833 3.24-7.69 0-8.832-2.03-8.832-3.24V10.61s.107-1.64-1.452-1.865c-.078-.01-.328.1-.415.097-.5-.02-.614-.598.213-1.375.92-.865.488-1.814 2.317-2.46 1.751-.618 4.745-1.102 8.17-1.102 5.374 0 9.731 1.099 9.731 2.415 0 .954-.9 1.05-.9 2.45z"
                    stroke="#323232"
                    strokeWidth={0.204}
                />
                <path
                    d="M125.987 22.766a20.744 20.744 0 001.786-.303M125.987 28.958a20.785 20.785 0 001.786-.303"
                    stroke="#000"
                    strokeWidth={0.163}
                />
                <path
                    d="M112.912 8.395c1.21-.13 1.541.013 2.586.278l.214.054M131.141 7.903c-1.609.99-5.033 1.524-8.722 1.524-1.918 0-3.706-.145-5.214-.395M127.7 4.997c1.429.266 2.73.715 3.25 1.068.238.162.376.348.376.568M113.008 7.28c.309-.758.488-1.384 2.189-1.89 1.755-.522 4.279-.85 7.083-.85 1.39 0 2.71.081 3.903.226"
                    stroke="#1e1e1e"
                    strokeWidth={0.082}
                />
                <path
                    d="M107.08 38.561c0-.563-1.218-1.06-3.07-1.355M93.668 39.342c-1.105-.521-1.358-1.181-1.358-1.739M101.941 36.983a28.959 28.959 0 00-1.843-.058c-3.856 0-6.982.733-6.982 1.636"
                    stroke="#1e1e1e"
                    strokeWidth={0.13055158000000003}
                />
                <path
                    d="M107.876 37.603c0 1.115-1.005 2.642-7.774 2.642-2.33 0-3.977-.181-5.136-.464M107.533 36.928c-.436-.286-1.061-.541-1.829-.754M102.922 35.668c-.88-.095-1.831-.147-2.824-.147-3.317 0-6.17.578-7.436 1.407"
                    stroke="#1e1e1e"
                    strokeWidth={0.13055158000000003}
                />
                <path
                    d="M103.65 25.959a19.72 19.72 0 001.696-.288M103.65 28.65a19.72 19.72 0 001.696-.288M103.65 31.36a19.72 19.72 0 001.696-.288"
                    stroke="#000"
                    strokeWidth={0.1737557}
                />
                <path
                    d="M105.346 33.826a19.8 19.8 0 01-1.696.288V23.173a19.887 19.887 0 001.696-.288"
                    stroke="#000"
                    strokeWidth={0.21789904000000002}
                />
                <path
                    d="M90.28 17.104c.11-.067.36-.137.478-.158.95-.173 1.606-.138 2.741.11 1.634.356 3.892.576 6.387.576 3.658 0 6.675-.502 8.101-1.16.345-.158.528-.374.565-.53"
                    stroke="#323232"
                    strokeWidth={0.1737557}
                />
                <path
                    d="M108.487 17.665V37.82c0 1.149-1.084 3.075-8.383 3.075-7.3 0-8.384-1.926-8.384-3.075V19.41s.103-1.556-1.415-1.746c-.063-.008-.286.065-.355.063-.435-.017-.536-.608.2-1.3.873-.82.463-1.722 2.199-2.335 1.662-.586 4.505-1.046 7.755-1.046 5.101 0 9.237 1.043 9.237 2.293 0 .905-.854.997-.854 2.325z"
                    stroke="#323232"
                    strokeWidth={0.21789904000000002}
                />
                <path
                    d="M91.209 17.362c1.131-.122 1.441.013 2.418.26l.2.051M108.252 16.903c-1.504.925-4.706 1.424-8.154 1.424-1.794 0-3.466-.135-4.876-.37M105.11 14.185c1.343.25 2.567.67 3.055 1 .225.15.354.325.354.53M91.298 16.32c.29-.708.46-1.294 2.058-1.767 1.65-.488 4.023-.794 6.66-.794 1.306 0 2.547.075 3.668.21"
                    stroke="#1e1e1e"
                    strokeWidth={0.08734746}
                />
                <path
                    d="M60.643 9.014c1.687-.182 2.149.019 3.605.388.095.024.195.05.299.075M81.386 4.412c2.001.359 3.823.963 4.55 1.438.334.217.527.469.527.765M60.21 8.188c.378-.28.706-.927.753-1.036.373-.872.806-1.605 2.923-2.21 2.457-.703 5.99-1.144 9.915-1.144 1.945 0 3.794.109 5.463.303"
                    stroke="#1e1e1e"
                    strokeWidth={0.105564}
                />
                <path
                    d="M64.31 40.447c-1.648-.796-2.025-1.804-2.025-2.655M85.497 37.792c0 1.702-1.498 4.033-11.592 4.033-3.475 0-5.932-.276-7.659-.708M84.31 39.408c0-.841-1.816-1.583-4.578-2.021"
                    stroke="#1e1e1e"
                    strokeWidth={0.17594}
                />
                <path
                    d="M76.647 37.054a43.144 43.144 0 00-2.75-.086c-5.749 0-10.41 1.092-10.41 2.44M78.11 35.075a39.5 39.5 0 00-4.212-.22c-4.946 0-9.2.862-11.088 2.099M84.986 36.954c-.65-.426-1.582-.808-2.727-1.125"
                    stroke="#1e1e1e"
                    strokeWidth={0.17594}
                />
                <path
                    d="M59.684 8.895c.163-.114.534-.231.708-.267 1.406-.29 2.376-.232 4.056.185 2.418.6 5.76.971 9.45.971 5.413 0 9.735-.845 11.846-1.953.51-.267.788-.631.842-.895"
                    stroke="#323232"
                    strokeWidth={0.28150400000000003}
                />
                <path
                    d="M86.059 8.328c-2.244 1.38-7.018 2.125-12.161 2.125-2.674 0-5.168-.203-7.27-.551"
                    stroke="#1e1e1e"
                    strokeWidth={0.105564}
                />
                <path
                    d="M86.027 9.831V38.03c0 1.662-1.567 4.45-12.129 4.45s-12.13-2.788-12.13-4.45v-25.67s.145-2.358-1.963-2.684c-.116-.018-.425.085-.555.08-.595-.023-.68-.842.247-1.713 1.263-1.188.67-2.491 3.181-3.378 2.405-.848 6.518-1.514 11.22-1.514 7.381 0 13.365 1.51 13.365 3.317 0 1.31-1.236 1.443-1.236 3.364z"
                    stroke="#323232"
                    strokeWidth={0.28150400000000003}
                />
                <path
                    d="M79.459 20.627a28.6 28.6 0 002.452-.417M79.459 24.417a28.6 28.6 0 002.452-.416M79.459 28.208a28.6 28.6 0 002.452-.416M79.459 31.998a28.6 28.6 0 002.452-.416"
                    stroke="#161413"
                    strokeWidth={0.25370548}
                />
                <path
                    d="M81.911 35.373a28.6 28.6 0 01-2.452.416V16.836a28.6 28.6 0 002.452-.416"
                    stroke="#000"
                    strokeWidth={0.17594}
                />
                <path
                    d="M20.858 37.468l-3.15 2.296a.246.246 0 00-.085.178v.183c0 .065.04.14.089.17l4.72 2.823c.048.029.132.047.187.04l7.959-1.09c.054-.008.098-.066.098-.13v-.184c0-.064-.002-.169-.006-.233l-.156-2.717c-.003-.064-.049-.134-.1-.155l-1.51-.621"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M29.802 39.33c0 1.1-2.305 1.992-5.15 1.992-1.315 0-5.158-.303-5.026-1.882"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M17.623 39.826l4.809 2.875c.048.03.132.047.187.04l8.057-1.103"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M21.193 37.561c1.447-.577 4.846-.437 6.846.107"
                    stroke="#1e1e1e"
                    strokeWidth={0.077}
                />
                <path
                    d="M19.658 39.27c.351-.672.857-1.25 1.48-1.722"
                    stroke="#323232"
                    strokeWidth={0.13}
                />
                <path
                    d="M28.348 37.593a5.091 5.091 0 011.445 1.609"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M28.348 37.813c-.243.582-1.172 1.26-4.188 1.26-1.27 0-2.99-.392-3.049-1.184"
                    stroke="#1e1e1e"
                    strokeWidth={0.077}
                />
                <path
                    d="M20.261 7.24a.718.718 0 01.215-.09c.425-.096.719-.076 1.227.062.731.2 1.742.322 2.858.322 1.638 0 2.988-.28 3.627-.648.154-.088.236-.21.253-.297"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M20.688 7.38c.505-.063.643.007 1.08.137l.089.026M28.296 7.14c-.671.484-2.1.746-3.64.746-.8 0-1.547-.071-2.176-.194M26.86 5.718c.596.13 1.14.35 1.356.523.1.079.157.17.157.278M20.728 6.835c.13-.37.204-.677.914-.925.732-.255 1.786-.415 2.956-.415.58 0 1.131.04 1.629.11"
                    stroke="#1e1e1e"
                    strokeWidth={0.051}
                />
                <path
                    d="M20.959 37.487V8.466s.044-.808-.608-.918c-.032-.006-.137.049-.173.047-.21-.01-.257-.294.089-.677.385-.426.204-.893.969-1.21.732-.305 1.985-.543 3.417-.543 2.249 0 4.071.54 4.071 1.189 0 .47-.376.517-.376 1.206v29.913"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M27.836 14.927c-.646.408-1.827.68-3.177.68M24.66 20.306c1.35 0 2.53-.273 3.176-.682M24.66 25.004c1.35 0 2.53-.274 3.176-.682M24.66 29.701c1.35 0 2.53-.273 3.176-.68M24.66 34.4c1.35 0 2.53-.274 3.176-.682"
                    stroke="#000"
                    strokeWidth={0.128}
                />
                <path
                    d="M25.893 16.468c.818-.11 1.504-.325 1.943-.602M25.893 17.407c.818-.11 1.504-.324 1.943-.601M25.893 18.347c.818-.11 1.504-.325 1.943-.602M27.836 18.685c-.44.277-1.125.492-1.943.601M25.893 21.165c.818-.109 1.504-.324 1.943-.601M25.893 22.105c.818-.11 1.504-.324 1.943-.602M25.893 23.045c.818-.11 1.504-.325 1.943-.602M25.893 23.984c.818-.11 1.504-.324 1.943-.601M25.893 25.863c.818-.11 1.504-.324 1.943-.601M25.893 26.803c.818-.11 1.504-.324 1.943-.602M25.893 27.742c.818-.109 1.504-.324 1.943-.601M25.893 28.682c.818-.11 1.504-.324 1.943-.602M25.893 30.561c.818-.11 1.504-.324 1.943-.602M25.893 31.5c.818-.109 1.504-.324 1.943-.6M25.893 32.44c.818-.11 1.504-.324 1.943-.601M25.893 33.38c.818-.11 1.504-.325 1.943-.602M25.893 35.259c.818-.11 1.504-.324 1.943-.602M25.893 36.198c.818-.109 1.504-.324 1.943-.601M27.836 15.396a3.817 3.817 0 01-1.02.42M27.836 16.336a3.817 3.817 0 01-1.02.419M27.836 17.275a3.817 3.817 0 01-1.02.42M26.816 18.634a3.819 3.819 0 001.02-.419M27.836 19.155a3.817 3.817 0 01-1.02.418M27.836 20.094a3.817 3.817 0 01-1.02.419M27.836 21.034a3.817 3.817 0 01-1.02.419M27.836 21.973a3.817 3.817 0 01-1.02.42M27.836 22.913a3.817 3.817 0 01-1.02.419M27.836 23.852a3.817 3.817 0 01-1.02.42M27.836 24.792a3.817 3.817 0 01-1.02.419M27.836 25.731a3.817 3.817 0 01-1.02.42M27.836 26.671a3.817 3.817 0 01-1.02.419M27.836 27.61a3.817 3.817 0 01-1.02.42M27.836 28.55a3.817 3.817 0 01-1.02.42M27.836 29.49a3.817 3.817 0 01-1.02.419M27.836 30.43a3.817 3.817 0 01-1.02.418M27.836 31.369a3.817 3.817 0 01-1.02.419M27.836 32.308a3.817 3.817 0 01-1.02.42M27.836 33.248a3.817 3.817 0 01-1.02.419M27.836 34.188a3.817 3.817 0 01-1.02.419M27.836 35.127a3.817 3.817 0 01-1.02.419M27.836 36.067a3.817 3.817 0 01-1.02.419"
                    stroke="#000"
                    strokeWidth={0.077}
                />
                <path
                    d="M77.873 79.5l-2.1 1.95a.235.235 0 00-.057.151v.156c0 .054.027.119.06.144l3.146 2.397c.032.025.088.04.125.033l5.305-.925c.037-.006.066-.056.066-.11v-.156c0-.054-.002-.143-.004-.198l-.103-2.307c-.002-.055-.033-.114-.067-.132l-1.007-.528"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M83.835 81.082c0 .934-1.537 1.69-3.432 1.69-.878 0-3.44-.256-3.352-1.597"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M75.716 81.502l3.206 2.442c.032.025.088.04.125.034l5.371-.937"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M78.096 79.58c.965-.491 3.23-.372 4.564.09"
                    stroke="#1e1e1e"
                    strokeWidth={0.077}
                />
                <path
                    d="M76.952 80.827a4.116 4.116 0 01.988-1.414M82.866 79.402c.402.375.73.836.963 1.366"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M82.866 79.793c-.162.494-.781 1.07-2.792 1.07-.846 0-1.993-.333-2.032-1.006"
                    stroke="#1e1e1e"
                    strokeWidth={0.077}
                />
                <path
                    d="M77.475 53.828a.428.428 0 01.143-.075c.283-.082.479-.065.818.052.487.17 1.161.274 1.906.274 1.091 0 1.992-.239 2.417-.55a.412.412 0 00.169-.253"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M77.76 53.948c.336-.054.428.006.719.116l.06.022M82.831 53.744c-.447.411-1.4.633-2.426.633-.534 0-1.032-.06-1.451-.164M81.874 52.536c.397.11.76.297.904.444a.33.33 0 01.105.236"
                    stroke="#1e1e1e"
                    strokeWidth={0.051}
                />
                <path
                    d="M77.94 79.413V54.86s.03-.683-.405-.777c-.022-.004-.092.042-.116.04-.14-.007-.171-.248.06-.572.256-.36.135-.756.645-1.025.489-.257 1.324-.459 2.279-.459 1.499 0 2.714.458 2.714 1.006 0 .397-.251.438-.251 1.02v25.31"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M77.786 53.485c.086-.315.136-.575.61-.785.488-.217 1.19-.353 1.97-.353.387 0 .754.033 1.086.093"
                    stroke="#1e1e1e"
                    strokeWidth={0.051}
                />
                <path
                    d="M82.525 60.357c-.431.346-1.218.578-2.118.578M80.407 64.925c.9 0 1.687-.232 2.118-.579M80.407 68.914c.9 0 1.687-.231 2.118-.578M80.407 72.904c.9 0 1.687-.232 2.118-.579M80.407 76.894c.9 0 1.687-.232 2.118-.579"
                    stroke="#000"
                    strokeWidth={0.128}
                />
                <path
                    d="M81.23 61.665c.545-.093 1.002-.275 1.295-.51M81.23 62.463c.545-.093 1.002-.275 1.295-.51M81.23 63.261c.545-.093 1.002-.275 1.295-.51M82.525 63.548c-.293.236-.75.418-1.296.511M81.23 65.655c.545-.093 1.002-.275 1.295-.51M81.23 66.453c.545-.093 1.002-.276 1.295-.511M81.23 67.25c.545-.092 1.002-.275 1.295-.51M81.23 68.049c.545-.093 1.002-.276 1.295-.511M81.23 69.645c.545-.093 1.002-.276 1.295-.511M81.23 70.442c.545-.092 1.002-.275 1.295-.51M81.23 71.24c.545-.092 1.002-.275 1.295-.51M81.23 72.038c.545-.092 1.002-.275 1.295-.51M81.23 73.634c.545-.093 1.002-.275 1.295-.51M81.23 74.432c.545-.093 1.002-.275 1.295-.51M81.23 75.23c.545-.093 1.002-.275 1.295-.51M81.23 76.028c.545-.093 1.002-.275 1.295-.51M81.23 77.624c.545-.093 1.002-.276 1.295-.511M81.23 78.422c.545-.093 1.002-.276 1.295-.511"
                    stroke="#000"
                    strokeWidth={0.077}
                />
                <path
                    d="M87.502 80.282l-1.281 1.242a.153.153 0 00-.035.096v.1c0 .034.017.075.036.091l1.92 1.528a.11.11 0 00.076.02l3.235-.589c.023-.003.04-.035.04-.07v-.1c0-.034 0-.09-.002-.125l-.063-1.47c-.001-.035-.02-.073-.04-.084l-.615-.337"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M91.138 81.29c0 .594-.937 1.077-2.093 1.077-.536 0-2.098-.164-2.044-1.019"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M86.186 81.557l1.955 1.556a.11.11 0 00.077.022l3.276-.597"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M87.638 80.332c.588-.312 1.97-.237 2.783.058"
                    stroke="#1e1e1e"
                    strokeWidth={0.077}
                />
                <path
                    d="M86.94 81.127c.143-.352.349-.654.602-.9M90.547 80.219c.245.239.445.532.588.87"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M90.547 80.468c-.099.315-.477.682-1.703.682-.516 0-1.215-.212-1.24-.64"
                    stroke="#1e1e1e"
                    strokeWidth={0.077}
                />
                <path
                    d="M87.259 63.924a.258.258 0 01.087-.048c.173-.052.292-.042.5.033.296.108.707.175 1.161.175.666 0 1.215-.152 1.475-.351a.264.264 0 00.103-.16"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M87.433 64c.205-.034.261.004.438.074l.037.015M90.526 63.87c-.273.262-.854.404-1.48.404-.326 0-.63-.039-.885-.105M89.942 63.1c.242.071.463.19.551.284.04.042.064.092.064.15"
                    stroke="#1e1e1e"
                    strokeWidth={0.051}
                />
                <path
                    d="M87.542 80.226V64.581s.019-.435-.246-.495c-.014-.003-.056.027-.071.026-.085-.005-.104-.16.036-.365.157-.23.083-.482.394-.653.298-.164.807-.293 1.39-.293.914 0 1.655.292 1.655.641 0 .253-.153.28-.153.65V80.22"
                    stroke="#323232"
                    strokeWidth={0.128}
                />
                <path
                    d="M87.449 63.705c.052-.2.083-.366.371-.5.298-.138.726-.225 1.202-.225.236 0 .46.021.662.06"
                    stroke="#1e1e1e"
                    strokeWidth={0.051}
                />
                <path
                    d="M90.339 68.084c-.263.22-.743.368-1.292.368M89.047 70.995c.549 0 1.029-.148 1.292-.37M89.047 73.537c.549 0 1.029-.148 1.292-.369M89.047 76.079c.549 0 1.029-.148 1.292-.369M89.047 78.62c.549 0 1.029-.147 1.292-.368"
                    stroke="#000"
                    strokeWidth={0.128}
                />
                <path
                    d="M89.57 69.65c.333-.059.612-.175.79-.325M89.549 72.264c.332-.06.611-.176.79-.326M89.549 74.806c.332-.06.611-.176.79-.326M89.527 77.348c.333-.06.612-.176.79-.326M89.57 79.658c.333-.059.612-.175.79-.325"
                    stroke="#000"
                    strokeWidth={0.077}
                />
            </g>
        </svg>
    )

export default SvgComponent
