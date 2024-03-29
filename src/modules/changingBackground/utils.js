import { css } from "styled-components";
export const getBGColorGradientByTime = ({ currentHour }) => {
  /**
   * Sky gradient by time, orignally taken from https://codepen.io/Winday/pen/qrPLeY
   * adapted to be used with styled-components and we're listening on time change to change the bg accordifgly
   */
  const gradientByTime = [
    css`
      background: #00000c;
    `,
    css`
      background: linear-gradient(to bottom, #020111 85%, #191621 100%);
    `,
    css`
      background: linear-gradient(to bottom, #020111 60%, #20202c 100%);
    `,
    css`
      background: linear-gradient(to bottom, #020111 10%, #3a3a52 100%);
    `,
    css`
      background: linear-gradient(to bottom, #20202c 0%, #515175 100%);
    `,
    css`
      background: linear-gradient(
        to bottom,
        #40405c 0%,
        #6f71aa 80%,
        #8a76ab 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #4a4969 0%,
        #7072ab 50%,
        #cd82a0 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #757abf 0%,
        #8583be 60%,
        #eab0d1 100%
      );
    `,
    css`
      background: linear-gradient(to bottom, #82addb 0%, #ebb2b1 100%);
    `,
    css`
      background: linear-gradient(
        to bottom,
        #94c5f8 1%,
        #a6e6ff 70%,
        #b1b5ea 100%
      );
    `,
    css`
      background: linear-gradient(to bottom, #b7eaff 0%, #94dfff 100%);
    `,
    css`
      background: linear-gradient(to bottom, #9be2fe 0%, #67d1fb 100%);
    `,
    css`
      background: linear-gradient(to bottom, #90dffe 0%, #38a3d1 100%);
    `,
    css`
      background: linear-gradient(to bottom, #57c1eb 0%, #246fa8 100%);
    `,
    css`
      background: linear-gradient(to bottom, #2d91c2 0%, #1e528e 100%);
    `,
    css`
      background: linear-gradient(
        to bottom,
        #2473ab 0%,
        #1e528e 70%,
        #5b7983 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #1e528e 0%,
        #265889 50%,
        #9da671 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #1e528e 0%,
        #728a7c 50%,
        #e9ce5d 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #154277 0%,
        #576e71 30%,
        #e1c45e 70%,
        #b26339 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #163c52 0%,
        #4f4f47 30%,
        #c5752d 60%,
        #b7490f 80%,
        #2f1107 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #071b26 0%,
        #071b26 30%,
        #8a3b12 80%,
        #240e03 100%
      );
    `,
    css`
      background: linear-gradient(
        to bottom,
        #010a10 30%,
        #59230b 80%,
        #2f1107 100%
      );
    `,
    css`
      background: linear-gradient(to bottom, #090401 50%, #4b1d06 100%);
    `,
    css`
      background: linear-gradient(to bottom, #00000c 80%, #150800 100%);
    `,
    css`
      background: #00000c;
    `,
  ];
  return gradientByTime[currentHour];
};
