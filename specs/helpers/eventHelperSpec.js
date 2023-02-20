/* eslint-disable no-undef */
import { broadcastEvent } from '../../src/scripts/helpers/EventHelper';

describe('EventHelper', () => {
  it('should broadcast an event successfully', (done) => {
    const expectedEventType = 'event-testing';

    const listener = (e) => {
      expect(e.type).toEqual(expectedEventType);
      done();
    };

    document.body.addEventListener(expectedEventType, listener);

    broadcastEvent(expectedEventType, document.body);
    document.body.removeEventListener(expectedEventType, listener);
  });

  it('should broadcast an event with data successfully', (done) => {
    const expectedEventType = 'event-testing';
    const expectedDetail = {
      id: new Date().toISOString(),
      name: 'Dummy Name',
    };

    const listener = (e) => {
      expect(e.type).toEqual(expectedEventType);
      expect(e.detail).toEqual(expectedDetail);
      done();
    };

    document.body.addEventListener(expectedEventType, listener);

    broadcastEvent(expectedEventType, document.body, expectedDetail);
    document.body.removeEventListener(expectedEventType, listener);
  });
});
