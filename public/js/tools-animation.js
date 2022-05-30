function toolsAnimation(){

  const tools = document.querySelectorAll('.tool-list span')
  if(tools){
    tools.forEach((tool) => {
      
      tool.addEventListener("mouseenter", () => {
        // GSAP animation for scaling media
        // this.setImage(link)
        // this.scaleAnimation(this.Cursor.children[0], 0.8)
        console.log('tool is:' );
        console.log(tool.getAttribute("name"))
        let ToolImage = document.querySelector('#other-section-image')
        ToolImage.src = tool.getAttribute("name")
        gsap.to(tool, {
          duration: .3,
          opacity: 0.7,
          ease: "Expo.easeInOut",
        })
      })

      tool.addEventListener("mouseleave", () => {
          gsap.to(tool, {
            duration: .5,
            opacity: 1,
            ease: "Expo.easeInOut",
          })

      })
      // console.log('toolsAnimation() in action')
    })
  }

  const aboutMe = document.querySelector('.about-me')
  if(aboutMe){
    aboutMe.addEventListener("mouseenter", () => {
      // GSAP animation for scaling media
      // this.setImage(link)
      // this.scaleAnimation(this.Cursor.children[0], 0.8)
      console.log('aboutme is:' );
      let aboutMeImage = document.querySelector('#other-section-image')
      aboutMeImage.src = '/assets/images/cheers.png'
      gsap.to(aboutMe, {
        duration: .3,
        opacity: 0.7,
        ease: "Expo.easeInOut",
      })

    })

    aboutMe.addEventListener("mouseleave", () => {
      gsap.to(aboutMe, {
        duration: .5,
        opacity: 1,
        ease: "Expo.easeInOut",
      })

    })
    // console.log('toolsAnimation in action')
    
  }

}

export default toolsAnimation