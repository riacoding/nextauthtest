export const theme = {
  name: "nap-theme",
  tokens: {
    components: {
      pagination: {
        current: {
          backgroundColor: { value: "{colors.primary}" },
        },
        button: {
          hover: {
            backgroundColor: { value: "{colors.neutral.40}" },
            color: { value: "{colors.white}" },
          },
        },
      },
      heading: {
        1: {
          fontSize: { value: "2.5rem" },
          fontWeight: { value: 900 },
        },
      },
    },
    colors: {
      accept: { value: "#23D98A" },
      reject: { value: "#FC4264" },
      midwest: { value: "#bacd48" },
      midwestDark: { value: "#95a43a" },
      west: { value: "#f68325" },
      westDark: { value: "#c5691e" },
      pacific: { value: "#40b7d1" },
      pacificDark: { value: "#3392a7" },
      northeast: { value: "#e51836" },
      northeastDark: { value: "#b7132b" },
      mfa: { value: "#f3c64b" },
      mfaDark: { value: "#c29e3c" },
      south: { value: "#ec088d" },
      southDark: { value: "#bd0671" },
      red: { value: "#FF0000" },
      primary: { value: "#00A9A7" },
      primaryLight: { value: "#51CBC9" },
      primaryHover: { value: "#1ab2b0" },
      primaryActive: { value: "#009896" },
      highlight: { value: "#00e1df" },
      black: { value: "#000000cc" },
      trueBlack: { value: "#000000" },
      grey: { value: "#3A3A3A" },
      lightgrey: { value: "#909292" },
      note: { value: "#E1E1E1" },
      offWhite: { value: "#EDEDED" },
      purple: { value: "#7A577A" },
      white: { value: "#FFFFFF" },
      region: {
        1: { value: "#e51836" },
        3: { value: "#ec088d" },
        4: { value: "#bacd48" },
        5: { value: "#f68325" },
        6: { value: "#40b7d1" },
        7: { value: "#f3c64b" },
      },
      border: {
        focus: { value: "#cbcdcd" },
      },
      font: {
        primary: { value: "#000000cc" },
        highlight: { value: "#00A9A7" },
      },
    },
  },
};
