if (!!window.IntersectionObserver) {
  // ? Takes two functions
  // * callback: function that is called when the observerer notice intersection
  // * options: her kan du definerer når den skal reagere, eks når en ting er 20% synlig i view
  // let observer = new IntersectionObserver(callback, options);
} else {
  alert("Dont use IE, use chrome or something else... not IE");
}

let textContainer = document.querySelector(".text-container");
let imageContainer = document.querySelector(".image-container");
let video = document.querySelector("video");

let isPaused = false;

// ? Observes, the video and pauses when even a tiny bit of it is out of view
let videoObserver = new IntersectionObserver((entries, videoObserver) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio != 1 && !video.paused) {
      console.log("PAAAUSE");
      video.pause();
      isPaused = true;
      // textContainer.classList.add("seen"); // Adds 'seen' to the class, applies it (IKKE LEGG TIL .)
      // imageContainer.classList.add("seen");
      console.log("textContainer", textContainer.classList);
    } else if (isPaused) {
      console.log("UNPAUSE");
      video.play();
      isPaused = false;
    }
  });
});
// ? We observe the video tag
// videoObserver.observe(video);

let scrollBackContainer = document.querySelector(".container");

let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      // ! Must have this line, or it will trigger anyway!
      if (entry.intersectionRatio > 0) {
        console.log("TRIGGERED");
        textContainer.classList.add("seen");
        imageContainer.classList.add("seen");
        observer.unobserve(entry.target); // We unobserve the entry, since we this is only a one time thing
        // console.log(observer);
      }
    });
  },
  {
    threshold: 0.4 // Will trigger when 40% of the observed DOM is displayed in view
    // rootMargin: "0px 0px -200px 0px" // top, left, bottom, right
  }
);

observer.observe(scrollBackContainer);
