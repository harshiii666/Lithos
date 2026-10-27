/**
 * Locks page zoom from pinch gestures and trackpad zoom.
 * Keyboard zoom (Ctrl +/-) is intentionally left available for accessibility.
 */
export function installZoomLock() {
  const preventGesture = (event: Event) => {
    event.preventDefault();
  };

  // Safari reports touch and trackpad pinch through dedicated gesture events.
  document.addEventListener('gesturestart', preventGesture, { passive: false });
  document.addEventListener('gesturechange', preventGesture, { passive: false });
  document.addEventListener('gestureend', preventGesture, { passive: false });

  // Chrome, Edge, and Firefox report trackpad pinch as Ctrl + wheel.
  document.addEventListener(
    'wheel',
    (event) => {
      if (event.ctrlKey) event.preventDefault();
    },
    { passive: false },
  );

  // Fallback for browsers that do not honour touch-action for pinch.
  document.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length > 1) event.preventDefault();
    },
    { passive: false },
  );
}
