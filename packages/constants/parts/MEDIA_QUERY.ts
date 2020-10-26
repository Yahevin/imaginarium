// const mediaQuery = {
//   desktop: '@media screen and (min-width: 1025px)' as '@media screen and (min-width: 1025px)',
//   tablet: '@media screen and (max-width: 1024px) and (min-width: 768px)' as '@media screen and (max-width: 1024px) and (min-width: 768px)',
//   phone: '@media screen and (max-width: 767px)' as '@media screen and (max-width: 767px)'
// };
//
// export {mediaQuery};

export enum mediaQuery  {
    desktop = '@media screen and (min-width: 1025px)',
    tablet = '@media screen and (max-width: 1024px) and (min-width: 768px)',
    phone = '@media screen and (max-width: 767px)',
}
