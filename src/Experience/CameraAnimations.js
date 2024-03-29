import gsap from "gsap";
import Experience from "./Experience";

export default class Animations
{
    constructor()
    {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
        this.instance = this.camera.instance;
        this.canScroll = true;
        this.workScroll = this.sizes.width > 480 ? 2.2 : 1.65;
        // this.currentScroll = 0
        this.currentScene = 0;
    }

    animation1_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            x: 0.02,
            onStart: () =>
            {
                this.currentScene = 1;
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, this.sizes.bodyHeight * 0.25);
                // this.currentScroll = this.sizes.bodyHeight * 0.25
            },
        });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 1.5,
        });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.25,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.77,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: -0.35,
        });
    }

    animation2_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            x: 0.0,
            onStart: () =>
            {
                this.currentScene = 2;
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
 
            },
        });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 0.6,
        });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            z: 0.0,
        });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: 0.4,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.77,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.55,
        });
    }

    animation3_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            x: 0.0
        });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 0.0,
            onStart: () =>
            {
                this.canScroll = false;
                this.currentScene = 3;

            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, this.sizes.bodyHeight * 0.75);
                // this.currentScroll = this.sizes.bodyHeight * 0.75
            },
        });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            z: 0.0,
        });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.4,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.77,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.25,
        });
    }

    animation4_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            x: 0.0,
            onStart: () =>
            {
                this.currentScene = 4;
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, this.sizes.bodyHeight * 0.9);
                // this.currentScroll = this.sizes.bodyHeight * 0.9
            },
        });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 0.0,
        });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            z: 0.0,
        });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.4,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.8,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.8,
        });
    }

    animation1Back()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 0,
            onStart: () =>
            {
                this.currentScene = 0;
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, 0);
                // this.currentScroll = 0
            },
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.4,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.2,
        });
    }

    animation1_mobile()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 1.3,
            onStart: () =>
            {
                this.canScroll = false;
                this.currentScene = 1;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, this.sizes.bodyHeight * 0.25);
                // this.currentScroll = this.sizes.bodyHeight * 0.25
            },
        });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", x: 0 });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.3,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.77,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: -0.22,
        });
    }

    animation2_mobile()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 0,
            onStart: () =>
            {
                this.currentScene = 2;
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, this.sizes.bodyHeight * 0.50);
                // this.currentScroll = this.sizes.bodyHeight * 0.50
            },
        });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", x: 0 });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.4,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.77,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.2,
        });
    }

    animation3_mobile()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 0,
            onStart: () =>
            {
                this.currentScene = 3;
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, this.sizes.bodyHeight * 0.75);
                // this.currentScroll = this.sizes.bodyHeight * 0.75
            },
        });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", x: 0 });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.4,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.71,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.2,
        });
    }

    animation4_mobile()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 1,
            onStart: () =>
            {
                this.currentScene = 4;
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                // window.scrollTo(0, this.sizes.bodyHeight * 0.9);
                // this.currentScroll = this.sizes.bodyHeight * 0.9
            },
        });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", x: 0 });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: 0.8,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.77,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.37,
        });
    }
}