// The app core's theme (app-ui, pinned to one version), loaded without touching the pages' own look: the kit's custom
// properties and bare-element rules sit in the cascade layer "kit" (css/kit.css), which every unlayered rule of the app
// beats. If core.anawj.com cannot be reached the pages open and look as before; only a warning is logged.
export const CORE = 'https://core.anawj.com/ui/1.0.0-rc.34/';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = new URL('../css/kit.css?v=20261029', import.meta.url).href;
document.head.append(link);

import(CORE + 'theme/choice.js')
  .then((theme) => theme.applyTheme({ accent: '#633d3c', layer: 'kit', ownTheme: true }))
  .catch((err) => console.warn('app core theme not loaded:', err && err.message));
