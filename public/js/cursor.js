import { lerp, getMousePos, getSiblings } from "./utils.js";

//Grab the mouse position and set it to mouse state

let mouse = { x: 0, y: 0 }

window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

class Cursor {
    constructor(el) {
        // Variables
        this.Cursor = el
        this.Cursor.style.opacity = 0
        this.Item = document.querySelectorAll(".project-card")
        console.log(this.Item)
        
        this.bounds = this.Cursor.getBoundingClientRect()
        this.cursorConfig = {
            x: { previous: 0, current: 0, amt: 0.2 },
            y: { previous: 0, current: 0, amt: 0.2 },
        };

        // Define mouse move function
        this.onMouseMoveEv = () => {
            this.cursorConfig.x.previous = this.cursorConfig.x.current = mouse.x
            this.cursorConfig.y.previous = this.cursorConfig.y.current = mouse.y

            // set cursor opacity to 1 when hovered on screen
            gsap.to(this.Cursor, {
                duration: 1,
                ease: "Power3.easeOut",
                opacity: 1,
              });

            // Execute Scale 

            this.onScaleMouse()

            // 

            requestAnimationFrame(() => this.render());

            //Clean up function

            window.removeEventListener("mousemove", this.onMouseMoveEv)
        }

        // assign the mouse function
        
        window.addEventListener("mousemove", this.onMouseMoveEv)
    }

    onScaleMouse(){
        this.Item.forEach((link) => {
            

            if (link.matches(":hover")){
                console.log('link is:' );
                console.log(link)
                this.setImage(link)
                this.scaleAnimation(this.Cursor.children[0], 0.8)
            }
            
            link.addEventListener("mouseenter", () => {
                // GSAP animation for scaling media
                this.setImage(link)
                this.scaleAnimation(this.Cursor.children[0], 0.8)
            })


            // Scale down media on hover off
            link.addEventListener("mouseleave", () => {
                
                this.scaleAnimation(this.Cursor.children[0], 0)
            })

            //Hover on a tag to expand to 1,2
            link.children[1].addEventListener("mouseenter", () => {
                this.Cursor.classList.add("media-blend")
                this.scaleAnimation(this.Cursor.children[0], 1.2)
            })

            link.children[1].addEventListener("mouseleave", () => {
                this.Cursor.classList.remove("media-blend")
                this.scaleAnimation(this.Cursor.children[0], 0.8)
            })
        })
    }

    //Scale Animation

    scaleAnimation(el, amt) {
        gsap.to(el, {
            duration: 0.6,
            scale: amt,
            ease: "Power3.easeOut",
            
        });
    }

    // seVideo(el) {
    //     let src = el.getAttribute("data-video-src")
    //     let video = document.querySelector(`#${src}`)
    //     let siblings = getSiblings(video)
    //     if (video.id = src) {
    //         gsap.set(video, { zIndex: 4, opacity: 1 })
    //         siblings.forEach((i) => {
    //             gsap.set(i, { zIndex: 1, opacity: 0 })
    //         })

    //     }
    // }

    setImage(el) {
        let src = el.children[0].children[0].src
        console.log(src);
        let cursorMedia = document.querySelector('.cursor-media img')
        cursorMedia.src = src
    }
    render() {
        this.cursorConfig.x.current = mouse.x
        this.cursorConfig.y.current = mouse.y

        // lerp data-video-src="work"

        for (const key in this.cursorConfig) {
            // WTF IS LERP?

            // Lerp - A lerp returns the value between two numbers at a specified, decimal midpoint:

            this.cursorConfig[key].previous = lerp(
                this.cursorConfig[key].previous,
                this.cursorConfig[key].current,
                this.cursorConfig[key].amt
            )
        }

        // Setting the cursor x and y to our cursor html element
        this.Cursor.style.transform = `translateX(${this.cursorConfig.x.previous}px) translateY(${this.cursorConfig.y.previous}px)`

        // RAF 
        
        requestAnimationFrame(() => this.render())
    }

}

window.onload = () => {
    const cursor = new Cursor(document.querySelector(".cursor"));
    console.log(cursor)
}