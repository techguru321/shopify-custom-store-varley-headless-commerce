module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderRadius: {
      DEFAULT: '8px',
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '15px',
      xl: '20px',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT: '0px 0px 4px rgba(0, 0, 0, 0.1)',
    },
    fontFamily: {
      plantin: ['"Plantin MT Pro"', 'serif'],
      plantinItalic: ['"Plantin MT Pro Italic"', 'serif'],
      nhaasReg: ['"NeueHaasGroteskDisp Pro"', 'sans-serif'],
      nhaasMd: ['"NeueHaasGroteskDisp Pro-65Md"', 'sans-serif'],
      nhaasLt: ['"NeueHaasGroteskDisp Pro-45Lt"', 'sans-serif'],
    },
    backgroundImage: {
      'form-arrow': "url('/src/components/media/arrow.svg')",
    },
    fontSize: {
      // 12px
      xs: [
        '0.75rem',
        {
          letterSpacing: '0.05em',
          lineHeight: '1.43',
        },
      ],
      // 14px :normal
      sm: [
        '0.875rem',
        {
          letterSpacing: '0.05em',
          lineHeight: '1.127',
        },
      ],
      // 16px :h6
      md: [
        '1rem',
        {
          lineHeight: '1.5',
        },
      ],
      //18px :h5
      lg: [
        '1.125rem',
        {
          lineHeight: '1.1',
        },
      ],
      // 20px :h4
      xl: [
        '1.25rem',
        {
          lineHeight: '1.4',
        },
      ],
      // 28px :h3
      '2xl': [
        '1.75rem',
        {
          lineHeight: '1.43',
        },
      ],
      // 32px :h2
      '3xl': [
        '2rem',
        {
          lineHeight: '1.5',
        },
      ],
      // 40px :h1
      '4xl': [
        '2.5rem',
        {
          lineHeight: '1.2',
        },
      ],
      // 48px :h1
      '5xl': [
        '3rem',
        {
          lineHeight: '1.2',
        },
      ],
    },
    fontWeight: {
      bold: 700,
      medium: 500,
      normal: 400,
      light: 300,
      thin: 100,
    },
    lineHeight: {
      none: '1',
      field: '1.25',
      caption: '1.25',
      paragraph: '1.6',
    },
    extend: {
      flex: {
        2: '2 1 0%',
      },
      transitionProperty: {
        width: 'width',
      },
      animation: {
        pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        heartbeat: 'heartbeat 3s ease-in-out infinite both',
      },
      colors: {
        darkGray: '#5B5D62',
        gray: '#5B5D62',
        lightGray: '#F3F3F3',
        lightGray1: '#E0DCD1',
        lightGrey2: '#E7E4DE',
        lightYellow: '#f5f7f4',
        red: '#EC5039',
        shopPay: '#5A31F4',
        brandAsphalt: '#5B5D62',
        brandAsphaltDark: '#A05E4C',
        brandBrick: '#B47260',
        brandSand: '#B8A08F',
        brandClay: '#CFC7C0',
        brandMarble: '#F6F5F1',
        brandBlue: '#4489F7',
        brandLightGrey: '#acacac',
      },
      height: {
        'header-sm': '4.375rem',
        'header-lg': '4.4375rem',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.75,
          },
        },
        heartbeat: {
          from: {
            transform: 'scale(1)',
            transformOrigin: 'center center',
            animationTimingFunction: 'ease-out',
          },
          '10%': {
            transform: 'scale(0.91)',
            animationTimingFunction: 'ease-in',
          },
          '17%': {
            transform: 'scale(0.98)',
            animationTimingFunction: 'ease-out',
          },
          '33%': {
            transform: 'scale(0.87)',
            animationTimingFunction: 'ease-in',
          },
          '45%': {
            transform: 'scale(1)',
            animationTimingFunction: 'ease-out',
          },
        },
      },
      minWidth: {
        '1/2': '50%',
        '1/3': '33.333%',
        '1/4': '25%',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        7.5: '30px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        13: '52px',
        14: '56px',
        15: '60px',
        16: '64px',
        17: '68px',
        18: '72px',
        19: '76px',
        20: '80px',
        21: '84px',
        22: '88px',
        23: '90px',
        24: '96px',
        25: '100px',
        26: '104px',
        27: '108px',
        28: '112px',
        29: '116px',
        30: '120px',
        31: '124px',
        32: '128px',
        33: '132px',
        34: '136px',
        35: '140px',
        36: '144px',
        37: '148px',
        38: '152px',
        39: '156px',
        40: '160px',
        overlap: '20px',
      },
    },
  },
  plugins: [],
};
