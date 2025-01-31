import{a as y,S as v,i as r}from"./assets/vendor-B6jJ9_I0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function d(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(t){if(t.ep)return;t.ep=!0;const i=d(t);fetch(t.href,i)}})();const f=a=>a.map(e=>`
          <li class="gallery-card">
            <a class="gallery-link" href="${e.largeImageURL}">
              <img
                class="gallery-img"
                src="${e.webformatURL}"
                alt="${e.tags}"
                loading="lazy"
              />
              <div class="info">
  <div class="info-list">
    <span class="info-item">Likes</span>
    <span class="info-item-value">${e.likes}</span>
  </div>
  <div class="info-list">
    <span class="info-item">Views</span>
    <span class="info-item-value">${e.views}</span>
  </div>
  <div class="info-list">
    <span class="info-item">Comments</span>
    <span class="info-item-value">${e.comments}</span>
  </div>
  <div class="info-list">
    <span class="info-item">Downloads</span>
    <span class="info-item-value">${e.downloads}</span>
  </div>
</div>
            </a>
          </li>`).join(""),L="48308649-6275080a65400e008e92230b2",h=(a,e)=>{const d={params:{key:L,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}};return y.get("https://pixabay.com/api/",d)},b=document.querySelector(".search-form"),S=document.querySelector(".search-input");document.querySelector(".search-button");const p=document.querySelector(".gallery"),n=document.querySelector(".loader"),s=document.querySelector(".load-more-btn");let g=new v(".gallery a",{captionsData:"alt",captionDelay:250}),o=1,l="";s.classList.add("is-hidden");const w=async a=>{try{if(a.preventDefault(),l=S.value.trim(),!l){r.warning({message:"Please enter a search term.",position:"topRight"});return}o=1,s.classList.add("is-hidden"),p.innerHTML="",n.classList.add("active");const e=await h(l,o);if(n.classList.remove("active"),e.data.total===0){r.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p.insertAdjacentHTML("beforeend",f(e.data.hits)),s.classList.remove("is-hidden"),g.refresh(),o*15>=e.data.totalHits?(s.classList.add("is-hidden"),s.removeEventListener("click",c),r.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):(s.classList.remove("is-hidden"),s.addEventListener("click",c))}catch(e){n.classList.remove("active"),r.error({message:"Something went wrong, please try again later.",position:"topRight"}),console.error("Error fetching data:",e)}},c=async()=>{try{o++,n.classList.add("active");const a=await h(l,o);n.classList.remove("active"),p.insertAdjacentHTML("beforeend",f(a.data.hits)),g.refresh(),o*15>=a.data.totalHits?(s.classList.add("is-hidden"),s.removeEventListener("click",c),r.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):(s.classList.remove("is-hidden"),s.addEventListener("click",c));const e=document.querySelector(".gallery-card").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch(a){console.log(a)}};b.addEventListener("submit",w);s.addEventListener("click",c);
//# sourceMappingURL=index.js.map
