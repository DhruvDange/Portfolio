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
        this.currentScroll = 0
        this.currentScene = 0;
    }

    animation1_pc()
    {
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            x: 0,
            onStart: () =>
            {
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 1;
                window.scrollTo(0, this.sizes.bodyHeight * 0.25);
                this.currentScroll = this.sizes.bodyHeight * 0.25
            },
        });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 });
        gsap.to(this.instance.rotation, {
            duration: 2,
            ease: "power1.out",
            y: 1.3,
        });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.25,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: -0.3,
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
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 2;
                window.scrollTo(0, this.sizes.bodyHeight * 0.5);  
                this.currentScroll = this.sizes.bodyHeight * 0.50     
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
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 3;
                window.scrollTo(0, this.sizes.bodyHeight * 0.75);
                this.currentScroll = this.sizes.bodyHeight * 0.75
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
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 4;
                window.scrollTo(0, this.sizes.bodyHeight * 0.9);
                this.currentScroll = this.sizes.bodyHeight * 0.9
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
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 0;
                window.scrollTo(0, 0);
                this.currentScroll = 0
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
                this.currentScene = 1;
                window.scrollTo(0, this.sizes.bodyHeight * 0.25);
                this.currentScroll = this.sizes.bodyHeight * 0.25
            },
        });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", x: 0 });
        gsap.to(this.instance.rotation, { duration: 2, ease: "power1.out", z: 0 });

        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            x: -0.2,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            y: 0.77,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: -0.2,
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
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 2;
                window.scrollTo(0, this.sizes.bodyHeight * 0.50);
                this.currentScroll = this.sizes.bodyHeight * 0.50
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
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 3;
                window.scrollTo(0, this.sizes.bodyHeight * 0.75);
                this.currentScroll = this.sizes.bodyHeight * 0.75
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
            z: 0.8,
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
                this.canScroll = false;
            },
            onComplete: () =>
            {
                this.canScroll = true;
                this.currentScene = 4;
                window.scrollTo(0, this.sizes.bodyHeight * 0.9);
                this.currentScroll = this.sizes.bodyHeight * 0.9
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
            y: 0.79,
        });
        gsap.to(this.instance.position, {
            duration: 2,
            ease: "power1.out",
            z: 0.35,
        });
    }
}