import React from 'react';

const DiagramaPlataforma = ({ onNavigate }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="-120 -98 2108 1717" style={{ overflow: "visible" }}>
  <defs>
    <linearGradient id="linear-gradient" x1="0.185" y1="0.098" x2="0.832" y2="0.962" gradientUnits="objectBoundingBox">
      <stop offset="0" stopColor="#fff"/>
      <stop offset="1" stopColor="#e5e5e5"/>
    </linearGradient>
    <filter id="Ellipse_52" x="599" y="487" width="669" height="669" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Rectangle_49" x="-120" y="720" width="720" height="440" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="7.5" result="blur-2"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur-2"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <clipPath id="clip-path">
      <path id="path972" d="M0-682.665H77.726v77.726H0Z" transform="translate(0 682.665)" fill="#fff"/>
    </clipPath>
    <filter id="Rectangle_50" x="-50" y="250" width="720" height="440" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="7.5" result="blur-3"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur-3"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <clipPath id="clip-path-2">
      <path id="path1890" d="M0-682.665H74.419v74.419H0Z" transform="translate(0 682.665)"/>
    </clipPath>
    <filter id="Rectangle_45" x="1220" y="250" width="720" height="440" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="7.5" result="blur-4"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur-4"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <clipPath id="clip-path-3">
      <path id="path1899" d="M0-682.665H76.466V-606.2H0Z" transform="translate(0 682.665)"/>
    </clipPath>
    <filter id="Rectangle_46" x="1270" y="720" width="720" height="440" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="7.5" result="blur-5"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur-5"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Rectangle_47" x="980" y="1150" width="720" height="440" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="7.5" result="blur-6"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur-6"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Rectangle_48" x="170" y="1150" width="720" height="440" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="7.5" result="blur-7"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur-7"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="Rectangle_44" x="570" y="-30" width="720" height="440" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="7.5" result="blur-8"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur-8"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 393 158">
      <image width="393" height="158" xlinkHref="data:image/png;base64,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"/>
    </pattern>
    <clipPath id="clip-Artboard_11">
      <rect width="1868" height="1521"/>
    </clipPath>
  </defs>
  <g id="Artboard_11" dataName="Artboard – 11">
    <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Ellipse_52)">
      <circle id="Ellipse_52-2" dataName="Ellipse 52" cx="304.5" cy="304.5" r="304.5" transform="translate(629 514)" opacity="0.999" fill="url(#linear-gradient)"/>
    </g>
    <g id="Ellipse_50" dataName="Ellipse 50" transform="translate(211 96)" fill="none" stroke="#c9c9c9" strokeWidth="4" strokeDasharray="10">
      <ellipse cx="722.5" cy="707.5" rx="722.5" ry="707.5" stroke="none"/>
      <ellipse cx="722.5" cy="707.5" rx="720.5" ry="705.5" fill="none"/>
    </g>
    <g id="Ellipse_51" dataName="Ellipse 51" transform="translate(563 448)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10">
      <circle cx="370" cy="370" r="370" stroke="none"/>
      <circle cx="370" cy="370" r="368" fill="none"/>
    </g>
    <line id="Line_46" dataName="Line 46" y2="118" transform="translate(933.5 302.5)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10"/>
    <line id="Line_47" dataName="Line 47" x1="92" y2="65" transform="translate(1263.5 522.5)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10"/>
    <line id="Line_48" dataName="Line 48" x1="104" y1="38" transform="translate(1300.5 953.5)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10"/>
    <line id="Line_49" dataName="Line 49" x1="43" y1="70.5" transform="translate(1085.5 1185)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10"/>
    <line id="Line_50" dataName="Line 50" y1="76" x2="37" transform="translate(733.5 1179.5)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10"/>
    <line id="Line_51" dataName="Line 51" y1="38" x2="115" transform="translate(463.5 953.5)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10"/>
    <line id="Line_52" dataName="Line 52" x2="96" y2="69" transform="translate(530.5 514.5)" fill="none" stroke="#9a9a9a" strokeWidth="4" strokeDasharray="10"/>
    <g id="Ellipse_53" dataName="Ellipse 53" transform="translate(616 573)" fill="none" stroke="#25ac63" strokeWidth="2">
      <circle cx="30" cy="30" r="30" stroke="none"/>
      <circle cx="30" cy="30" r="29" fill="none"/>
    </g>
    <g id="Ellipse_54" dataName="Ellipse 54" transform="translate(630 587)" fill="#26ab63" stroke="#25ac63" strokeWidth="2">
      <circle cx="16" cy="16" r="16" stroke="none"/>
      <circle cx="16" cy="16" r="15" fill="none"/>
    </g>
    <g id="Ellipse_55" dataName="Ellipse 55" transform="translate(903 418)" fill="none" stroke="#fe9103" strokeWidth="2">
      <circle cx="30" cy="30" r="30" stroke="none"/>
      <circle cx="30" cy="30" r="29" fill="none"/>
    </g>
    <g id="Ellipse_56" dataName="Ellipse 56" transform="translate(917 432)" fill="#ff9202" stroke="#fe9103" strokeWidth="2">
      <circle cx="16" cy="16" r="16" stroke="none"/>
      <circle cx="16" cy="16" r="15" fill="none"/>
    </g>
    <g id="Ellipse_57" dataName="Ellipse 57" transform="translate(1207 573)" fill="none" stroke="#feb405" strokeWidth="2">
      <circle cx="30" cy="30" r="30" stroke="none"/>
      <circle cx="30" cy="30" r="29" fill="none"/>
    </g>
    <g id="Ellipse_58" dataName="Ellipse 58" transform="translate(1221 587)" fill="#feb503" stroke="#feb405" strokeWidth="2">
      <circle cx="16" cy="16" r="16" stroke="none"/>
      <circle cx="16" cy="16" r="15" fill="none"/>
    </g>
    <g id="Ellipse_59" dataName="Ellipse 59" transform="translate(1241 914)" fill="none" stroke="#a458fb" strokeWidth="2">
      <circle cx="30" cy="30" r="30" stroke="none"/>
      <circle cx="30" cy="30" r="29" fill="none"/>
    </g>
    <g id="Ellipse_60" dataName="Ellipse 60" transform="translate(1255 928)" fill="#a458fc" stroke="#a458fb" strokeWidth="2">
      <circle cx="16" cy="16" r="16" stroke="none"/>
      <circle cx="16" cy="16" r="15" fill="none"/>
    </g>
    <g id="Ellipse_61" dataName="Ellipse 61" transform="translate(1040 1134)" fill="none" stroke="#13aaab" strokeWidth="2">
      <circle cx="30" cy="30" r="30" stroke="none"/>
      <circle cx="30" cy="30" r="29" fill="none"/>
    </g>
    <g id="Ellipse_62" dataName="Ellipse 62" transform="translate(1054 1148)" fill="#17aaaa" stroke="#13aaab" strokeWidth="2">
      <circle cx="16" cy="16" r="16" stroke="none"/>
      <circle cx="16" cy="16" r="15" fill="none"/>
    </g>
    <g id="Ellipse_63" dataName="Ellipse 63" transform="translate(755 1125)" fill="none" stroke="#457cfd" strokeWidth="2">
      <circle cx="30" cy="30" r="30" stroke="none"/>
      <circle cx="30" cy="30" r="29" fill="none"/>
    </g>
    <g id="Ellipse_64" dataName="Ellipse 64" transform="translate(769 1139)" fill="#457cfd" stroke="#457cfd" strokeWidth="2">
      <circle cx="16" cy="16" r="16" stroke="none"/>
      <circle cx="16" cy="16" r="15" fill="none"/>
    </g>
    <g id="Ellipse_65" dataName="Ellipse 65" transform="translate(573 911)" fill="none" stroke="#4550fe" strokeWidth="2">
      <circle cx="30" cy="30" r="30" stroke="none"/>
      <circle cx="30" cy="30" r="29" fill="none"/>
    </g>
    <g id="Ellipse_66" dataName="Ellipse 66" transform="translate(587 925)" fill="#4550fe" stroke="#4550fe" strokeWidth="2">
      <circle cx="16" cy="16" r="16" stroke="none"/>
      <circle cx="16" cy="16" r="15" fill="none"/>
    </g>
    <g id="Botão_integracao" className="diagram-balloon-btn btn-integracao">
      <a href="/parceiros" onClick={(e) => { e.preventDefault(); onNavigate("/parceiros"); }} style={{ textDecoration: "none" }}>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_49)">
        <g id="Rectangle_49-2" dataName="Rectangle 49" transform="translate(4 817)" fill="#fafafa" stroke="#4550fe" strokeWidth="5">
          <rect width="470" height="240" rx="38" stroke="none"/>
          <rect x="2.5" y="2.5" width="465" height="235" rx="35.5" fill="none"/>
        </g>
      </g>
      <text id="Hub_de_integração" dataName="Hub de 
integração" transform="translate(239 929)" fill="#585858" fontSize="54" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="-99.522" y="0">Hub de </tspan><tspan x="-137.97" y="67">integração</tspan></text>
      <g id="Group_552" dataName="Group 552">
        <rect id="Rectangle_56" dataName="Rectangle 56" width="120" height="116" rx="22" transform="translate(179 741)" fill="#4550fe"/>
        <g id="g966" transform="translate(200 1442.801)">
          <g id="g968" transform="translate(0 -682.665)">
            <g id="g970" clipPath="url(#clip-path)">
              <g id="g976" transform="translate(2.288 2.299)">
                <path id="path978" d="M-215.533-313.615a5.784,5.784,0,0,0-.94-3.172h9.823v-9.924a5.607,5.607,0,0,0,3.787,1.471,5.713,5.713,0,0,0,5.673-5.753,5.713,5.713,0,0,0-5.673-5.753,5.607,5.607,0,0,0-3.787,1.471V-345.2h-9.689a5.786,5.786,0,0,0,.807-2.957,5.713,5.713,0,0,0-5.673-5.753,5.713,5.713,0,0,0-5.673,5.753,5.786,5.786,0,0,0,.807,2.957h-8.892v9.088a5.581,5.581,0,0,0-2.589-.635,5.713,5.713,0,0,0-5.673,5.753,5.713,5.713,0,0,0,5.673,5.753,5.583,5.583,0,0,0,2.589-.635v9.088h9.026a5.784,5.784,0,0,0-.94,3.172,5.713,5.713,0,0,0,5.673,5.753A5.713,5.713,0,0,0-215.533-313.615Z" transform="translate(243.226 353.91)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="4"/>
              </g>
              <g id="g980" transform="translate(38.864 2.3)">
                <path id="path982" d="M0-288.917H9.389a5.813,5.813,0,0,0-.622,2.624,5.734,5.734,0,0,0,5.693,5.774,5.734,5.734,0,0,0,5.693-5.774,5.813,5.813,0,0,0-.622-2.624h8.782v-9.065a5.6,5.6,0,0,0,2.59.632,5.734,5.734,0,0,0,5.693-5.774A5.734,5.734,0,0,0,30.9-308.9a5.6,5.6,0,0,0-2.59.632v-9.065H19.667a5.807,5.807,0,0,0,.791-2.935,5.734,5.734,0,0,0-5.693-5.774,5.734,5.734,0,0,0-5.693,5.774,5.807,5.807,0,0,0,.791,2.935H0" transform="translate(0 326.039)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="4"/>
              </g>
              <g id="g984" transform="translate(38.864 39.422)">
                <path id="path986" d="M0,0V28.413H9.575a5.565,5.565,0,0,0-.4,2.078,5.439,5.439,0,1,0,10.876,0,5.565,5.565,0,0,0-.4-2.078h8.664V19.525a5.356,5.356,0,0,0,2.828.8,5.515,5.515,0,0,0,0-11.03,5.356,5.356,0,0,0-2.828.8V0" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="4"/>
              </g>
            </g>
          </g>
        </g>
      </g>
      </a>
    </g>
    <g id="Botão_beneficios" className="diagram-balloon-btn btn-beneficios">
      <a href="/gestao-beneficios" onClick={(e) => { e.preventDefault(); onNavigate("/gestao-beneficios"); }} style={{ textDecoration: "none" }}>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_50)">
        <g id="Rectangle_50-2" dataName="Rectangle 50" transform="translate(71 348)" fill="#fafafa" stroke="#27aa63" strokeWidth="5">
          <rect width="470" height="240" rx="38" stroke="none"/>
          <rect x="2.5" y="2.5" width="465" height="235" rx="35.5" fill="none"/>
        </g>
      </g>
      <text id="Gestão_de_Benefícios" dataName="Gestão de 
Benefícios" transform="translate(306 460)" fill="#585858" fontSize="54" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="-138.996" y="0">Gestão de </tspan><tspan x="-135.432" y="67">Benefícios</tspan></text>
      <g id="Group_550" dataName="Group 550">
        <rect id="Rectangle_57" dataName="Rectangle 57" width="120" height="116" rx="22" transform="translate(246 272)" fill="#27aa63"/>
        <g id="g1884" transform="translate(269 975.455)">
          <g id="g1886" transform="translate(0 -682.665)">
            <g id="g1888" clipPath="url(#clip-path-2)">
              <g id="g1894" transform="translate(2.18 4.506)">
                <path id="path1896" d="M-286.3-133.648S-282.117-150-268.861-150c10.326,0,17.587,9.375,17.587,20.481,0,15.36-14.341,25.531-35.029,44.926-20.688-19.4-35.029-29.566-35.029-44.926,0-11.106,7.262-20.481,17.587-20.481C-290.489-150-286.3-133.648-286.3-133.648Z" transform="translate(321.333 150)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1898" transform="translate(2.18 30.669)">
                <path id="path1900" d="M0-142.558H21.948l4.36-8.721,4.36,17.442L35.029-160l4.36,17.442,4.36-8.721,4.36,8.721H70.058" transform="translate(0 160)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
            </g>
          </g>
        </g>
      </g>
      </a>
    </g>
    <g id="Botão_portal" className="diagram-balloon-btn btn-portal">
      <a href="/portal-rh" onClick={(e) => { e.preventDefault(); onNavigate("/portal-rh"); }} style={{ textDecoration: "none" }}>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_45)">
        <g id="Rectangle_45-2" dataName="Rectangle 45" transform="translate(1348 348)" fill="#fafafa" stroke="#feb503" strokeWidth="5">
          <rect width="470" height="240" rx="38" stroke="none"/>
          <rect x="2.5" y="2.5" width="465" height="235" rx="35.5" fill="none"/>
        </g>
      </g>
      <text id="Portal_de_RH" dataName="Portal 
de RH" transform="translate(1583 460)" fill="#585858" fontSize="54" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="-84.483" y="0">Portal </tspan><tspan x="-79.002" y="67">de RH</tspan></text>
      <g id="Group_560" dataName="Group 560">
        <rect id="Rectangle_52" dataName="Rectangle 52" width="120" height="116" rx="22" transform="translate(1523 272)" fill="#feb503"/>
        <g id="g1893" transform="translate(1545 974.664)">
          <g id="g1895" transform="translate(0 -682.665)">
            <g id="g1897" clipPath="url(#clip-path-3)">
              <g id="g1903" transform="translate(2.39 38.382)">
                <path id="path1905" d="M-284.156-142.078a17.922,17.922,0,0,1-17.922,17.922A17.922,17.922,0,0,1-320-142.078,17.922,17.922,0,0,1-302.077-160,17.922,17.922,0,0,1-284.156-142.078Z" transform="translate(319.999 160)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1907" transform="translate(20.311 2.24)">
                <path id="path1909" d="M0-570.679H49.285a4.481,4.481,0,0,0,4.48-4.481v-52.57L38.831-642.665H4.48A4.481,4.481,0,0,0,0-638.185v31.662" transform="translate(0 642.665)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1911" transform="translate(59.142 2.24)">
                <path id="path1913" d="M0,0V14.935H14.935Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1915" transform="translate(32.164 42.863)">
                <path id="path1917" d="M0,0H31.458" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1919" transform="translate(30.766 29.422)">
                <path id="path1921" d="M0,0H32.857" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1923" transform="translate(38.233 56.304)">
                <path id="path1925" d="M0,0H25.389" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1927" transform="translate(12.695 58.246)">
                <path id="path1929" d="M-35.519-35.519-40-40" transform="translate(40 40)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
              <g id="g1931" transform="translate(17.175 52.272)">
                <path id="path1933" d="M0-82.879,10.454-93.333" transform="translate(0 93.333)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" strokeMiterlimit="10" strokeWidth="5"/>
              </g>
            </g>
          </g>
        </g>
      </g>
      </a>
    </g>
    <g id="Botão_tarefas" className="diagram-balloon-btn btn-tarefas">
      <a href="/gestao-tarefas" onClick={(e) => { e.preventDefault(); onNavigate("/gestao-tarefas"); }} style={{ textDecoration: "none" }}>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_46)">
        <g id="Rectangle_46-2" dataName="Rectangle 46" transform="translate(1393 817)" fill="#fafafa" stroke="#a458fc" strokeWidth="5">
          <rect width="470" height="240" rx="38" stroke="none"/>
          <rect x="2.5" y="2.5" width="465" height="235" rx="35.5" fill="none"/>
        </g>
      </g>
      <text id="Orquestrador_de_Tarefas" dataName="Orquestrador 
de Tarefas" transform="translate(1628 924)" fill="#585858" fontSize="54" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="-180.036" y="0">Orquestrador </tspan><tspan x="-133.002" y="67">de Tarefas</tspan></text>
      <g id="Group_558" dataName="Group 558">
        <rect id="Rectangle_53" dataName="Rectangle 53" width="120" height="116" rx="22" transform="translate(1568 741)" fill="#a458fc"/>
        <g id="data_13953332" transform="translate(1596 760)">
          <path id="Path_19" dataName="Path 19" d="M21,7.446A2.432,2.432,0,0,0,17.19,4.418l-5.835,7.336L8.836,8.588a2.432,2.432,0,0,0-3.807,3.028l4.422,5.559a2.432,2.432,0,0,0,3.807,0Z" transform="translate(6.445 5.013)" fill="#fff"/>
          <path id="Path_20" dataName="Path 20" d="M25.161,6.432a2.432,2.432,0,0,1-2.432,2.432h-7.3a2.432,2.432,0,1,1,0-4.864h7.3A2.432,2.432,0,0,1,25.161,6.432Z" transform="translate(18.619 5.729)" fill="#fff"/>
          <path id="Path_21" dataName="Path 21" d="M34.89,11.864A2.432,2.432,0,0,0,34.89,7H15.432a2.432,2.432,0,0,0,0,4.864Z" transform="translate(18.619 10.026)" fill="#fff"/>
          <path id="Path_22" dataName="Path 22" d="M25.161,13.432a2.432,2.432,0,0,1-2.432,2.432h-7.3a2.432,2.432,0,1,1,0-4.864h7.3A2.432,2.432,0,0,1,25.161,13.432Z" transform="translate(18.619 15.755)" fill="#fff"/>
          <path id="Path_23" dataName="Path 23" d="M34.89,18.864a2.432,2.432,0,1,0,0-4.864H15.432a2.432,2.432,0,1,0,0,4.864Z" transform="translate(18.619 20.051)" fill="#fff"/>
          <path id="Path_24" dataName="Path 24" d="M25.161,21.432a2.432,2.432,0,0,1-2.432,2.432h-7.3a2.432,2.432,0,0,1,0-4.864h7.3A2.432,2.432,0,0,1,25.161,21.432Z" transform="translate(18.619 27.213)" fill="#fff"/>
          <path id="Path_25" dataName="Path 25" d="M20.608,11.529A2.432,2.432,0,0,1,21,14.946l-7.739,9.729a2.432,2.432,0,0,1-3.807,0L5.029,19.116a2.432,2.432,0,1,1,3.807-3.028l2.519,3.166,5.835-7.336A2.432,2.432,0,0,1,20.608,11.529Z" transform="translate(6.445 15.755)" fill="#fff"/>
          <path id="Path_26" dataName="Path 26" d="M21,22.446a2.432,2.432,0,1,0-3.807-3.028l-5.835,7.336L8.836,23.588a2.432,2.432,0,1,0-3.807,3.028l4.422,5.559a2.432,2.432,0,0,0,3.807,0Z" transform="translate(6.445 26.496)" fill="#fff"/>
          <path id="Path_27" dataName="Path 27" d="M63.238,7.3V55.922l-21.715,21.9q-.087.006-.175.006H7.3a7.3,7.3,0,0,1-7.3-7.3V7.3A7.3,7.3,0,0,1,7.3,0H55.942a7.3,7.3,0,0,1,7.3,7.3ZM7.3,72.967a2.432,2.432,0,0,1-2.432-2.432V7.3A2.432,2.432,0,0,1,7.3,4.864H55.942A2.432,2.432,0,0,1,58.374,7.3V53.509H34.051a2.432,2.432,0,1,0,0,4.864h4.864V72.967ZM43.78,58.374V69.528L54.934,58.374Z" transform="translate(0 0)" fill="#fff" fill-rule="evenodd"/>
        </g>
      </g>
      </a>
    </g>
    <g id="Botão_formulario" className="diagram-balloon-btn btn-formulario">
      <a href="/formulario" onClick={(e) => { e.preventDefault(); onNavigate("/formulario"); }} style={{ textDecoration: "none" }}>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_47)">
        <g id="Rectangle_47-2" dataName="Rectangle 47" transform="translate(1109 1249)" fill="#fafafa" stroke="#17aaaa" strokeWidth="5">
          <rect width="470" height="240" rx="38" stroke="none"/>
          <rect x="2.5" y="2.5" width="465" height="235" rx="35.5" fill="none"/>
        </g>
      </g>
      <text id="Formulários_customizados" dataName="Formulários 
customizados" transform="translate(1344 1362)" fill="#585858" fontSize="52" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="-155.922" y="0">Formulários </tspan><tspan x="-173.758" y="64">customizados</tspan></text>
      <g id="Group_556" dataName="Group 556">
        <rect id="Rectangle_54" dataName="Rectangle 54" width="120" height="116" rx="22" transform="translate(1284 1171)" fill="#17aaaa"/>
        <g id="employment_1166125" transform="translate(1308 1187.762)">
          <path id="Path_28" dataName="Path 28" d="M182.188,186.075h24.189a2.387,2.387,0,0,0,0-4.774H182.188a2.387,2.387,0,0,0,0,4.774Zm0,0" transform="translate(-151.157 -151.997)" fill="#fff"/>
          <path id="Path_29" dataName="Path 29" d="M79.508,22.212a7.169,7.169,0,0,0-10.126-.071l-2.227,2.193V17.368a2.4,2.4,0,0,0-.7-1.688C60.89,10.114,57.712,6.778,52.135,1.2A2.4,2.4,0,0,0,50.446.5H2.387A2.387,2.387,0,0,0,0,2.887v76.7a2.387,2.387,0,0,0,2.387,2.387H64.768a2.387,2.387,0,0,0,2.387-2.387V44.438l12.283-12.1A7.17,7.17,0,0,0,79.508,22.212ZM48.82,55.8l-4.567,1.17,1.207-4.534a2.351,2.351,0,0,0,.154-.18l19.1-18.808,3.353,3.4ZM59.033,14.981h-6.2v-6.3C55,10.873,56.855,12.774,59.033,14.981ZM62.381,77.2H4.774V5.274H48.059V17.368a2.387,2.387,0,0,0,2.387,2.387H62.381v9.281l-9.966,9.815H31.031a2.387,2.387,0,0,0,0,4.774H47.569L42.722,48.4H31.031a2.387,2.387,0,1,0,0,4.774h9.29l-1.271,4.774H31.031a2.387,2.387,0,1,0,0,4.774H40.9a2.374,2.374,0,0,0,1.016-.23c9.472-2.426,9.185-2.241,9.8-2.844L62.381,49.14ZM76.087,28.94l-4.623,4.552-3.352-3.4,4.621-4.551a2.387,2.387,0,0,1,3.354,3.4Zm0,0" transform="translate(0 0)" fill="#fff"/>
          <path id="Path_30" dataName="Path 30" d="M71.869,121.367H62.321a2.387,2.387,0,0,0-2.387,2.387V133.3a2.388,2.388,0,0,0,2.387,2.387h9.548a2.388,2.388,0,0,0,2.387-2.387v-9.548A2.387,2.387,0,0,0,71.869,121.367Zm-2.387,9.548H64.708v-4.774h4.774Zm0,0" transform="translate(-50.386 -101.612)" fill="#fff"/>
          <path id="Path_31" dataName="Path 31" d="M71.869,241.234H62.321a2.388,2.388,0,0,0-2.387,2.387v9.548a2.388,2.388,0,0,0,2.387,2.387h9.548a2.388,2.388,0,0,0,2.387-2.387v-9.548A2.388,2.388,0,0,0,71.869,241.234Zm-2.387,9.548H64.708v-4.774h4.774Zm0,0" transform="translate(-50.386 -202.383)" fill="#fff"/>
          <path id="Path_32" dataName="Path 32" d="M71.869,361.1H62.321a2.388,2.388,0,0,0-2.387,2.387v9.548a2.387,2.387,0,0,0,2.387,2.387h9.548a2.387,2.387,0,0,0,2.387-2.387v-9.548A2.388,2.388,0,0,0,71.869,361.1Zm-2.387,9.548H64.708v-4.774h4.774Zm0,0" transform="translate(-50.386 -303.154)" fill="#fff"/>
          <path id="Path_33" dataName="Path 33" d="M182.188,126.141h9.867a2.387,2.387,0,0,0,0-4.774h-9.867a2.387,2.387,0,1,0,0,4.774Zm0,0" transform="translate(-151.157 -101.612)" fill="#fff"/>
          <path id="Path_34" dataName="Path 34" d="M63.51,61.752a2.387,2.387,0,1,0,.874,3.261A2.387,2.387,0,0,0,63.51,61.752Zm0,0" transform="translate(-50.382 -51.225)" fill="#fff"/>
          <path id="Path_35" dataName="Path 35" d="M123.444,61.754a2.387,2.387,0,1,0,.874,3.26A2.386,2.386,0,0,0,123.444,61.754Zm0,0" transform="translate(-100.768 -51.226)" fill="#fff"/>
          <path id="Path_36" dataName="Path 36" d="M183.379,61.756a2.387,2.387,0,1,0,.874,3.261A2.386,2.386,0,0,0,183.379,61.756Zm0,0" transform="translate(-151.155 -51.228)" fill="#fff"/>
        </g>
      </g>
      </a>
    </g>
    <g id="Botão_bpmn" className="diagram-balloon-btn btn-bpmn">
      <a href="/bpms" onClick={(e) => { e.preventDefault(); onNavigate("/bpms"); }} style={{ textDecoration: "none" }}>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_48)">
        <g id="Rectangle_48-2" dataName="Rectangle 48" transform="translate(296 1249)" fill="#fafafa" stroke="#457cfd" strokeWidth="5">
          <rect width="470" height="240" rx="38" stroke="none"/>
          <rect x="2.5" y="2.5" width="465" height="235" rx="35.5" fill="none"/>
        </g>
      </g>
      <text id="Workflow_BPMS" dataName="Workflow 
BPMS" transform="translate(531 1361)" fill="#585858" fontSize="54" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="-128.925" y="0">Workflow </tspan><tspan x="-79.029" y="67">BPMS</tspan></text>
      <g id="Group_554" dataName="Group 554">
        <rect id="Rectangle_55" dataName="Rectangle 55" width="120" height="116" rx="22" transform="translate(463 1171)" fill="#457cfd"/>
        <g id="process_18364833" transform="translate(482.75 1188.75)">
          <rect id="Rectangle_59" dataName="Rectangle 59" width="23.811" height="23.811" rx="1.75" transform="translate(23.23 28.725)" fill="#fff"/>
          <rect id="Rectangle_60" dataName="Rectangle 60" width="23.811" height="23.811" rx="1.75" transform="translate(34.22 1.25)" fill="#fff"/>
          <rect id="Rectangle_61" dataName="Rectangle 61" width="23.811" height="23.811" rx="1.75" transform="translate(34.22 56.2)" fill="#fff"/>
          <path id="Path_37" dataName="Path 37" d="M8.991,18.228a2.717,2.717,0,0,1-1.942-.806,2.764,2.764,0,0,1,0-3.883L10.6,9.986,7.049,6.432a2.746,2.746,0,0,1,3.883-3.883l5.495,5.495a2.764,2.764,0,0,1,0,3.883l-5.495,5.495a2.717,2.717,0,0,1-1.942.806Z" transform="translate(13.323 1.338)" fill="#fff"/>
          <path id="Path_38" dataName="Path 38" d="M24.146,8.745H4A2.747,2.747,0,0,1,4,3.25H24.146a2.747,2.747,0,0,1,0,5.495Z" transform="translate(0 5.327)" fill="#fff"/>
          <path id="Path_39" dataName="Path 39" d="M22.491,33.728a2.717,2.717,0,0,1-1.942-.806,2.764,2.764,0,0,1,0-3.883L24.1,25.486l-3.553-3.553a2.746,2.746,0,0,1,3.883-3.883l5.495,5.495a2.764,2.764,0,0,1,0,3.883l-5.495,5.495a2.717,2.717,0,0,1-1.942.806Z" transform="translate(49.278 42.62)" fill="#fff"/>
          <path id="Path_40" dataName="Path 40" d="M36.314,24.245H18a2.747,2.747,0,0,1,0-5.495H36.314a2.747,2.747,0,0,1,0,5.495Z" transform="translate(37.286 46.608)" fill="#fff"/>
          <path id="Path_41" dataName="Path 41" d="M22.986,26.228a2.717,2.717,0,0,1-1.942-.806l-5.495-5.495a2.764,2.764,0,0,1,0-3.883l5.495-5.495a2.746,2.746,0,1,1,3.883,3.883l-3.553,3.553,3.553,3.553a2.764,2.764,0,0,1,0,3.883,2.717,2.717,0,0,1-1.942.806Z" transform="translate(35.961 22.645)" fill="#fff"/>
          <path id="Path_42" dataName="Path 42" d="M27.656,38.051H18.5a2.747,2.747,0,1,1,0-5.495h9.158A8.255,8.255,0,0,0,35.9,24.314V16.987a8.255,8.255,0,0,0-8.242-8.242,2.747,2.747,0,1,1,0-5.495A13.742,13.742,0,0,1,41.393,16.987v7.327A13.742,13.742,0,0,1,27.656,38.051Z" transform="translate(38.618 5.327)" fill="#fff"/>
          <path id="Path_43" dataName="Path 43" d="M8.991,33.728a2.717,2.717,0,0,1-1.942-.806,2.764,2.764,0,0,1,0-3.883L10.6,25.486,7.049,21.932a2.746,2.746,0,0,1,3.883-3.883l5.495,5.495a2.764,2.764,0,0,1,0,3.883l-5.495,5.495a2.717,2.717,0,0,1-1.942.806Z" transform="translate(13.323 42.62)" fill="#fff"/>
          <path id="Path_44" dataName="Path 44" d="M24.146,44.22H14.987A13.742,13.742,0,0,1,1.25,30.482V24.987A13.742,13.742,0,0,1,14.987,11.25h10.99a2.747,2.747,0,1,1,0,5.495H14.987a8.255,8.255,0,0,0-8.242,8.242v5.495a8.255,8.255,0,0,0,8.242,8.242h9.158a2.747,2.747,0,0,1,0,5.495Z" transform="translate(0 26.633)" fill="#fff"/>
        </g>
      </g>
      </a>
    </g>
    <g id="Botão_admissão" className="diagram-balloon-btn btn-admissao">
      <a href="/admissao-digital" onClick={(e) => { e.preventDefault(); onNavigate("/admissao-digital"); }} style={{ textDecoration: "none" }}>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_44)">
        <g id="Rectangle_44-2" dataName="Rectangle 44" transform="translate(698 76)" fill="#fafafa" stroke="#ff9202" strokeWidth="5">
          <rect width="470" height="240" rx="38" stroke="none"/>
          <rect x="2.5" y="2.5" width="465" height="235" rx="35.5" fill="none"/>
        </g>
      </g>
      <text id="Admissão_Digital" dataName="Admissão 
Digital" transform="translate(942 188)" fill="#585858" fontSize="54" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="-134.919" y="0">Admissão </tspan><tspan x="-82.404" y="67">Digital</tspan></text>
      <g id="Group_548" dataName="Group 548">
        <g id="Rectangle_51" dataName="Rectangle 51" transform="translate(873)" fill="#ff9202" stroke="#ff9202" strokeWidth="1">
          <rect width="120" height="116" rx="22" stroke="none"/>
          <rect x="0.5" y="0.5" width="119" height="115" rx="21.5" fill="none"/>
        </g>
        <g id="letter_8097682" transform="translate(823.75 3)">
          <line id="Line_53" dataName="Line 53" x2="41.62" transform="translate(82.199 42.76)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="5"/>
          <line id="Line_54" dataName="Line 54" x2="41.62" transform="translate(82.199 52.013)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="5"/>
          <line id="Line_55" dataName="Line 55" x2="32.367" transform="translate(82.199 61.266)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="5"/>
          <path id="Path_45" dataName="Path 45" d="M130.769,89.025H75.25V15h41.639l13.88,13.88Z" transform="translate(0 0)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="5"/>
          <path id="Path_46" dataName="Path 46" d="M346.375,15V28.88h13.88" transform="translate(-229.486 0)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="5"/>
          <line id="Line_56" dataName="Line 56" x1="9.234" transform="translate(82.199 24.253)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="5"/>
          <path id="Path_47" dataName="Path 47" d="M280.885,391.562h-4.473l-4.627,4.627-4.627-4.627-6.345,6.345" transform="translate(-157.065 -318.73)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="5"/>
        </g>
        <path id="Path_48" dataName="Path 48" d="M30,0C47.36.066,60,13.655,60,30.5S46.569,61,30,61,8.679,54.3,8.679,37.454V28.84L18.75,22.173s-8.572-8.443-7.642-9.558C16.31,6.372,20.521-.036,30,0Z" transform="translate(933 55)" fill="#ff9202"/>
        <path id="user_4034171" d="M57.038,17.823a8.912,8.912,0,1,0-8.912-8.912A8.922,8.922,0,0,0,57.038,17.823Zm0-12.76a3.849,3.849,0,1,1-3.849,3.849,3.853,3.853,0,0,1,3.849-3.849Zm6.478,14.7H50.56A10.626,10.626,0,0,0,39.946,30.375v7.6A2.532,2.532,0,0,0,42.478,40.5H71.6a2.532,2.532,0,0,0,2.532-2.532v-7.6A10.626,10.626,0,0,0,63.516,19.761Zm5.551,15.68H45.009V30.375a5.557,5.557,0,0,1,5.551-5.551H63.516a5.557,5.557,0,0,1,5.551,5.551v5.066Z" transform="translate(904.87 58)" fill="#fff"/>
      </g>
      </a>
    </g>
    <g id="Botão_dirhect" className="diagram-center-logo">
      <circle id="Ellipse_49" dataName="Ellipse 49" cx="265.5" cy="265.5" r="265.5" transform="translate(666 553)" fill="rgba(250,250,250,0.53)"/>
      <rect id="dirhect_color" width="551" height="222" transform="translate(658 736)" fill="url(#pattern)"/>
    </g>
  </g>
</svg>
  );
};

export default DiagramaPlataforma;
