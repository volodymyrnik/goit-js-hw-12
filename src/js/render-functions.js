export const imagesCardTemplate = hits =>
  hits
    .map(
      image => `
          <li class="gallery-card">
            <a class="gallery-link" href="${image.largeImageURL}">
              <img
                class="gallery-img"
                src="${image.webformatURL}"
                alt="${image.tags}"
                loading="lazy"
              />
              <div class="info">
  <div class="info-list">
    <span class="info-item">Likes</span>
    <span class="info-item-value">${image.likes}</span>
  </div>
  <div class="info-list">
    <span class="info-item">Views</span>
    <span class="info-item-value">${image.views}</span>
  </div>
  <div class="info-list">
    <span class="info-item">Comments</span>
    <span class="info-item-value">${image.comments}</span>
  </div>
  <div class="info-list">
    <span class="info-item">Downloads</span>
    <span class="info-item-value">${image.downloads}</span>
  </div>
</div>
            </a>
          </li>`
    )
    .join('');
