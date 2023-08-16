import * as THREE from "three"
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Resources from "./Utils/Resources.js"
import sources from "./sources.js"
import Animations from "./CameraAnimations.js"
import Debug from "./Utils/Debug.js"

let instance = null

export default class Experience
{

    constructor(canvas)
    {
        if (instance)
        {
            return instance
        }
        instance = this

        // Options
        this.canvas = canvas

        // Setup
        // this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.debug = new Debug()
        // Scenes
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000);
        this.scene.fog = new THREE.Fog(0x1a2c3c, 0.5, 7);

        this.setScrollAnimation()
        this.camera = new Camera()
        this.animations = new Animations()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        this.world = new World()

        // Resize event listener
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        // Time tick Listener
        this.time.on('tick', () => 
        {
            this.update()
        })

    }

    setScrollAnimation()
    {
        let innerTxt
        if (this.sizes.width > 480)
        {
            innerTxt = `<lottie-player
            src="scroll.json"
            background="transparent"
            speed="1"
            style="width: 60px; height: 60px"
            loop
            autoplay
          ></lottie-player>`
        }
        else
        {
            innerTxt = `<lottie-player
            src="swipe-up.json"
            background="transparent"
            speed="1"
            style="width: 120px; height: 120px"
            loop
            autoplay
          ></lottie-player>`
        }
        document.querySelector('.scroll-container').innerHTML = innerTxt
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.renderer.update()
        this.world.update()
    }
}