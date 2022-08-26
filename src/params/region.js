/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /^(EU|UK|US|eu|uk|us)$/.test(param);
}
