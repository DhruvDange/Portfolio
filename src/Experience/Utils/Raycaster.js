import * as THREE from "three"
import Experience from "../Experience";
import EventEmitter from "./EventEmitter";
import gsap from 'gsap'


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
        this.lightSwitch2 = this.objectsToIntersect[3]
        this.switchOn = false // initially off
        this.exposure = 1
        this.musicModal = document.querySelector(".musicModal")
        this.canModal = document.querySelector(".canModal")
        this.modalShowing = false
        this.opacity = 1
        if(this.sizes.width > 480)
        {
            this.pulseTime = 800
        }
        else
        {
            this.pulseTime = 400
        }


        // dark color for room
        this.colorHex = 0x1a2c3c 
        this.postitColor = 0xd4b0f9
        this.textColor = 0x2c2a4a

        this.setSounds()
        this.setInstance()
        this.setEvent()
    }

    getStyle(id, name)
    {
        var element = document.getElementById(id);
        return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
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
        if(!this.modalShowing)
        {
            const switchIntersect =
            this.currentIntersect.object.name === "switchPlate" ||
            this.currentIntersect.object.name === "switch";

            if (this.currentIntersect.object.name === "can")
            {
                gsap.to(this.currentIntersect.object.material, {duration: 0.6, opacity: 0.85})
                gsap.to(this.currentIntersect.object.material, {delay: 0.65, duration: 0.6, opacity: 1})
            } 
            else if (this.currentIntersect.object.name === "headphones")
            {
                gsap.to(this.currentIntersect.object.material, {duration: 0.6, opacity: 0.85})
                gsap.to(this.currentIntersect.object.material, {delay: 0.65, duration: 0.6, opacity: 1})
            }
            else if (switchIntersect)
            {
                gsap.to(this.lightSwitch2.material, {duration: 0.6, opacity: 0.85})
                gsap.to(this.lightSwitch.material, {duration: 0.6, opacity: 0.85})
                gsap.to(this.lightSwitch2.material, {delay: 0.65, duration: 0.6, opacity: 1})
                gsap.to(this.lightSwitch.material, {delay: 0.65, duration: 0.6, opacity: 1})
            }
        }
    }

    // function to switch room color on switch click and change screen
    clickObjects()
    {
     
        if(this.currentIntersect && !this.modalShowing)
        {
            if(this.sizes.width > 480)
        {
            this.pulseTime = 1200
        }
        else
        {
            this.pulseTime = 300
        }
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
                this.pulseTime = 800
                if(!this.modalShowing)
                {
                    this.musicModal.style.display = 'block';
                    this.modalShowing = true
                }
                else
                {
                    this.musicModal.style.display = 'none';
                    this.modalShowing = false
                }
            }
            else if(this.currentIntersect.object.name === 'can')
            {
                if(!this.modalShowing)
                {
                    this.canModal.style.display = 'block';
                    this.modalShowing = true
                }
                else
                {
                    this.canModal.style.display = 'none';
                    this.modalShowing = false
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
        if(this.getStyle('canModal', 'display') === 'none' && this.getStyle('musicModal', 'display') === 'none'){
            this.modalShowing = false
        }

        // update objectsToIntersect based on items from room. Arrow and pages are added dynamically
        this.objectsToIntersect = objectsToIntersect

        this.instance.setFromCamera(this.mouse, this.camera.instance)

        // Get Intersects from raycaster
        this.currentIntersect = this.instance.intersectObjects(this.objectsToIntersect)[0]

        if(this.time.elapsed % this.pulseTime === 0)
        {
            for(const item of objectsToIntersect)
            {
                gsap.to(item.material, {duration: 0.8, opacity: 0.85})
                gsap.to(item.material, {delay: 1, duration: 0.8, opacity: 1})
            }
        }


        // Check for intersects
        if(this.currentIntersect)
        {
            this.hoverObjects()
        }
    }
}