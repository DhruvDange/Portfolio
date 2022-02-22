import * as THREE from "three"
import Experience from "../Experience";
import EventEmitter from "./EventEmitter";


export default class Raycaster extends EventEmitter
{
    constructor(objectsToIntersect)
    {
        super()

        this.experience = new Experience()
        this.renderer = this.experience.renderer // for toneMapping
        this.room = this.experience.world.room // update color
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.resources = this.experience.resources.items
        this.showing = -1

        // Setup
        this.currentIntersect = null
        this.objectsToIntersect = objectsToIntersect
        this.lightSwitch = this.objectsToIntersect[2] // to flip the switch
        this.switchOn = false // initially off
        this.exposure = 1
        this.musicShowing = false


        // dark color for room
        this.colorHex = 0x1a2c3c 
        this.postitColor = 0xd4b0f9
        this.textColor = 0x2c2a4a

        this.setSounds()
        this.setInstance()
        this.setEvent()
    }

    setSounds()
    {
        this.clickSound = this.resources.clickSound
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()
    }

    // function to set mouse or touch event based on screen size
    setEvent()
    {
        this.mouse = new THREE.Vector2()
    
        if(this.sizes.width >= 480)
        {
            window.addEventListener("mousemove", (_event) => {
                this.mouse.x = (_event.clientX / (this.sizes.width)) * 2 - 1;
                this.mouse.y = -((_event.clientY / this.sizes.height) * 2 - 1);
            });
        }
        else
        {
            window.addEventListener('touchstart', (_event) => 
            {
                this.mouse.y = -((_event.changedTouches[0].clientY / this.sizes.height) * 2 - 1);
                this.mouse.x = ((_event.changedTouches[0].clientX / this.sizes.width)) * 2 - 1;
    
            })
            this.camera.instance.fov = 60
            this.camera.instance.updateProjectionMatrix();
        }
        
        this.trigger('mousemove')
    }

    // function to change opacity of objects on hoover
    hoverObjects()
    {
        if(!this.musicShowing)
        {
            const switchIntersect =
            this.currentIntersect.object.name === "switchPlate" ||
            this.currentIntersect.object.name === "switch";

            if (this.currentIntersect.object.name === "can")
            {
                this.currentIntersect.object.material.opacity = 0.8;
            } 
            else if (this.currentIntersect.object.name === "headphones")
            {
                this.currentIntersect.object.material.opacity = 0.8;
            }
            else if (switchIntersect)
            {
                this.currentIntersect.object.material.opacity = 0.8;
                this.lightSwitch.material.opacity = 0.8
            }
        }
    }

    // function to switch room color on switch click and change screen
    clickObjects()
    {
     
        if(this.currentIntersect && !this.musicShowing)
        {
            const switchIntersect =
            this.currentIntersect.object.name === "switchPlate" ||
            this.currentIntersect.object.name === "switch";

            if(switchIntersect)
            {
                this.clickSound.volume = 0.5
                this.clickSound.currentTime = 0
                this.clickSound.play()

                if(this.switchOn) // To make it off i.e navy blue
                {
                    this.exposure = 1.0
                    this.lightSwitch.rotation.z -= 0.7
                    this.renderer.webGLRenderer.toneMappingExposure = this.exposure
                    this.arrowHex = 0x52b788
                    this.colorHex = 0x1a2c3c
                    this.postitColor = 0xe5b8ff
                    this.textColor = 0x1c1229
                    this.room.updateColorHex(this.colorHex, this.postitColor, this.textColor, this.arrowHex)
                    this.switchOn = false
                }
                else // Make switch on i.e. Light color
                {
                    this.exposure = 0.8
                    this.lightSwitch.rotation.z += 0.7
                    this.renderer.webGLRenderer.toneMappingExposure = this.exposure
                    this.arrowHex = 0x01497c
                    this.colorHex = 0xd6e9f5
                    this.postitColor = 0xffb703
                    this.textColor = 0x00163d
                    this.room.updateColorHex(this.colorHex, this.postitColor, this.textColor, this.arrowHex)
                    this.switchOn = true
                }
            }
            else if(this.currentIntersect.object.name === 'arrow1')
            {
                this.room.prevScreen()
                console.log(this.scene.children);
            }
            else if(this.currentIntersect.object.name === 'arrow2')
            {
                this.room.nextScreen()
            }
            else if(this.currentIntersect.object.name === 'headphones')
            {
                if(!this.musicShowing)
                {
                    document.querySelector(".musicModal").style.display = 'block';
                    this.musicShowing = true
                }
                else
                {
                    document.querySelector(".musicModal").style.display = 'none';
                    this.musicShowing = false
                }
            }
            else
            {
                if(this.currentIntersect.object.url)
                {
                    window.open(this.currentIntersect.object.url, '_blank');
                }
            }
        }
    }


    update(objectsToIntersect)
    {   
        // update objectsToIntersect based on items from room. Arrow and pages are added dynamically
        this.objectsToIntersect = objectsToIntersect

        this.instance.setFromCamera(this.mouse, this.camera.instance)

        // Get Intersects from raycaster
        this.currentIntersect = this.instance.intersectObjects(this.objectsToIntersect)[0]

        this.musicShowing = document.querySelector(".musicModal").style.display === 'block'

        // Check for intersects
        if(this.currentIntersect)
        {
            this.hoverObjects()
        }
        else
        {
            // Reset items after hover
            for(const item in this.objectsToIntersect)
            {
                this.objectsToIntersect[item].material.opacity = 1;
                this.lightSwitch.material.opacity = 0.95
            }
        }
    }
}