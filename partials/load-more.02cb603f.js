function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){o[e]=n},n.parcelRequired7c6=i);var a=i("7Y9D8"),s=i("fZKcF"),r=i("18XA8");const c=document.getElementById("search-form"),l=document.querySelector(".gallery"),f=document.querySelector(".load-more"),u=new(0,r.ImagesAPI),p=new(e(s))(".gallery a",{captionsData:"alt",captionDelay:"250"});function d(e){const n=e.map((({webformatURL:e,largeImageURL:n,tags:t,likes:o,views:i,comments:a,downloads:s})=>`<div class="photo-card">\n        <a class="photo-card__item" href="${n}">\n          <div class="photo-card__tumb">\n            <img class="photo-card__img" src="${e}" alt="${t}" loading="lazy" />\n          </div>\n          <div class="info">\n            <p class="info-item">\n              <b class="info-item__param">Likes</b>\n              <span class="info-item__num">${o}</span>\n            </p>\n            <p class="info-item">\n              <b class="info-item__param">Views</b>\n              <span class="info-item__num">${i}</span>\n            </p>\n            <p class="info-item">\n              <b class="info-item__param">Comments</b>\n              <span class="info-item__num">${a}</span>\n            </p>\n            <p class="info-item">\n              <b class="info-item__param">Downloads</b>\n              <span class="info-item__num">${s}</span>\n            </p>\n          </div>\n        </a>\n      </div>`)).join("");l.insertAdjacentHTML("beforeend",n),p.refresh()}function m(e){f.style.display=e?"block":"none"}function g(){e(a).Notify.info("We're sorry, but you've reached the end of search results.",{position:"center-center"})}function y(n){e(a).Notify.failure(`Oops! Something went wrong. You caught the following error: ${n.message}.`,{position:"center-center"})}m(!1),c.addEventListener("submit",(async function(n){if(n.preventDefault(),m(!1),l.innerHTML="",u.page=1,u.query=n.currentTarget.elements.searchQuery.value.trim(),""===u.query)return void e(a).Notify.info("To search for pictures you need to specify what you are looking for.",{position:"center-center"});try{const{hits:n,totalHits:o}=await u.getImages();if(!o)return void e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again.",{position:"center-center"});if(t=o,e(a).Notify.success(`Hooray! We found ${t} images.`,{position:"center-center"}),d(n),o<u.page*u.per_page)return m(!1),void g();m(!0)}catch(e){console.log(e),y(e)}var t})),f.addEventListener("click",(async function(e){u.page+=1;try{const{hits:e,totalHits:n}=await u.getImages();d(e),function(){const{height:e}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}(),n<u.page*u.per_page&&(m(!1),g())}catch(e){y(e)}}));
//# sourceMappingURL=load-more.02cb603f.js.map