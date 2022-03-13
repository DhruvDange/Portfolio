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
        if(window.location.hash === "#about"){
            gsap.to(window, { duration: 1.5, ease: "power1", scrollTo: this.sizes.height * 0 });
        }
        else if(window.location.hash === "#skills"){
            gsap.to(window, { duration: 1.5, ease: "power1", scrollTo: this.sizes.height * 0.75 });
        }
        else if(window.location.hash === "#works"){
            gsap.to(window, { duration: 1.5, ease: "power1", scrollTo: this.sizes.height * 1.55 });
        }
        else if(window.location.hash === "#home"){
            gsap.to(window, { duration: 4, ease: "sine", scrollTo: this.sizes.height * 3 });

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
                this.instance.position.x = this.lerp(-0.40, -0.25, this.scalePercent(0, 25))
                this.instance.position.y = this.lerp(0.75, 0.77, this.scalePercent(0, 25))
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
                this.instance.position.z = this.lerp(-0.3, 0.2, this.scalePercent(25, 50))
            }
            else
            {
                // Rotation
                this.instance.rotation.y = (this.lerp(70, 0, this.scalePercent(25, 50)) / 50)

                // Position
                this.instance.position.y = this.lerp(0.77, 0.77, this.scalePercent(25, 50))
                this.instance.position.z = this.lerp(-0.3, 0.2, this.scalePercent(25, 50))
                this.instance.position.x = this.lerp(-0.25, -0.4, this.scalePercent(25, 50))
            }

        }
        else if(this.scrollPercent >= 55 && this.scrollPercent <= 75)
        {
            
            if(this.sizes.width < 480)
            {
                // Rotation

                // Position
                this.instance.position.z = this.lerp(0.2, 0.8, this.scalePercent(55, 75))
            }
            else
            {
                // Rotation

                // Position
                this.instance.position.z = this.lerp(0.2, 0.85,this.scalePercent(55, 75))
            }

        }
        else if(this.scrollPercent > 75 && this.scrollPercent <= 100)
        {
            
            if(this.sizes.width < 480)
            {
                // Rotation
                this.instance.rotation.y = (this.lerp(0, 42,this.scalePercent(75, 100)) / 50)
                
                // Position
                this.instance.position.x = this.lerp(-0.40, 0.8,this.scalePercent(75, 100))
                this.instance.position.y = this.lerp(0.77, 0.79,this.scalePercent(75, 100))
                this.instance.position.z = this.lerp(0.8, 0.35,this.scalePercent(75, 100))
            }
            else
            {
                // Rotation
                this.instance.rotation.y = (this.lerp(0, 42,this.scalePercent(75, 100)) / 50)
                
                // Position
                // this.instance.position.y = this.lerp(0.77, 0.78,this.scalePercent(80, 100))
                this.instance.position.x = this.lerp(-0.4, 0.8,this.scalePercent(75, 100))
                this.instance.position.z = this.lerp(0.85, 0.45,this.scalePercent(75, 100))
            }
        }
    }
}