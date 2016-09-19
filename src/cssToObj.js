export default function cssToObj(css) {
  const o = {};
  css.split(';')
    .filter(el => !!el)
    .forEach((el) => {
      const s = el.split(':');
      const key = s.shift().trim();
      const value = s.join(':').trim();
      o[key] = value;
    });

  return o;
}
