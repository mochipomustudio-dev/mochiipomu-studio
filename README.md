# Mochipomu Studio

Sitio oficial de Mochipomu Studio, con páginas individuales para sus aplicaciones.

## Estructura

- `index.html`: página principal y catálogo de aplicaciones.
- `apps/croquimi-recipes/index.html`: presentación de Croquimi Recipes.
- `apps/croquimi-recipes/privacy.html`: política de privacidad bilingüe de Croquimi Recipes (enlace directo para Google Play).
- `site.css` y `site.js`: estilos y funcionalidades compartidos.
- `assets/`: ilustraciones originales.

Las próximas aplicaciones pueden añadirse como carpetas dentro de `apps/`, usando los estilos y scripts compartidos y sin duplicar sus funciones.

## Publicación

Suba el contenido de `mochipomu-studio` a la raíz del repositorio público `mochipomu-studio`. En GitHub, active Settings → Pages → Deploy from a branch → main → /(root).

La página principal estará en `https://mochipomustudio-dev.github.io/mochipomu-studio/` y la política de Croquimi en `https://mochipomustudio-dev.github.io/mochipomu-studio/apps/croquimi-recipes/privacy.html` una vez desplegada.

Antes de publicar declaraciones de privacidad, compruebe que coincidan con las funciones, publicidad, permisos y servicios reales de la aplicación.
