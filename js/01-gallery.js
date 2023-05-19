import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryUl = document.querySelector(".gallery");

const arrayImg = [];

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item"><a href="${original}" class="gallery__link"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a></li>`
  )
  .join("");

arrayImg.push(markup);

console.log(markup);

galleryUl.insertAdjacentHTML("beforeend", arrayImg);

galleryUl.addEventListener("click", openImageClick);

function openImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<div class="modal">
        <img src="${event.target.dataset.source}" width="800" height="600">
    </div>`,
    {
      onShow: () => {
        document.addEventListener("keydown", onEscape);
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscape);
      },
    }
  );

  instance.show();

  const modalRef = document.querySelector(".modal");
  modalRef.addEventListener("click", () => {
    instance.close();
  });

  function onEscape(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
