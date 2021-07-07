const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;
  
/* methods are on media and can use them instead of raw queries */
const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  phone: customMediaQuery(576),
  smallPhone: customMediaQuery(380),
}

export default media
