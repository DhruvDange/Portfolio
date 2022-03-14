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
        this.workScroll = this.sizes.width > 480 ? 2.2 : 1.65
        if(window.location.hash === "#about"){
            gsap.to(window, { duration: 2, ease: "power1", scrollTo: this.sizes.height * 0 });
        }
        else if(window.location.hash === "#skills"){
            gsap.to(window, { duration: 2, ease: "power1", scrollTo: this.sizes.height * 0.75 });
        }
        else if(window.location.hash === "#home"){
            gsap.to(window, { duration: 3.5, ease: "sine", scrollTo: this.sizes.height * 3.2 });
        }
        else if(window.location.hash === "#works"){
            gsap.to(window, { duration: 2, ease: "power1", scrollTo: this.sizes.height * this.workScroll });
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
        
        if(this.scrollPercent >= 0 && this.scrollPercent <= 25)
        {

            if(this.sizes.width < 480)
            {
                // Rotation
                this.instance.rotation.y = (this.lerp(0, 70, this.scalePercent(0, 25)) / 50)

                // Position
                this.instance.position.x = this.lerp(-0.40, -0.25, this.scalePercent(0, 25))
                this.instance.position.y = this.lerp(0.75, 0.77, this.scalePercent(0, 25))
                this.instance.position.z = this.lerp(0.2, -0.3, this.scalePercent(0, 25))

            }
            else
            {
                    // Rotation
                this.instance.rotation.y = (this.lerp(0, 70, this.scalePercent(0, 25)) / 50)

                // Position
                this.instance.position.x = this.lerp(-0.4, -0.25, this.scalePercent(0, 25))
                this.instance.position.z = this.lerp(0.2, -0.3, this.scalePercent(0, 25))
            }

            
        }
        else if(this.scrollPercent > 25 && this.scrollPercent <= 50)
        {
            
            if(this.sizes.width < 480)
            {
                // Rotation
                this.instance.rotation.y = (this.lerp(70, 0, this.scalePercent(25, 50)) / 50)

                // Position
                this.instance.position.x = this.lerp(-0.25, -0.4, this.scalePercent(25, 50))
                this.instance.position.y = this.lerp(0.77, 0.77, this.scalePercent(25, 50))
                this.instance.position.z = this.lerp(-0.3, 0.2, this.scalePercent(25, 50))
            }
            else
            {
                // Rotation
                this.instance.rotation.x = this.lerp(0, -0.1, this.scalePercent(25, 50))
                this.instance.rotation.y = (this.lerp(70, 27, this.scalePercent(25, 50)) / 50)
                this.instance.rotation.z = this.lerp(0, 0.06, this.scalePercent(25, 50))

                // Position
                this.instance.position.x = this.lerp(-0.25, 0.35, this.scalePercent(25, 50))
                this.instance.position.y = this.lerp(0.75, 0.8, this.scalePercent(25, 50))
                this.instance.position.z = this.lerp(-0.3, 0.55, this.scalePercent(25, 50))
            }

        }
        else if(this.scrollPercent > 50 && this.scrollPercent <= 70)
        {
            
            if(this.sizes.width < 480)
            {
                // Rotation
                this.instance.rotation.y = (this.lerp(0, 0,this.scalePercent(50, 70)) / 50)

                // Position
                this.instance.position.y = this.lerp(0.77, 0.77,this.scalePercent(50, 70))
                this.instance.position.z = this.lerp(0.2, 0.8, this.scalePercent(50, 70))
            }
            else
            {
                // Rotation
                this.instance.rotation.x = this.lerp(-0.1, 0, this.scalePercent(50, 70))
                this.instance.rotation.y = (this.lerp(27, 0,this.scalePercent(50, 70)) / 50)
                this.instance.rotation.z = this.lerp(0.06, 0, this.scalePercent(50, 70))

                // Position
                this.instance.position.x = this.lerp(0.35, -0.38,this.scalePercent(50, 70))
                this.instance.position.y = this.lerp(0.8, 0.71,this.scalePercent(50, 70))
                this.instance.position.z = this.lerp(0.55, 0,this.scalePercent(50, 70))
            }

        }
        else if(this.scrollPercent > 80 && this.scrollPercent <= 100)
        {
            
            if(this.sizes.width < 480)
            {
                // Rotation
                this.instance.rotation.y = (this.lerp(0, 42,this.scalePercent(80, 100)) / 50)
                
                // Position
                this.instance.position.x = this.lerp(-0.40, 0.8,this.scalePercent(80, 100))
                this.instance.position.y = this.lerp(0.77, 0.79,this.scalePercent(80, 100))
                this.instance.position.z = this.lerp(0.8, 0.35,this.scalePercent(80, 100))
            }
            else
            {
               // Rotation
                // this.instance.rotation.y = this.lerp(0, 0.1,this.scalePercent(80, 100))
                this.instance.rotation.x = this.lerp(0, -0.1,this.scalePercent(80, 100))
                // this.instance.rotation.z = this.lerp(0, -0.04,this.scalePercent(80, 100))
                
                // Position
                this.instance.position.y = this.lerp(0.71, 0.8,this.scalePercent(80, 100))
                //this.instance.position.x = this.lerp(-0.38, -0.6,this.scalePercent(80, 100))
                this.instance.position.z = this.lerp(0, 0.8,this.scalePercent(80, 100))
            }
        }
    }
}