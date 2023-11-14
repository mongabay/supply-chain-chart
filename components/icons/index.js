import React from 'react';

const Icons = () => (
  <svg
    aria-hidden="true"
    style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <symbol id="icon-close" viewBox="0 0 51 51">
        <title>Close</title>
        <line
          x1="14.186"
          y1="14.1863"
          x2="36.8134"
          y2="36.8137"
          stroke="inherit"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="36.8135"
          y1="14.1863"
          x2="14.1861"
          y2="36.8137"
          stroke="inherit"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </symbol>
      <symbol id="icon-bottom-arrow" viewBox="0 0 15 15">
        <title>Bottom arrow</title>
        <path strokeWidth="2" d="M3 5l4.5 5L12 5" fill="none" />
      </symbol>
      <symbol id="icon-eye" viewBox="0 0 22 15">
        <title>Visible</title>
        <path d="M11 0C6 0 1.73 3.11 0 7.5 1.73 11.89 6 15 11 15s9.27-3.11 11-7.5C20.27 3.11 16 0 11 0zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </symbol>
      <symbol id="icon-slashed-eye" viewBox="0 0 23 21">
        <title>Hidden</title>
        <path d="M22.763 9.992a18.948 18.948 0 0 0-3.133-3.619L8.367 17.637c.997.324 2.039.493 3.088.5 6.75 0 11.125-6.838 11.308-7.13a.955.955 0 0 0 0-1.015zM21.674.28a.955.955 0 0 0-1.349 0l-3.873 3.873a10.746 10.746 0 0 0-4.997-1.29C4.705 2.864.329 9.702.146 9.994a.955.955 0 0 0 0 1.015 19.027 19.027 0 0 0 4.638 4.813L2.19 18.416a.955.955 0 1 0 1.349 1.35L21.674 1.629a.955.955 0 0 0 0-1.35zM7.636 10.5a3.818 3.818 0 0 1 3.819-3.818 3.708 3.708 0 0 1 1.92.548l-5.19 5.19a3.717 3.717 0 0 1-.549-1.92z" />
      </symbol>
      <symbol id="icon-opacity" viewBox="0 0 16 16">
        <title>Opacity</title>
        <path d="M7 0v15.876A8.001 8.001 0 0 1 7 0zm5.001 1.009v13.858a7.95 7.95 0 0 1-2 .819V.19a7.95 7.95 0 0 1 2 .819zm2 1.639A7.97 7.97 0 0 1 16 7.938a7.97 7.97 0 0 1-1.999 5.29V2.648z" />
      </symbol>
      <symbol id="icon-menu" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <title>Menu</title>
        <circle cx="2.41379" cy="2.91355" r="2.41379" fill="#FFFDF8" />
        <circle cx="9.99973" cy="2.91355" r="2.41379" fill="#FFFDF8" />
        <circle cx="17.5866" cy="2.91355" r="2.41379" fill="#FFFDF8" />
        <circle cx="2.41379" cy="10.5" r="2.41379" fill="#FFFDF8" />
        <circle cx="9.99973" cy="10.5" r="2.41379" fill="#FFFDF8" />
        <circle cx="17.5866" cy="10.5" r="2.41379" fill="#FFFDF8" />
        <circle cx="2.41379" cy="18.0864" r="2.41379" fill="#FFFDF8" />
        <circle cx="9.99973" cy="18.0864" r="2.41379" fill="#FFFDF8" />
        <circle cx="17.5866" cy="18.0864" r="2.41379" fill="#FFFDF8" />
      </symbol>
      <symbol id="icon-satellite" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M18.7783 3.22251C16.7014 1.14561 13.9379 0 10.9999 0C10.7628 0 10.5693 0.191568 10.5693 0.430554C10.5693 0.66954 10.7609 0.861108 10.9999 0.861108C16.5914 0.861108 21.1416 5.41132 21.1416 11.0028C21.1416 13.0683 20.5252 15.0542 19.3587 16.748C19.224 16.9433 19.2733 17.2108 19.4687 17.3454C19.5427 17.3966 19.628 17.4213 19.7115 17.4213C19.8481 17.4213 19.9827 17.3568 20.0662 17.2354C21.3313 15.3975 22.0008 13.2428 22.0008 11.0028C22.0008 8.06482 20.8571 5.30131 18.7783 3.22441V3.22251Z"
          fill="white"
        />
        <path
          d="M2.66201 2.86967C3.74124 1.79044 5.30413 1.32954 6.79115 1.6387C7.10031 3.12573 6.63941 4.68672 5.56018 5.76785C4.59096 6.73707 3.23292 7.20745 1.89005 7.06899C2.59373 5.82096 3.61226 4.78914 4.86219 4.0665C5.06704 3.947 5.13722 3.68526 5.01962 3.47852C4.90013 3.27367 4.63838 3.20349 4.43164 3.32109C3.16274 4.05512 2.11006 5.07555 1.34379 6.30462C1.2812 5.03951 1.74969 3.78199 2.6639 2.86967H2.66201ZM9.52431 4.46101C9.30998 4.80052 9.10135 5.24246 8.90978 5.82096C8.67838 6.51326 8.50009 7.31936 8.3787 8.19374H4.9134C5.77831 6.32738 7.47586 4.92381 9.52621 4.46101H9.52431ZM10.9981 4.2979C11.3243 4.2979 11.8307 4.77018 12.2726 6.09408C12.4775 6.70862 12.6387 7.41988 12.7525 8.19564H9.2455C9.3593 7.41988 9.52052 6.70862 9.72536 6.09408C10.1673 4.77018 10.6718 4.2979 11 4.2979H10.9981ZM17.0846 8.19374H13.6193C13.4979 7.31936 13.3177 6.51515 13.0882 5.82096C12.8948 5.24246 12.6861 4.80052 12.4737 4.46101C14.524 4.92381 16.2216 6.32738 17.0865 8.19374H17.0846ZM17.701 11.0009C17.701 11.6837 17.5986 12.3437 17.407 12.964C17.371 12.9545 17.3331 12.9488 17.2932 12.9488H13.7179C13.7748 12.321 13.8052 11.6685 13.8052 11.0009C13.8052 10.3332 13.7748 9.68077 13.7179 9.05295H17.4127C17.6005 9.66939 17.701 10.3238 17.701 11.0009ZM12.4718 17.5407C12.6861 17.2012 12.8948 16.7593 13.0863 16.1808C13.3177 15.4885 13.496 14.6824 13.6174 13.808H17.0827C16.2178 15.6744 14.5203 17.0779 12.4699 17.5407H12.4718ZM10.9981 17.7039C10.6718 17.7039 10.1654 17.2316 9.72347 15.9077C9.51862 15.2931 9.3574 14.5819 9.2436 13.8061H12.7506C12.6368 14.5819 12.4756 15.2931 12.2708 15.9077C11.8288 17.2316 11.3243 17.7039 10.9962 17.7039H10.9981ZM9.05013 11.0009C9.05013 10.3313 9.08048 9.67697 9.14118 9.05295H12.8549C12.9156 9.67697 12.946 10.3313 12.946 11.0009C12.946 11.6704 12.9156 12.3248 12.8549 12.9488H9.14118C9.08048 12.3248 9.05013 11.6704 9.05013 11.0009ZM4.91151 13.808H8.3768C8.49819 14.6824 8.67838 15.4866 8.90788 16.1808C9.10135 16.7593 9.30998 17.2012 9.52242 17.5407C7.47207 17.0779 5.77451 15.6744 4.90961 13.808H4.91151ZM4.58907 12.964C4.3975 12.3419 4.29508 11.6837 4.29508 11.0009C4.29508 10.3181 4.3956 9.66939 4.58338 9.05295H8.27817C8.22127 9.68077 8.19092 10.3351 8.19092 11.0009C8.19092 11.6666 8.22127 12.321 8.27817 12.9488H4.70287C4.66304 12.9488 4.6251 12.9545 4.58907 12.964ZM17.3426 19.4678C17.2079 19.2724 16.9405 19.2231 16.7451 19.3578C15.0513 20.5243 13.0655 21.1407 11 21.1407C5.40845 21.1407 0.858234 16.5905 0.858234 10.999C0.858234 9.92165 1.02514 8.86708 1.35517 7.85613C1.6852 7.91872 2.01902 7.94907 2.34905 7.94907C2.99583 7.94907 3.63692 7.83147 4.24007 7.60766C3.72606 8.62809 3.43587 9.78129 3.43587 10.999C3.43587 15.1699 6.82908 18.5631 11 18.5631C15.1708 18.5631 18.564 15.1699 18.564 10.999C18.564 6.82811 15.1708 3.43489 11 3.43489C9.71588 3.43489 8.50768 3.75544 7.44741 4.32255C7.79261 3.32109 7.84383 2.221 7.56311 1.16832C7.52328 1.02038 7.40758 0.902781 7.25964 0.864847C5.40465 0.369805 3.41121 0.904677 2.05506 2.25893C0.698911 3.61318 0.192488 5.51369 0.626835 7.32884C0.209558 8.5048 -0.000976562 9.73767 -0.000976562 10.999C-0.000976562 13.937 1.14274 16.7005 3.22154 18.7774C5.29844 20.8543 8.06195 21.9999 11 21.9999C13.24 21.9999 15.3946 21.3304 17.2325 20.0653C17.4279 19.9306 17.4772 19.6632 17.3426 19.4678Z"
          fill="white"
        />
        <path
          d="M18.4748 18.0471C18.361 18.0471 18.251 18.0926 18.1713 18.1723C18.0917 18.2519 18.0461 18.3638 18.0461 18.4757C18.0461 18.5876 18.0917 18.6995 18.1713 18.7792C18.251 18.8588 18.3629 18.9044 18.4748 18.9044C18.5867 18.9044 18.6986 18.8588 18.7782 18.7792C18.8579 18.6995 18.9034 18.5876 18.9034 18.4757C18.9034 18.3638 18.8579 18.2519 18.7782 18.1723C18.6986 18.0926 18.5867 18.0471 18.4748 18.0471Z"
          fill="white"
        />
      </symbol>
      <symbol id="icon-fire" width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path
          d="M18.3607 5.84931C18.2657 5.6786 18.0668 5.59413 17.8767 5.6434C17.6884 5.69268 17.5564 5.86339 17.5564 6.05873C17.5564 8.26737 17.025 10.0079 16.5375 11.1659C16.4196 10.1363 15.9866 8.88684 14.5735 7.94355C13.6759 7.3452 13.1445 6.62541 12.9931 5.80355C12.6869 4.15279 13.9065 2.4334 14.4908 1.60802C14.6984 1.31589 14.7847 1.19094 14.8234 1.06599C14.8638 0.935756 14.841 0.793206 14.76 0.682334C14.6791 0.571463 14.5506 0.506348 14.4133 0.506348C12.4036 0.506348 10.5011 1.14518 8.91197 2.35421C8.72367 2.49852 8.68671 2.76778 8.83102 2.95608C8.97533 3.14439 9.24459 3.18135 9.43289 3.03704C10.6507 2.11135 12.0709 1.55523 13.5827 1.40564C12.9174 2.36829 11.8158 4.15631 12.1484 5.95842C12.3437 7.01786 13.0001 7.92419 14.0965 8.6563C16.2348 10.0818 15.5977 12.3538 15.7121 13.0155C15.7455 13.2073 15.9022 13.3516 16.0958 13.3692C16.2858 13.3868 16.4653 13.276 16.5357 13.0982C16.7082 12.7286 18.0474 10.6608 18.3537 7.39095C18.4487 7.52294 18.5473 7.65669 18.6476 7.7922C19.8126 9.37784 21.1343 11.1764 21.1343 14.0204C21.1343 15.5356 20.638 17.1265 19.6982 18.6348H16.7082V17.9537L19.1597 15.5022C19.3269 15.335 19.3269 15.0622 19.1597 14.895C18.9925 14.7278 18.7197 14.7278 18.5525 14.895L16.7082 16.7394V15.1995C16.7082 14.9619 16.5164 14.7701 16.2788 14.7701C16.0412 14.7701 15.8494 14.9619 15.8494 15.1995V18.6365H11.4233V15.3772L13.8748 12.9257C14.042 12.7586 14.042 12.4858 13.8748 12.3186C13.7076 12.1514 13.4348 12.1514 13.2676 12.3186L11.4233 14.1629V8.75485C11.4233 8.51727 11.2315 8.32544 10.9939 8.32544C10.7563 8.32544 10.5645 8.51727 10.5645 8.75485V11.5847L8.72015 9.74038C8.55296 9.57319 8.28018 9.57319 8.11299 9.74038C7.9458 9.90756 7.9458 10.1803 8.11299 10.3475L10.5645 12.799V18.6365H6.26865V13.9095C6.26865 13.6719 6.07682 13.4801 5.83924 13.4801C5.60166 13.4801 5.40983 13.6719 5.40983 13.9095V15.4494L3.56549 13.605C3.39831 13.4379 3.12553 13.4379 2.95834 13.605C2.79115 13.7722 2.79115 14.045 2.95834 14.2122L5.40983 16.6637V18.6348H2.24559C1.33574 17.167 0.855296 15.5761 0.855296 14.0204C0.855296 11.37 1.72291 9.02763 2.4515 7.52646C2.84219 6.7222 3.2364 6.06225 3.55493 5.57829C3.53206 7.2484 3.50214 9.53271 5.49255 11.5231C5.61574 11.6463 5.80053 11.6833 5.96067 11.6164C6.12082 11.5495 6.22641 11.3929 6.22641 11.2187V9.49751C6.22641 8.20753 6.51855 6.97562 7.09755 5.83699C7.2049 5.6258 7.12043 5.3671 6.90924 5.25975C6.69806 5.1524 6.43936 5.23687 6.332 5.44806C5.69317 6.70812 5.36936 8.07202 5.36936 9.49751V10.022C4.37503 8.52079 4.39791 6.91755 4.41727 5.58533C4.42431 5.13832 4.42959 4.71419 4.39439 4.33934C4.40495 4.02608 4.09345 3.81314 3.80835 3.92225C3.33495 4.10352 2.04321 6.42478 1.77219 6.96858C0.964408 8.58942 0 11.1272 0 14.0204C0 15.8119 0.571957 17.6387 1.65428 19.2982C1.73347 19.4197 1.86898 19.4936 2.01505 19.4936H19.9393C20.0854 19.4936 20.2191 19.4197 20.3001 19.2982C21.4123 17.5929 22.0001 15.7679 22.0001 14.0204C22.0001 10.8948 20.5289 8.89212 19.3462 7.2836C18.9731 6.775 18.6194 6.29455 18.3677 5.84579L18.3607 5.84931Z"
          fill="white"
        />
        <path
          d="M7.41971 3C7.65192 3 7.83941 3.18749 7.83941 3.41971C7.83941 3.65192 7.65192 3.83941 7.41971 3.83941C7.18749 3.83941 7 3.65192 7 3.41971C7 3.18749 7.18749 3 7.41971 3Z"
          fill="white"
        />
      </symbol>
      <symbol id="icon-reforestation" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <mask id="mask0_812_3213" maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
          <path d="M21.7437 0.249268H0.256226V21.7505H21.7437V0.249268Z" fill="white" />
        </mask>
        <g mask="url(#mask0_812_3213)">
          <path
            d="M2.43926 16.0037L3.0757 16.6005C3.24083 16.7553 3.49884 16.7519 3.65881 16.5902L4.79408 15.455H6.80315V20.9111H5.04005V18.8126C5.04005 18.5804 4.85256 18.3929 4.62035 18.3929C4.38814 18.3929 4.20064 18.5804 4.20064 18.8126V20.9111H2.43754V16.0037H2.43926ZM6.64318 9.89215C5.99471 10.3187 5.20862 10.5458 4.37093 10.5458H3.43864C4.5309 9.67886 5.4804 8.68464 6.27336 7.57518C6.59158 7.50121 6.89604 7.37565 7.1747 7.2002C7.56688 8.11701 8.10355 8.72592 8.13107 8.75517C8.21019 8.84461 8.32372 8.8945 8.44413 8.8945C8.56281 8.8945 8.67806 8.84289 8.75719 8.75517C8.78471 8.72421 9.32138 8.11701 9.71356 7.2002C9.99222 7.37565 10.2967 7.50121 10.6149 7.57518C11.4302 8.71732 12.3832 9.72702 13.4565 10.5888H12.519C11.7226 10.5888 10.9366 10.348 10.2451 9.89387C10.0507 9.76659 9.78925 9.81991 9.66196 10.016C9.30418 10.5682 8.87415 11.1255 8.44413 11.6226C8.01754 11.1272 7.58408 10.5682 7.2263 10.016C7.09901 9.81991 6.83756 9.76659 6.64318 9.89387V9.89215ZM12.0718 16.8586L13.1434 19.0018C13.2036 19.1222 13.3189 19.2065 13.4513 19.2288C13.5838 19.2512 13.7197 19.2065 13.816 19.1119L14.3578 18.57V20.9145H12.679V20.0751C12.679 19.8429 12.4915 19.6554 12.2593 19.6554C12.0271 19.6554 11.8396 19.8429 11.8396 20.0751V20.9145H10.1608V17.8166L12.0718 16.862V16.8586ZM9.32138 20.9111H7.64256V11.9752C7.92638 12.3141 8.12419 12.5256 8.13967 12.5411C8.2188 12.6254 8.32888 12.6736 8.44413 12.6736C8.55937 12.6736 8.66946 12.6254 8.74859 12.5428C8.76407 12.5256 8.998 12.2779 9.31966 11.8875V20.9128L9.32138 20.9111ZM15.1972 15.7044L16.9603 16.5575V17.5535C16.9603 17.7857 17.1478 17.9732 17.38 17.9732C17.6123 17.9732 17.7997 17.7857 17.7997 17.5535V16.4681L18.8129 15.455H19.5628V20.9111H17.7997V20.0717C17.7997 19.8395 17.6123 19.652 17.38 19.652C17.1478 19.652 16.9603 19.8395 16.9603 20.0717V20.9111H15.1972V15.7044ZM0.676163 21.7505H21.3242C21.5564 21.7505 21.7439 21.563 21.7439 21.3308C21.7439 21.0986 21.5564 20.9111 21.3242 20.9111H20.4005V15.0352C20.4005 14.803 20.213 14.6155 19.9808 14.6155H18.6374C18.5256 14.6155 18.419 14.6603 18.3399 14.7377L17.2923 15.7852L14.9581 14.6568C14.8274 14.5932 14.6743 14.6018 14.5522 14.6792C14.4301 14.7566 14.3561 14.8908 14.3561 15.0352V17.3797L13.6319 18.1039L12.6326 16.1069C12.5294 15.8987 12.2765 15.8162 12.0701 15.9194L10.1591 16.874V10.8176C10.8918 11.2166 11.7003 11.4248 12.5173 11.4248H14.738C14.922 11.4248 15.0854 11.3044 15.1388 11.1272C15.1921 10.95 15.1233 10.7591 14.9702 10.6559C13.7369 9.83367 12.6463 8.82397 11.7192 7.64742H13.4789C13.6732 7.64742 13.8418 7.51326 13.8865 7.32404C13.9312 7.13483 13.8401 6.93874 13.6663 6.85274C12.9387 6.4898 12.2593 5.98237 11.6435 5.34421C11.4818 5.17736 11.2169 5.1722 11.0501 5.33389C10.8832 5.49558 10.8781 5.76047 11.0398 5.92732C11.3528 6.2507 11.6814 6.54484 12.0254 6.80801H11.2599C10.7766 6.80801 10.2399 6.62568 9.80817 6.21114C9.70324 6.10965 9.55359 6.07181 9.41254 6.10793C9.27149 6.14406 9.15969 6.25242 9.11669 6.39175C8.94124 6.96626 8.66086 7.45477 8.44413 7.77643C8.2274 7.45477 7.94874 6.9697 7.77329 6.39175C7.73029 6.25242 7.61848 6.14578 7.47743 6.10793C7.33638 6.07181 7.18674 6.10965 7.08181 6.21114C6.68963 6.58784 6.16156 6.80801 5.63005 6.80801H4.86632C5.96203 5.97205 6.89432 4.83334 7.56172 3.49855C7.56172 3.49682 7.56344 3.49338 7.56516 3.49166L8.44585 1.64428L8.93092 2.66086C9.03068 2.87071 9.28182 2.95843 9.48995 2.85867C9.6998 2.7589 9.78753 2.50949 9.68776 2.29964L8.82427 0.486652C8.75547 0.340444 8.60754 0.247559 8.44585 0.247559C8.28416 0.247559 8.13623 0.340444 8.06743 0.486652L6.81003 3.127C5.98955 4.76454 4.68227 6.12342 3.22191 6.85274C3.04818 6.94046 2.95701 7.13483 3.00174 7.32404C3.04646 7.51326 3.21503 7.64742 3.4094 7.64742H5.16562C4.26085 8.78097 3.17203 9.77691 1.91807 10.6146C1.76499 10.7178 1.69618 10.9087 1.7495 11.0859C1.80283 11.2631 1.96624 11.3835 2.15201 11.3835H4.37265C5.22754 11.3835 6.04115 11.1839 6.74983 10.8055C6.76875 10.8313 6.78767 10.8588 6.80659 10.8846V14.6155H4.62379C4.51198 14.6155 4.40534 14.6603 4.32621 14.7377L3.35436 15.7095L2.30854 14.7291C2.18641 14.6138 2.00752 14.5829 1.85443 14.6499C1.70134 14.717 1.60158 14.8684 1.60158 15.0352V20.9111H0.677883C0.44567 20.9111 0.258179 21.0986 0.258179 21.3308C0.258179 21.563 0.44567 21.7505 0.677883 21.7505H0.676163Z"
            fill="white"
          />
        </g>
        <path
          d="M10.1606 3.74609C10.3928 3.74609 10.5803 3.93359 10.5803 4.1658C10.5803 4.39802 10.3928 4.58551 10.1606 4.58551C9.92834 4.58551 9.74084 4.39802 9.74084 4.1658C9.74084 3.93359 9.92834 3.74609 10.1606 3.74609Z"
          fill="white"
        />
      </symbol>
      <symbol id="icon-supply" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M23.0626 13.3326L22.5929 13.5003C21.6348 13.8417 20.8629 14.5742 20.4739 15.5137C20.0848 16.4532 20.1117 17.5189 20.5484 18.4356L20.7615 18.8846L18.8784 20.7677L18.4294 20.5546C17.5106 20.118 16.447 20.0911 15.5075 20.4801C14.568 20.8691 13.8355 21.641 13.4941 22.5991L13.3264 23.0688H10.6653L10.4977 22.5991C10.1562 21.641 9.42369 20.8691 8.48422 20.4801C7.54475 20.0911 6.48112 20.118 5.56234 20.5546L5.1133 20.7677L3.23021 18.8846L3.44335 18.4356C3.87998 17.5168 3.90688 16.4532 3.51785 15.5137C3.12881 14.5742 2.35696 13.8417 1.39886 13.5003L0.929126 13.3326V10.6715L1.39886 10.5039C2.35696 10.1624 3.12881 9.4299 3.51785 8.49043C3.90688 7.55096 3.87998 6.48526 3.44335 5.56855L3.23021 5.1195L5.1133 3.23642L5.56234 3.44956C6.48112 3.88619 7.54475 3.91309 8.48422 3.52406C9.42369 3.13502 10.1562 2.36317 10.4977 1.40507L10.6653 0.935333H13.3264L13.4941 1.40507C13.8355 2.36317 14.568 3.13502 15.5075 3.52406C16.447 3.91309 17.5106 3.88619 18.4294 3.44956L18.8784 3.23642L20.7615 5.1195L20.5484 5.56855C20.1117 6.48733 20.0848 7.55096 20.4739 8.49043C20.8629 9.4299 21.6348 10.1624 22.5929 10.5039L23.0626 10.6715V13.3326ZM23.6875 9.89757L22.9074 9.62028C22.1997 9.36782 21.6286 8.82566 21.3409 8.13037C21.0533 7.43508 21.074 6.64873 21.3968 5.97L21.7527 5.2209C21.8376 5.04087 21.8003 4.82773 21.6617 4.68909L19.3109 2.33833C19.1702 2.19762 18.9571 2.16037 18.7791 2.24728L18.03 2.60321C17.3513 2.92602 16.5629 2.94672 15.8696 2.65908C15.1743 2.37144 14.6322 1.80031 14.3797 1.0926L14.1024 0.312468C14.0362 0.126229 13.8583 0 13.6617 0H10.3383C10.1397 0 9.96379 0.124159 9.89757 0.312468L9.62028 1.0926C9.36782 1.80031 8.82566 2.37144 8.13037 2.65908C7.43508 2.94672 6.64873 2.92602 5.97 2.60321L5.2209 2.24728C5.04087 2.16244 4.82773 2.19969 4.68908 2.33833L2.33833 4.68909C2.19762 4.8298 2.16037 5.04294 2.24728 5.2209L2.60321 5.97C2.92602 6.64873 2.94672 7.43715 2.65908 8.13037C2.37144 8.82566 1.80031 9.36782 1.0926 9.62028L0.312468 9.89757C0.126229 9.96379 0 10.1417 0 10.3383V13.6617C0 13.8603 0.124159 14.0362 0.312468 14.1024L1.0926 14.3797C1.80031 14.6322 2.37144 15.1743 2.65908 15.8696C2.94672 16.5649 2.92602 17.3513 2.60321 18.03L2.24728 18.7791C2.16244 18.9591 2.19969 19.1723 2.33833 19.3109L4.68908 21.6617C4.8298 21.8024 5.04294 21.8396 5.2209 21.7527L5.97 21.3968C6.64873 21.074 7.43714 21.0533 8.13037 21.3409C8.82566 21.6286 9.36782 22.1997 9.62028 22.9074L9.89757 23.6875C9.96379 23.8738 10.1417 24 10.3383 24H13.6617C13.8603 24 14.0362 23.8758 14.1024 23.6875L14.3797 22.9074C14.6322 22.1997 15.1743 21.6286 15.8696 21.3409C16.5649 21.0533 17.3513 21.074 18.03 21.3968L18.7791 21.7527C18.9591 21.8376 19.1723 21.8003 19.3109 21.6617L21.6617 19.3109C21.8024 19.1702 21.8396 18.9571 21.7527 18.7791L21.3968 18.03C21.074 17.3513 21.0533 16.5629 21.3409 15.8696C21.6286 15.1743 22.1997 14.6322 22.9074 14.3797L23.6875 14.1024C23.8738 14.0362 24 13.8583 24 13.6617V10.3383C24 10.1397 23.8758 9.96379 23.6875 9.89757Z"
          fill="white"
        />
        <path
          d="M11.5095 14.0155C10.8121 14.1107 10.0982 13.8769 9.59328 13.3719C9.08836 12.867 8.85453 12.1531 8.94972 11.4558C9.64708 11.3606 10.361 11.5944 10.8659 12.0993C11.3708 12.6042 11.6047 13.3181 11.5095 14.0155ZM13.3325 12.5152C14.0092 11.8386 14.9777 11.5344 15.913 11.6917C16.0703 12.627 15.7661 13.5954 15.0894 14.2721C14.4127 14.9488 13.4443 15.253 12.509 15.0957C12.3517 14.1604 12.6559 13.1919 13.3325 12.5152ZM14.2306 5.03051C13.9844 4.94981 13.7195 5.08431 13.6409 5.33056C13.5622 5.57681 13.6947 5.84168 13.9409 5.92032C16.5359 6.76253 18.2803 9.16502 18.2803 11.8965C18.2803 15.2033 15.7123 17.9203 12.4676 18.1604V16.0352C12.6435 16.06 12.8194 16.0703 12.9952 16.0703C14.0154 16.0703 15.0149 15.6689 15.7537 14.9322C16.7324 13.9534 17.1194 12.5132 16.7614 11.1743C16.718 11.0129 16.5917 10.8846 16.4303 10.8432C15.0915 10.4852 13.6512 10.8722 12.6724 11.851C12.4965 12.0269 12.3393 12.2193 12.2027 12.4221C12.0454 12.06 11.8199 11.7227 11.5322 11.4371C10.7252 10.6301 9.53948 10.3114 8.43446 10.6073C8.27305 10.6508 8.14475 10.777 8.10337 10.9384C7.80952 12.0414 8.12613 13.2292 8.93317 14.0362C9.54155 14.6446 10.3651 14.9757 11.2053 14.9757C11.315 14.9757 11.4226 14.9695 11.5322 14.9591V18.1645C8.28547 17.9245 5.71951 15.2054 5.71951 11.9007C5.71951 9.16709 7.46602 6.7646 10.0651 5.92239C10.3113 5.84169 10.4458 5.57888 10.3672 5.33263C10.2865 5.08638 10.0237 4.95188 9.77745 5.03051C8.3372 5.49611 7.09768 6.39006 6.19338 7.61303C5.27046 8.86083 4.7821 10.3445 4.7821 11.9007C4.7821 15.882 8.02059 19.1205 12.002 19.1205C15.9833 19.1205 19.2218 15.882 19.2218 11.9007C19.2218 10.3445 18.7355 8.8629 17.8126 7.61509C16.9104 6.39212 15.6729 5.50025 14.2327 5.03258L14.2306 5.03051Z"
          fill="white"
        />
        <path
          d="M12.0021 5.6182C12.1263 5.6182 12.2463 5.56853 12.3332 5.48162C12.4201 5.39471 12.4718 5.27262 12.4718 5.15053C12.4718 5.02844 12.4222 4.90635 12.3332 4.81944C12.2463 4.73253 12.1263 4.68286 12.0021 4.68286C11.8779 4.68286 11.7579 4.73253 11.671 4.81944C11.5841 4.90635 11.5344 5.02844 11.5344 5.15053C11.5344 5.27262 11.5841 5.39471 11.671 5.48162C11.7579 5.56853 11.88 5.6182 12.0021 5.6182Z"
          fill="white"
        />
      </symbol>
    </defs>
  </svg>
);

export default Icons;
