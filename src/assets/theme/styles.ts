export const outlineFont = (color: string, outlineColor: string) => ({
  color,
  textShadow: `0 0 0 ${outlineColor},
0 -1px 0 ${outlineColor},
0 1px 0 ${outlineColor};`
})
