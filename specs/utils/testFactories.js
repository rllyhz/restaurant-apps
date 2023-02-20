import AppBar from '../../src/scripts/components/AppBar';
import CustomFooter from '../../src/scripts/components/CustomFooter';
import FabLikeButton from '../../src/scripts/components/FabLikeButton';
import ToastMessage from '../../src/scripts/components/ToastMessage';
import { createElement } from '../../src/scripts/helpers/DomHelper';

const setContentBody = (node) => {
  document.body.innerHTML = '';
  document.body.appendChild(node);
};

const createFabLikeButton = ({ isLiked = false, onClickedCallback = () => {} }) => createElement({
  tagName: FabLikeButton.tagName,
  data: {
    detail: {
      isLiked,
      position: FabLikeButton.Position.BOTTOM_RIGHT,
      size: FabLikeButton.Size.NORMAL,
      itemName: 'Restaurant',
      toggleCallback: onClickedCallback,
    },
  },
});

const createToastMessage = ({ message, backgroundColor, color }) => ToastMessage.make({
  message, backgroundColor, color,
});

const createAppBar = () => createElement({
  tagName: AppBar.tagName,
  data: {
    callbacks: {
      toggleDrawerCallback: () => {},
      onMenuItemClickedCallback: () => {},
    },
  },
});

const createFooter = () => createElement({
  tagName: CustomFooter.tagName,
});

export {
  setContentBody,
  createAppBar,
  createFooter,
  createFabLikeButton,
  createToastMessage,
};
