import { setContentBody, createFabLikeButton } from '../../utils/testFactories';
import FabLikeButton from '../../../src/scripts/components/FabLikeButton';

describe('Unliking A Restaurant', () => {
  it('should show the unlike button when the restaurant has been liked before', async () => {
    setContentBody(
      createFabLikeButton({ isLiked: true }),
    );

    expect(document.querySelector('i.bx.bxs-like'))
      .toBeTruthy();
  });

  it('should not show the like button when the restaurant has been liked before', async () => {
    setContentBody(
      createFabLikeButton({ isLiked: true }),
    );

    expect(document.querySelector('i.bx.bx-like'))
      .toBeFalsy();
  });

  it('should be able to unlike', (done) => {
    setContentBody(
      createFabLikeButton({
        isLiked: true,
        onClickedCallback: (_isLiked) => {
          expect(_isLiked).toBeFalse();
          done();
        },
      }),
    );

    document.querySelector(FabLikeButton.tagName)
      .dispatchEvent(new Event('click'));
  });
});
