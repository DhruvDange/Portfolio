import * as THREE from "three"
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Resources from "./Utils/Resources.js"
import sources from "./sources.js"
import Loading from "./Loading.js"

let instance = null

export default class Experience{

    constructor(canvas)
    {
        if(instance)
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
        // Scenes
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x1a2c3c);

        // Loading Screen
        this.loading = new Loading()
        
        this.camera = new Camera()
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