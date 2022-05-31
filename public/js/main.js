import toolsAnimation from './tools-animation.js'
import getContactForm from './contactForm.js'

// ========/ Luxy Smooth Scrolling /==========

if (window.screen.width > 1359) {
  luxy.init();
}



function delay(n){
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done()
    }, n)
  })
}


// ========/ GSAP Animations /==========

function pageTransition() {
    var tl = gsap.timeline();

    tl.to(".loading-screen", {
      duration: .8,
      height: "100vh",
      top: "0%",
      borderRadius: "0 0 0 0",
      ease: "Expo.easeInOut"
  
    })

    tl.to(".loading-screen-text", {
      opacity: 1,
      ease: "Expo.easeInOut",
    })
    
    tl.to(".loading-screen", {
      duration: .8,
      height: "100vh",
      top: "100%",
      borderRadius: "50% 50% 0 0",
      ease: "Expo.easeInOut",
      delay: 0.3
  
    })

    tl.to(".big-bro", {
      duration: 0,
      visibility: "visible",
      ease: "Expo.easeInOut",
      
  
    })

    
    tl.set(".loading-screen", {
      top: "-100vh",
      borderRadius: "0 0 50% 50%"

    })

    tl.set(".loading-screen-text", {
      opacity: 0,
      
    })
  }

// ========/ ScrollReveal Animations /==========

var slideUp = {
  distance: '150%',
  origin: 'bottom',
  opacity: 0,
  duration: 1500,
  easing: 'cubic-bezier(0.5, 0, 0, 1)'
};

// ========/ Barba Transitions /==========

barba.init({

  views: [{
    namespace: 'index',
    beforeEnter(data) {
      ScrollReveal().reveal('.animate-this', slideUp);
    }
  },
  {
    namespace: 'contact',
    beforeEnter(data) {
      ScrollReveal().reveal('.animate-this', slideUp);
      getContactForm()
    }
  },
  {
    namespace: 'about',
    beforeEnter(data) {
      ScrollReveal().reveal('.animate-this', slideUp);
      toolsAnimation()
    }
  },

],

  transitions: [{
    debug: true,
    async beforeLeave(data) {
      let loadingScreenText = document.querySelector('.loading-screen-text')
      console.log('this is the data')
      console.log(data.next.url.path)

      switch (data.next.url.path) {
        case '/':
          loadingScreenText.innerHTML = 'Projects'
          break;
        case '/contact':
          loadingScreenText.innerHTML = 'Contact'
          break;
        case '/about':
          loadingScreenText.innerHTML = 'About'
          break;
      
        default:
          let string = data.next.url.path
          var latestPath = string.match(/([^\/]*)\/*$/)[1]
          console.log(latestPath);
          loadingScreenText.innerHTML = latestPath
          break;
      }
      
      
    },

    async leave(data) {
      const done = this.async()
      pageTransition()

      // Allow the previous animation to end
      await delay(1500)
      done()
    },

    async once(data) {

      let loadingScreenText = document.querySelector('.loading-screen-text')
      loadingScreenText.innerHTML = data.next.url.path
      switch (data.next.url.path) {
        case '/':
          loadingScreenText.innerHTML = 'Projects'
          break;
        case '/contact':
          loadingScreenText.innerHTML = 'Contact'
          break;
        case '/about':
          loadingScreenText.innerHTML = 'About'
          break;
      
        default:
          let string = data.next.url.path
          var latestPath = string.match(/([^\/]*)\/*$/)[1]
          console.log(latestPath);
          loadingScreenText.innerHTML = data.next.url.path
          break;
      }
      const done = this.async()
      await delay(1500)
      done()
      
    }
  }]
})
