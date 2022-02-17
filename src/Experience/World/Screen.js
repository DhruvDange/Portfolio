import * as THREE from "three"

import Experience from '../Experience';
import projects from '../projects'


export default class Screen
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.renderer = this.experience.renderer.webGLRenderer
        this.room = this.experience.world.room
        this.resources = this.experience.resources
        this.resources = this.resources.items

        // Setup
        this.projectIsShowing = false
        this.screenShowing = true

        this.screenMap = this.resources.screen
        this.screenMap.encoding = THREE.sRGBEncoding

        this.setIntroScreen()
    }

    removeScreen()
    {
        this.scene.remove(this.scene.getObjectByName('monitorIntro'))
    }

    // Set the intro screne
    setIntroScreen()
    {
        const monitorGeometry = new THREE.PlaneBufferGeometry(0.55, 0.3)
        const screenSaverMaterial = new THREE.MeshBasicMaterial({
            map: this.screenMap,
            side: THREE.DoubleSide
        })
        screenSaverMaterial.depthWrite = false
        this.screenSaver = new THREE.Mesh(monitorGeometry, screenSaverMaterial)
        this.screenSaver.name = 'monitorIntro'
        this.screenSaver.position.set(-0.403, 0.748, -0.782)
        this.screenSaver.rotation.z = -Math.PI
        this.screenSaver.rotation.y = -Math.PI
        this.screenShowing = true
        this.scene.add(this.screenSaver)
    }

    // Destroy intro when user reaches project part
    destroyIntro()
    {
        this.screenShowing = false
        this.screenSaver = null
        this.removeScreen()
    }

    // To change screen for proejcts
    screenSwipe()
    {
        this.scrollPercent = this.camera.scrollPercent
        
        if((this.scrollPercent >= 70 && this.scrollPercent <= 80) && !this.projectIsShowing)
        {
            if(this.screenSaver)
                this.destroyIntro()
            this.projectIsShowing = true
            this.room.setProjectScene()
        }
        if(this.projectIsShowing && !(this.scrollPercent >= 65 && this.scrollPercent <= 85))
        {
            this.room.removeProjectScene()
            this.projectIsShowing = false
        }
        if(this.scrollPercent < 3 && !this.screenShowing){
            this.setIntroScreen()
        }
    }
}