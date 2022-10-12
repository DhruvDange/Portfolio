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
        this.sizes = this.experience.sizes
        this.renderer = this.experience.renderer.webGLRenderer
        this.room = this.experience.world.room
        this.resources = this.experience.resources
        this.resources = this.resources.items
        this.animations = this.experience.animations
        this.currentScene = this.animations.currentScene
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

    showProjScreen()
    {
        if (!this.projectIsShowing)
        {
            if (this.screenSaver)
                this.destroyIntro()
            this.projectIsShowing = true
            this.room.setProjectScene()
        }
    }

    removeProjScreen()
    {
        if (this.projectIsShowing)
        {
            this.room.removeProjectScene()
            this.projectIsShowing = false
        }
    }
    screenSwipe()
    {
        this.currentScene = this.animations.currentScene
        if(this.currentScene === 0 && !this.screenShowing)
        {
            this.setIntroScreen()
        }
        else if(this.currentScene === 3)
        {
            this.showProjScreen()
        }
        else
        {
            this.removeProjScreen()
        }
    }
}