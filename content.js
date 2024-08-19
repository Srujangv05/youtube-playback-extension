chrome.runtime.onMessage.addListener((message) => {
    const video = document.querySelector('video');
  
    if (message.action === "pause" && video) {
      video.pause();
    } else if (message.action === "play" && video) {
      video.play();
    }
  });
  