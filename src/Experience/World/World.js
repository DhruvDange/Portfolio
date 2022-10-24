import Experience from "../Experience";
import Raycaster from "../Utils/Raycaster";
import Room from "./Room";
import Screen from "./Screen";
import AudioExperience from "./Audio";
import gsap from 'gsap'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.loading = this.experience.loading
        this.resources = this.experience.resources
        this.renderer = this.experience.renderer

        // Wait for resources
        this.resources.on('ready', () => 
        {
            this.room = new Room()
            gsap.to(this.scene.fog, {
                duration: 1.5,
                ease: "power1.in",
                far: 5,
            });

            gsap.to(this.camera.instance.position, {
                duration: 2,
                ease: "power1.out",
                z: 0.2,
            });
            this.objectsToIntersect = this.room.objectsToIntersect
            this.raycaster = new Raycaster(this.objectsToIntersect)
            this.screen = new Screen()
            this.audioExperience = new AudioExperience()

            this.experience.time.setReady()
            this.setEvent()
        })

    }

    setEvent()
    {
        window.addEventListener('click', () => 
        {
            this.raycaster.clickObjects()
            
        })

        // this.camera.on('scroll', ()=> {
        //     this.screen.screenSwipe()
        // })

        window.addEventListener('scroll', (e) => 
        {
            e.preventDefault()
            this.camera.onScroll()
        })
    }

    update()
    {
        if(this.room)
        {
            this.objectsToIntersect = this.room.objectsToIntersect
            this.raycaster.update(this.objectsToIntersect)
            this.room.update()
            this.audioExperience.update();
            this.screen.screenSwipe()
            this.room.nanoLeafMesh.material.uniforms.uAlpha.value = this.audioExperience.uAlpha
            this.room.emissionMesh.material.uniforms.uAlpha.value = this.audioExperience.uAlpha
            if(this.audioExperience.uAlpha !== 1 && this.audioExperience.uAlpha !== 0)
                this.renderer.webGLRenderer.toneMappingExposure = this.raycaster.exposure + this.audioExperience.uAlpha / 1.5
        }
    }
}