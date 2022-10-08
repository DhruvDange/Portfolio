import gsap from "gsap";
import Experience from "./Experience";


export default class Animations
{

    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.instance = this.camera.instance
    }


    animation1_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2, ease: "power1.out", x: 0, onComplete: () =>
            {
                console.log("hi1");
            }
        })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", y: 1.3 })

        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", x: -0.25 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", z: -0.3 })

    }

    animation2_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2, ease: "power1.out", x: 0.0, onComplete: () =>
            {
                console.log("hi2");
            }
        })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", y: 0.6 })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0.0 })

        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", x: 0.4 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", y: 0.77 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", z: 0.55 })
    }


    animation3_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2, ease: "power1.out", x: 0.0, onComplete: () =>
            {
                console.log("hi3");
            }
        })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", y: 0.0 })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0.0 })

        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", x: -0.4 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", y: 0.77 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", z: 0.25 })
    }

    animation4_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2, ease: "power1.out", x: 0.0, onComplete: () =>
            {
                console.log("hi4");
            }
        })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", y: 0.0 })
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0.0 })

        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", x: -0.4 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", y: 0.8 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", z: 0.8 })
    }

    animation1Back()
    {
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", y: 0 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", x: -0.40 })
        gsap.to(this.instance.position, { duration: 2, ease: "power1.out", z: 0.2 })
    }



    animation1_mobile()
    {

        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", y: 1.3 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", x: 0 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", z: 0 })



        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", x: -0.20 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", y: 0.77 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", z: -0.2 })

    }


    animation2_mobile()
    {
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", y: 0 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", x: 0 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", z: 0 })



        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", x: -0.4 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", y: 0.77 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", z: 0.2 })
    }


    animation3_mobile()
    {
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", y: 0 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", x: 0 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", z: 0 })



        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", x: -0.4 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", y: 0.77 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", z: 0.8 })
    }


    animation4_mobile()
    {
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", y: 1 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", x: 0 })
        gsap.to(this.instance.rotation, { duration: 1, ease: "power1.out", z: 0 })



        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", x: 0.8 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", y: 0.79 })
        gsap.to(this.instance.position, { duration: 1, ease: "power1.out", z: 0.35 })
    }

}

