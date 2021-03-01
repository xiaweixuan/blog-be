async function convertCooike(ctx) {
  if (ctx.cookies.get('theme')) {
    return ctx.cookies.get('theme');
  } else {
    ctx.cookies.set('theme', 'default');
    return 'default';
  }

}

module.exports = convertCooike;