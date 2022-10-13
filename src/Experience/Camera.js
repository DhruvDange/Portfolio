// import Experience from "./Experience";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import gsap from "gsap";
// import EventEmitter from "./Utils/EventEmitter";

// export default class Camera extends EventEmitter
// {
//     constructor()
//     {
//         super()

//         this.experience = new Experience();
//         this.sizes = this.experience.sizes;
//         this.scene = this.experience.scene;
//         this.canvas = this.experience.canvas;
//         this.projectShowing = false;
//         this.currentScroll = 0;
//         this.scrollPercent = 0;
//         this.animations = null

//         if(this.sizes.width > 480)
//         {
//             window.addEventListener('scroll', () =>
//             {
//                 this.trigger('scroll')
//                 this.onScroll()
//             })
//         }


//         if (this.sizes.width < 480)
//         {
//             document.addEventListener('touchmove', () =>
//             {
//                 this.trigger('scroll')
//                 this.onScroll()
//             })

//         }

//         this.currentScene = 0;
//         this.canScroll = true


//         this.setInstance();
//         this.setOrbitControls();
//     }

//     setInstance()
//     {
//         this.instance = new THREE.PerspectiveCamera(
//             40,
//             this.sizes.width / this.sizes.height,
//             0.01,
//             20
//         );

//         this.instance.position.set(-0.4, 0.75, 0.2);
//         this.scene.add(this.instance);
//     }

//     setOrbitControls()
//     {
//         this.active = window.location.hash === "#debug";

//         if (this.active)
//         {
//             this.controls = new OrbitControls(this.instance, this.canvas);
//             this.controls.target.set(-0.133, 0.545, -2);
//             this.controls.enableDamping = true;
//         }
//     }

//     // onScroll()
//     // {
//     //     this.hash = window.location.hash;
//     //     if (this.hash !== "")
//     //     {
//     //         window.location.hash = "";
//     //         this.hash = "";
//     //     }
//     //     if (this.canScroll)
//     //     {
//     //         this.setCameraPosition();
//     //     }

//     // }


//     onScroll()
//     {
//         // Convert scroll values to a percentage
//         this.hash = window.location.hash
//         this.animations = this.experience.animations
//         if(this.hash !== "")
//         {
//             window.location.hash = ""
//             this.hash = ""
//         }
//         this.scrollY = window.scrollY
//         this.docHeight = document.body.offsetHeight
//         this.windowHeight = this.sizes.height
//         this.scrollPercent = this.scrollY / (this.docHeight - this.windowHeight) * 100
//         this.scrollPercent = this.scrollPercent.toFixed(4)
//         //this.scrollPercent = Math.round(this.scrollPercent * 100) / 100
//         this.setCameraPosition()
//     }


//     resize()
//     {
//         this.instance.aspect = this.sizes.width / this.sizes.height;
//         this.instance.updateProjectionMatrix();
//     }

//     update()
//     {

//         // this.scrollPercent = parseInt(window.scrollY);
//         // if (this.animations)
//         // {
//         //     this.currentScene = this.animations.currentScene;
//         //     this.canScroll = this.animations.canScroll
//         //     this.currentScroll = parseInt(this.animations.currentScroll)
//         // } else if (!this.animations)
//         // {
//         //     if (this.experience.animations)
//         //     {
//         //         this.animations = this.experience.animations;
//         //     }
//         // }

//         this.workScroll = this.sizes.width > 480 ? 2.2 : 1.65;
//         if (window.location.hash === "#about")
//         {
//             this.animations.animation1Back();

//         } else if (window.location.hash === "#skills")
//         {
//             if (this.sizes.width < 480)
//             {
//                 this.animations.animation1_mobile();
//             } else
//             {
//                 this.animations.animation1_pc();
//             }
//         } else if (window.location.hash === "#works")
//         {
//             if (this.sizes.width < 480)
//             {
//                 this.animations.animation3_mobile();
//             } else
//             {
//                 this.animations.animation3_pc();
//             }
//         }

//         // this.controls.update()
//     }

//     /**
//      * Camera Scroll Animation
//      */

//     // setCameraPosition()
//     // {
//     //     if (this.currentScene === 0)
//     //     {
//     //         if (this.currentScroll < this.scrollPercent)
//     //         {
//     //             if (this.sizes.width < 480)
//     //             {
//     //                 this.animations.animation1_mobile();
//     //             } else
//     //             {
//     //                 this.animations.animation1_pc();
//     //             }
//     //             // this.currentScroll = this.scrollPercent;
//     //         }
//     //     } else if (this.currentScene === 1)
//     //     {
//     //         if (this.scrollPercent < this.currentScroll)
//     //         {
//     //             this.animations.animation1Back();
//     //             // this.currentScroll = this.scrollPercent;
//     //         }

//     //         if (this.currentScroll < this.scrollPercent)
//     //         {
//     //             if (this.sizes.width < 480)
//     //             {
//     //                 this.animations.animation2_mobile();
//     //             } else
//     //             {
//     //                 this.animations.animation2_pc();
//     //             }
//     //             // this.currentScroll = this.scrollPercent;
//     //         }
//     //     } else if (this.currentScene === 2)
//     //     {
//     //         if (this.scrollPercent < this.currentScroll)
//     //         {
//     //             if (this.sizes.width < 480)
//     //             {
//     //                 this.animations.animation1_mobile();
//     //             } else
//     //             {
//     //                 this.animations.animation1_pc();
//     //             }
//     //             // this.currentScroll = this.scrollPercent;
//     //         }

//     //         if (this.currentScroll < this.scrollPercent)
//     //         {
//     //             if (this.sizes.width < 480)
//     //             {
//     //                 this.animations.animation3_mobile();
//     //             } else
//     //             {
//     //                 this.animations.animation3_pc();
//     //             }
//     //             // this.currentScroll = this.scrollPercent;
//     //         }
//     //     } else if (this.currentScene === 3)
//     //     {
//     //         if (this.scrollPercent < this.currentScroll)
//     //         {
//     //             if (this.sizes.width < 480)
//     //             {
//     //                 this.animations.animation2_mobile();
//     //             } else
//     //             {
//     //                 this.animations.animation2_pc();
//     //             }
//     //             // this.currentScroll = this.scrollPercent;
//     //         }

//     //         if (this.currentScroll < this.scrollPercent)
//     //         {

//     //             if (this.sizes.width < 480)
//     //             {
//     //                 this.animations.animation4_mobile();
//     //             } else
//     //             {
//     //                 this.animations.animation4_pc();
//     //             }
//     //             // this.currentScroll = this.scrollPercent;
//     //         }
//     //     } else if (this.currentScene === 4)
//     //     {
//     //         if (this.scrollPercent < this.currentScroll)
//     //         {
//     //             if (this.sizes.width < 480)
//     //             {   
//     //                 this.animations.animation3_mobile();
//     //             } else
//     //             {
//     //                 this.animations.animation3_pc();
//     //             }
//     //             // this.currentScroll = this.scrollPercent;
//     //         }
//     //     }
//     // }


//     setCameraPosition()
//     {

//         if (
//             (this.scrollPercent > 0 && this.scrollPercent < 25) &&
//             (this.currentScroll < this.scrollPercent)
//         )
//         {
//             if(this.sizes.width < 480)
//             {
//                 this.animations.animation1_mobile()

//             }
//             else
//             {
//                 this.animations.animation1_pc()
//             }
//             this.currentScroll = this.scrollPercent;
//         }

        
//         if (
//             (this.scrollPercent < this.currentScroll) &&
//             (this.scrollPercent > 0 && this.scrollPercent < 25)
//         )
//         {
//             if(this.sizes.width < 480)
//             {
//                 this.animations.animation1Back()

//             }
//             else
//             {
//                 this.animations.animation1Back()
//             }
//             this.currentScroll = this.scrollPercent;
//         }
        
//         else if(this.scrollPercent > 25 && this.scrollPercent <= 50)
//         {          

//             if (
//                 (this.scrollPercent > 25 && this.scrollPercent < 50) &&
//                 (this.currentScroll < this.scrollPercent)
//             )
//             {
//                 if(this.sizes.width < 480)
//                 {
//                     this.animations.animation2_mobile()
    
//                 }
//                 else
//                 {
//                     this.animations.animation2_pc()
//                 }
//                 this.currentScroll = this.scrollPercent;
//             }
    
            
//             if (
//                 (this.scrollPercent < this.currentScroll) &&
//                 (this.scrollPercent > 25 && this.scrollPercent < 50)
//             )
//             {
//                 if(this.sizes.width < 480)
//                 {
//                     this.animations.animation1_mobile()
    
//                 }
//                 else
//                 {
//                     this.animations.animation1_pc()
//                 }
//                 this.currentScroll = this.scrollPercent;
//             }

//         }
//         else if(this.scrollPercent > 50 && this.scrollPercent <= 70)
//         {
            

//             if (
//                 (this.scrollPercent > 50 && this.scrollPercent < 70) &&
//                 (this.currentScroll < this.scrollPercent)
//             )
//             {
//                 if(this.sizes.width < 480)
//                 {
//                     this.animations.animation3_mobile()
    
//                 }
//                 else
//                 {
//                     this.animations.animation3_pc()
//                 }
//                 this.currentScroll = this.scrollPercent;
//             }
    
            
//             if (
//                 (this.scrollPercent < this.currentScroll) &&
//                 (this.scrollPercent > 50 && this.scrollPercent < 70)
//             )
//             {
//                 if(this.sizes.width < 480)
//                 {
//                     this.animations.animation2_mobile()
    
//                 }
//                 else
//                 {
//                     this.animations.animation2_pc()
//                 }
//                 this.currentScroll = this.scrollPercent;
//             }

//         }
//         else if(this.scrollPercent > 80 && this.scrollPercent <= 100)
//         {    

//             if (
//                 (this.scrollPercent > 80 && this.scrollPercent < 100) &&
//                 (this.currentScroll < this.scrollPercent)
//             )
//             {
//                 if(this.sizes.width < 480)
//                 {
//                     this.animations.animation4_mobile()
    
//                 }
//                 else
//                 {
//                     this.animations.animation4_pc()
//                 }
//                 this.currentScroll = this.scrollPercent;
//             }
    
            
//             if (
//                 (this.scrollPercent < this.currentScroll) &&
//                 (this.scrollPercent > 80 && this.scrollPercent < 100)
//             )
//             {
//                 if(this.sizes.width < 480)
//                 {
//                     this.animations.animation3_mobile()
    
//                 }
//                 else
//                 {
//                     this.animations.animation3_pc()
//                 }
//                 this.currentScroll = this.scrollPercent;
//             }
//         }
//     }
// }














import Experience from "./Experience";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default class Camera
{

    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.projectShowing = false
        this.scrollY = 0
        this.currentScroll = 0;

        gsap.registerPlugin(ScrollToPlugin);

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            40,
            this.sizes.width / this.sizes.height,
            0.01,
            20
        );

        this.instance.position.set(-0.40, 0.75, 0.2)
        this.scene.add(this.instance)

    }

    setOrbitControls()
    {
        // this.controls = new OrbitControls(this.instance, this.canvas);
        // this.controls.target.set(-0.133, 0.545, -2);
        // this.controls.enableDamping = true;
    }

    onScroll()
    {
        // Convert scroll values to a percentage
        this.hash = window.location.hash
        if(this.hash !== "")
        {
            window.location.hash = ""
            this.hash = ""
        }
        this.scrollY = window.scrollY
        this.docHeight = document.body.offsetHeight
        this.windowHeight = this.sizes.height
        this.scrollPercent = this.scrollY / (this.docHeight - this.windowHeight) * 100
        this.scrollPercent = this.scrollPercent.toFixed(4)
        //this.scrollPercent = Math.round(this.scrollPercent * 100) / 100
        this.setCameraPosition()
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update()
    {
        if(!this.animation)
        {
            this.animations = this.experience.animations
        }
        if (window.location.hash === "#about")
        {
            this.animations.animation1Back();
            this.experience.world.screen.screenSwipe()

        } else if (window.location.hash === "#skills")
        {
            if (this.sizes.width < 480)
            {
                this.animations.animation1_mobile();
            } else
            {
                this.animations.animation1_pc();
            }
            this.experience.world.screen.screenSwipe()

        } else if (window.location.hash === "#works")
        {
            if (this.sizes.width < 480)
            {
                this.animations.animation3_mobile();
            } else
            {
                this.animations.animation3_pc();
            }
            this.experience.world.screen.screenSwipe()

        }

        // this.controls.update()
    }

    /**
     * Camera Scroll Animation
    */

    lerp(x, y, a)
    {
        return (1 - a) * x + a * y
    }

    scalePercent(start, end)
    {
        return (this.scrollPercent - start) / (end - start)
    }


    setCameraPosition()
    {
        if (
            (this.scrollPercent > 0 && this.scrollPercent < 25) &&
            (this.currentScroll < this.scrollPercent)
        )
        {
            if(this.sizes.width < 480)
            {
                this.animations.animation1_mobile()

            }
            else
            {
                this.animations.animation1_pc()
            }
            this.currentScroll = this.scrollPercent;
        }

        
        if (
            (this.scrollPercent < this.currentScroll) &&
            (this.scrollPercent > 0 && this.scrollPercent < 25)
        )
        {
            if(this.sizes.width < 480)
            {
                this.animations.animation1Back()

            }
            else
            {
                this.animations.animation1Back()
            }
            this.currentScroll = this.scrollPercent;
        }
        
        else if(this.scrollPercent > 25 && this.scrollPercent <= 50)
        {          

            if (
                (this.scrollPercent > 25 && this.scrollPercent < 50) &&
                (this.currentScroll < this.scrollPercent)
            )
            {
                if(this.sizes.width < 480)
                {
                    this.animations.animation2_mobile()
    
                }
                else
                {
                    this.animations.animation2_pc()
                }
                this.currentScroll = this.scrollPercent;
            }
    
            
            if (
                (this.scrollPercent < this.currentScroll) &&
                (this.scrollPercent > 25 && this.scrollPercent < 50)
            )
            {
                if(this.sizes.width < 480)
                {
                    this.animations.animation1_mobile()
    
                }
                else
                {
                    this.animations.animation1_pc()
                }
                this.currentScroll = this.scrollPercent;
            }

        }
        else if(this.scrollPercent > 50 && this.scrollPercent <= 70)
        {
            

            if (
                (this.scrollPercent > 50 && this.scrollPercent < 70) &&
                (this.currentScroll < this.scrollPercent)
            )
            {
                if(this.sizes.width < 480)
                {
                    this.animations.animation3_mobile()
    
                }
                else
                {
                    this.animations.animation3_pc()
                }
                this.currentScroll = this.scrollPercent;
            }
    
            
            if (
                (this.scrollPercent < this.currentScroll) &&
                (this.scrollPercent > 50 && this.scrollPercent < 70)
            )
            {
                if(this.sizes.width < 480)
                {
                    this.animations.animation2_mobile()
    
                }
                else
                {
                    this.animations.animation2_pc()
                }
                this.currentScroll = this.scrollPercent;
            }

        }
        else if(this.scrollPercent > 80 && this.scrollPercent <= 100)
        {    

            if (
                (this.scrollPercent > 80 && this.scrollPercent < 100) &&
                (this.currentScroll < this.scrollPercent)
            )
            {
                if(this.sizes.width < 480)
                {
                    this.animations.animation4_mobile()
    
                }
                else
                {
                    this.animations.animation4_pc()
                }
                this.currentScroll = this.scrollPercent;
            }
    
            
            if (
                (this.scrollPercent < this.currentScroll) &&
                (this.scrollPercent > 80 && this.scrollPercent < 100)
            )
            {
                if(this.sizes.width < 480)
                {
                    this.animations.animation3_mobile()
    
                }
                else
                {
                    this.animations.animation3_pc()
                }
                this.currentScroll = this.scrollPercent;
            }
        }
    }
}
