const bigPicture = document.querySelector('.big-picture');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const body = document.querySelector('body');

const COMMENTS_PER_ONCE = 5;

let commentsShown = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const newComment = document.createElement('li');
  newComment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  newComment.classList.add('social__comment');

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const getComments = () => {
  commentsShown += COMMENTS_PER_ONCE;

  if (commentsShown >= comments.length) {
    commentLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const newCommentElement = createComment(comments[i]);
    fragment.append(newCommentElement);
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCounter.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const hideFullPhoto = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  commentsShown = 0;
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideFullPhoto();
  }
}

const getPhotoDetails = ({ url, description, likes }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const getFullPhoto = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentLoader.classList.add('hidden');
  document.addEventListener('keydown', onEscKeyDown);

  getPhotoDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    getComments();
  }
};

cancelButton.addEventListener('click', hideFullPhoto);
commentLoader.addEventListener('click', getComments);

export { getFullPhoto };
