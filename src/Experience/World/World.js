import Experience from "../Experience";
import Raycaster from "../Utils/Raycaster";
import Room from "./Room";
import Screen from "./Screen";


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

        // Wait for resources
        this.resources.on('ready', () => 
        {
            this.room = new Room()

            this.objectsToIntersect = this.room.objectsToIntersect
            this.raycaster = new Raycaster(this.objectsToIntersect)
            this.loading.setAplha()
            this.screen = new Screen()

            this.setEvent()
        })

    }

    setEvent()
    {
        window.addEventListener('click', () => 
        {
            this.raycaster.clickObjects()
            
        })

        window.addEventListener('scroll', (e) => 
        {
            e.preventDefault()
            this.camera.onScroll()
            this.screen.screenSwipe()
        })
    }

    update()
    {
        if(this.room)
        {
            this.objectsToIntersect = this.room.objectsToIntersect
            this.raycaster.update(this.objectsToIntersect)
            this.room.update()
        }
    }
}