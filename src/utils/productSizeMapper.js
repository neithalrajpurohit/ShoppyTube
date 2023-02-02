export const sizeMapper = (size) => {
  const sizes = {
    LARGE: "L",
    MEDIUM: "M",
    SMALL: "S",
    "X-LARGE": "XL",
    "X-SMALL": "XS",
    "XX-LARGE": "XXL",
    "XX-SMALL": "XXS",
    M: "M",
    S: "S",
    L: "S",
    XL: "XL",
    XXL: "XXL",
    XS: "XS",
    XXS: "XXS",
    "LARGE/X-LARGE": "L/XL",
    "SMALL/MEDIUM": "S/M",
    "XX-LARGE/XXX-LARGE": "XX-L",
  };
  return sizes[size];
};
