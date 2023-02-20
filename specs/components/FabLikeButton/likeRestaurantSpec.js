/* eslint-disable no-undef */
import { setContentBody, createFabLikeButton } from '../../utils/testFactories';
import FabLikeButton from '../../../src/scripts/components/FabLikeButton';

describe('Liking A Restaurant', () => {
  it('should show the like button when the restaurant has not been liked before', async () => {
    setContentBody(
      createFabLikeButton({ isLiked: false }),
    );

    expect(document.querySelector('i.bx.bx-like'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    setContentBody(
      createFabLikeButton({ isLiked: false }),
    );

    expect(document.querySelector('i.bx.bxs-like'))
      .toBeFalsy();
  });

  it('should be able to like', async () => {
    setContentBody(
      createFabLikeButton({
        isLiked: false,
        onClickedCallback: (_isLiked) => {
          expect(_isLiked).toBeTrue();
        },
      }),
    );

    document.querySelector(FabLikeButton.tagName)
      .dispatchEvent(new Event('click'));
  });
});
