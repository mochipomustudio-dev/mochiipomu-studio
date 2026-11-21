const root=document.documentElement;
const themeButton=document.getElementById('theme');
const langButton=document.getElementById('lang');
const yearNodes=document.querySelectorAll('[data-year]');
const privacyDialog=document.getElementById('privacy-dialog');
const privacyFrame=document.getElementById('privacy-frame');
let privacyTrigger=null;
const pageTitle=document.body?.dataset.titleEs&&document.body?.dataset.titleEn?document.body:null;
let language=new URLSearchParams(location.search).get('lang')==='en'?'en':localStorage.getItem('mochipomu-lang')==='en'?'en':'es';
let theme=localStorage.getItem('mochipomu-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
function applyTheme(value){
  theme=value;
  root.dataset.theme=value;
  localStorage.setItem('mochipomu-theme',value);
  if(themeButton){
    themeButton.textContent=value==='dark'?'☀':'☾';
    themeButton.setAttribute('aria-label',value==='dark'?(language==='es'?'Activar modo claro':'Switch to light mode'):(language==='es'?'Activar modo oscuro':'Switch to dark mode'));
  }
}
function updateLocalizedLinks(value){
  document.querySelectorAll('a[data-local]').forEach(node=>{
    const url=new URL(node.dataset.local,location.href);
    url.searchParams.delete('lang');
    if(value==='en')url.searchParams.set('lang','en');
    node.href=url.href;
  });
}
function applyLanguage(value){
  language=value;
  root.lang=value;
  localStorage.setItem('mochipomu-lang',value);
  document.querySelectorAll('[data-es][data-en]').forEach(node=>{node.textContent=node.getAttribute('data-'+value)});
  document.querySelectorAll('[data-es-html][data-en-html]').forEach(node=>{node.innerHTML=node.getAttribute('data-'+value+'-html')});
  document.querySelectorAll('[data-aria-es][data-aria-en]').forEach(node=>{node.setAttribute('aria-label',node.getAttribute('data-aria-'+value))});
  document.querySelectorAll('[data-view]').forEach(node=>{node.hidden=node.dataset.view!==value});
  document.querySelectorAll('[data-policy]').forEach(node=>{node.hidden=node.dataset.policy!==value});
  if(pageTitle)document.title=pageTitle.dataset['title'+(value==='es'?'Es':'En')];
  if(langButton){
    langButton.textContent=value==='es'?'EN':'ES';
    langButton.setAttribute('aria-label',value==='es'?'Switch to English':'Cambiar a español');
  }
  updateLocalizedLinks(value);
  if(privacyDialog){
    const closeButton=privacyDialog.querySelector('.privacy-dialog-close');
    if(closeButton)closeButton.setAttribute('aria-label',value==='es'?'Cerrar':'Close');
    if(privacyFrame&&privacyDialog.open){
      const current=new URL(privacyFrame.src,location.href);
      current.searchParams.set('lang',value);
      current.searchParams.set('embed','1');
      privacyFrame.src=current.href;
    }
  }
  applyTheme(theme);
}
if(themeButton)themeButton.addEventListener('click',()=>applyTheme(theme==='dark'?'light':'dark'));
if(langButton)langButton.addEventListener('click',()=>applyLanguage(language==='es'?'en':'es'));
if(privacyDialog&&privacyFrame){
  document.querySelectorAll('[data-privacy-popup]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();
    privacyTrigger=link;
    const url=new URL(link.href,location.href);
    url.searchParams.set('embed','1');
    url.searchParams.set('lang',language);
    privacyFrame.src=url.href;
    privacyDialog.showModal();
    privacyDialog.querySelector('.privacy-dialog-close')?.focus();
  }));
  privacyDialog.querySelectorAll('[data-dialog-close]').forEach(button=>button.addEventListener('click',()=>privacyDialog.close()));
  privacyDialog.addEventListener('click',event=>{if(event.target===privacyDialog)privacyDialog.close()});
  privacyDialog.addEventListener('close',()=>{privacyFrame.removeAttribute('src');privacyTrigger?.focus()});
}
yearNodes.forEach(node=>{node.textContent=new Date().getFullYear()});
applyLanguage(language);
