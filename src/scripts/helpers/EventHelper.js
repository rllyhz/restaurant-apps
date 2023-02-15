const EventType = {
  drawerMode: 'drawer-mode',
};

const broadcastEvent = (eventType, originNode, detail = null) => {
  const newEvent = new CustomEvent(eventType, { detail });

  if (originNode) {
    originNode.dispatchEvent(newEvent);
  } else {
    throw new Error('\'originNode\' not found!');
  }
};

export { EventType, broadcastEvent };
