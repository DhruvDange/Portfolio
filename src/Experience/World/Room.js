import * as THREE from "three"
import Experience from "../Experience";
import gsap from "gsap";

import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import projects from '../projects'
import nanoLeafVertexShader from "../../shaders/nanoLeaf/vertex.glsl";
import nanoLeafFragmentShader from "../../shaders/nanoLeaf/fragment.glsl";
import emissionFragmentShader from "../../shaders/emission/fragment.glsl";
import emissionVertexShader from "../../shaders/emission/vertex.glsl";
import glassFragmentShader from "../../shaders/glass/fragment.glsl"
import arrowFragmentShader from "../../shaders/arrow/fragment.glsl";
import arrowVertexShader from "../../shaders/arrow/vertex.glsl";


export default class Room
{
    constructor()
    {

        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        

        // Setup
        this.resources = this.resources.items
        this.roomModel = this.resources.roomModel // room GLTF file
        this.emissionModel = this.resources.emissionModel

        // Projects scene
        this.projects = projects // projects list
        this.handleMouseMove = this.handleMouseMove.bind(this) // so that we can remove listener
        this.uAlpha = 0 // uAlpha for arrow and text
        this.mouseMesh = null // to move mouse in project scene
        this.showing = 0 // current project displayed
        
        // screen size
        this.monitorGeometry = new THREE.PlaneBufferGeometry(0.55, 0.3)

        window.addEventListener('mousemove', this.handleMouseMove , true)


        this.setModel()
        this.extractChildren()
        this.setTextures()
        this.setMaterials()
        this.setMesh()
        this.setReflector()
    }

    setModel()
    {
        this.model = this.roomModel.scene
        this.eModel = this.emissionModel.scene
        this.eModel.scale.set(0.1, 0.1, 0.1)
        this.model.scale.set(0.1, 0.1, 0.1)
    }

    // remove items from scene to update later
    extractChildren()
    {
        // Static models of scene
        this.roomBase = this.model.children.find((child) => child.name === "base")
        this.headphoneMesh = this.model.children.find((child) => child.name === "headphones")
        this.canMesh = this.model.children.find((child) => child.name === "can")
        this.emissionMesh = this.eModel.children.find((child) => child.name === "emission")
        this.nanoLeafMesh = this.eModel.children.find((child) => child.name === "nanoLights")
        this.postItMesh = this.model.children.find((child) => child.name === "postit")
        this.textMesh = this.model.children.find((child) => child.name === "text")
        this.switchMesh = this.model.children.find((child) => child.name === "switch")
        this.switchPlateMesh = this.model.children.find((child) => child.name === "switchPlate")
        this.mouseMesh = this.model.children.find((child) => child.name === "mouseBody")
        this.eMouseMesh = this.eModel.children.find((child) => child.name === "eMouse")
        this.mouseMesh.position.y += 0.02
        this.eMouseMesh.position.y += 0.02

        this.arrow1Mesh = this.model.children.find((child) => child.name === "arrow1")
        this.arrow2Mesh = this.model.children.find((child) => child.name === "arrow2")
        this.projectsTextMesh = this.model.children.find((child) => child.name === "projects")

        // set Switch to off position
        this.switchMesh.rotation.z -= 0.9
        
        // fans -> dynamic
        this.blade1 = this.model.children.find((child) => child.name === "eBlade1");
        this.blade2 = this.model.children.find((child) => child.name === "eBlade2");
        this.blade3 = this.model.children.find((child) => child.name === "eBlade3");
        this.blade4 = this.model.children.find((child) => child.name === "eBlade4");

        // for raycaster
        this.objectsToIntersect = [
            this.canMesh,
            this.headphoneMesh,
            this.switchMesh,
            this.switchPlateMesh,
            this.arrow1Mesh,
            this.arrow2Mesh
        ]
    }

    // extract textures from loaded resources
    setTextures()
    {
        this.texture = this.resources.roomTexture
        this.texture.flipY = false
        this.texture.generateMipmaps = true
        this.texture.encoding = THREE.sRGBEncoding

        this.screenTexture = this.resources.screen
    }

    // basic room material
    roomMaterial()
    {
        return new THREE.MeshBasicMaterial({
            color: 0x1a2c3c,
            map: this.texture,
            side: THREE.DoubleSide,
            opacity: 1,
        });
    }

    // materials for emissions
    setEmissionMaterial()
    {
        // Nanoleaf
        this.nanoLeafMesh.material = new THREE.ShaderMaterial({
            uniforms: {
                uAlpha: { value: 1 },
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color("#e0aaff") },
                uColorEnd: { value: new THREE.Color("#0077b6") },
            },
            fragmentShader: nanoLeafFragmentShader,
            vertexShader: nanoLeafVertexShader,
        })

        // all other emissions
        this.emissionMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uAlpha: { value: 1 },
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color("#90e0ef") },
                uColorEnd: { value: new THREE.Color("#0077b6") },
            },
            fragmentShader: emissionFragmentShader,
            vertexShader: emissionVertexShader,
            
        })

        // arrow and text for projects part
        this.arrowColor = new THREE.Color(0x52b788)
        this.arrowMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uAlpha: { value: this.uAlpha },
                uColor: { value: this.arrowColor }
            },
            fragmentShader: arrowFragmentShader,
            vertexShader: arrowVertexShader
        })

        // static color for fans
        this.bladeMaterial = new THREE.MeshBasicMaterial({ color:("#0077b6") })

        // assign materials
        this.emissionMesh.material = this.emissionMaterial
        this.eMouseMesh.material = this.emissionMaterial
        this.blade1.material = this.bladeMaterial
        this.blade2.material = this.bladeMaterial
        this.blade3.material = this.bladeMaterial
        this.blade4.material = this.bladeMaterial
        this.arrow1Mesh.material = this.arrowMaterial
        this.arrow2Mesh.material = this.arrowMaterial
        this.projectsTextMesh.material = this.arrowMaterial
    
    }

    // set materials for other mesh
    setMaterials()
    {
        // Materials for text and postit
        this.postitMaterial = new THREE.MeshBasicMaterial({ color: 0xe5b8ff })
        this.textMaterial = new THREE.MeshBasicMaterial({ color: 0x1c1229 })
        
        // Give them individual materials for hover function
        this.roomBase.material =  this.roomMaterial()
        this.headphoneMesh.material = this.roomMaterial()
        this.canMesh.material = this.roomMaterial()
        this.switchPlateMesh.material = this.roomMaterial()
        this.switchMesh.material = this.roomMaterial()
        this.mouseMesh.material = this.roomMaterial()

        this.postItMesh.material = this.postitMaterial
        this.textMesh.material = this.textMaterial

        this.setEmissionMaterial()
        this.createScreenSaver() // create screen
    }

    // SideGlass for pc
    setReflector()
    {
        const reflectorGeometry = new THREE.PlaneBufferGeometry(1, 1);
        const glass = new Reflector(reflectorGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth,
            textureHeight: window.innerHeight,
            color: 0x777777
        })
        glass.material.transparent = true;
        glass.material.fragmentShader = glassFragmentShader;
        glass.rotation.y = -Math.PI / 2;
        glass.position.set(0.188, 0.7, -0.647);
        glass.scale.set(0.3, 0.36, 1);
        this.scene.add(glass);

    }

    // Add room to scene
    setMesh()
    {
        this.scene.add(this.model)
        this.scene.add(this.eModel)

    }

    // Update colors on switch flip
    updateColorHex(hex, postit, text, arrow)
    {
        this.roomBase.material.color.setHex(hex)
        this.headphoneMesh.material.color.setHex(hex)
        this.canMesh.material.color.setHex(hex)
        this.switchPlateMesh.material.color.setHex(hex)
        this.switchMesh.material.color.setHex(hex)
        this.mouseMesh.material.color.setHex(hex)
        this.arrowMaterial.uniforms.uColor.value = new THREE.Color(arrow)
        this.postItMesh.material.color.setHex(postit)
        this.textMesh.material.color.setHex(text)
    }

    // update rotation and uTime
    update()
    {
        // Update uTime of shader materials
        this.nanoLeafMesh.material.uniforms.uTime.value = this.time.elapsed * 0.001
        this.emissionMesh.material.uniforms.uTime.value = this.time.elapsed * 0.001
        // Update rotation of fan blades
        this.blade1.rotation.z = this.time.elapsed * 0.001 * 2
        this.blade2.rotation.z = this.time.elapsed * 0.001 * 2
        this.blade3.rotation.z = this.time.elapsed * 0.001 * 2
        this.blade4.rotation.z = this.time.elapsed * 0.001 * 2
    }

    /**
     * Project PART
    */

    // Handle mouse move in project part
    handleMouseMove(e)
    {
        this.mouseMesh.position.z = -5.7 + ((e.clientY / window.outerHeight) - 0.5) * 0.5
        this.eMouseMesh.position.z = -5.7 + ((e.clientY / window.outerHeight) - 0.5) * 0.5

        this.mouseMesh.position.x = -1.97 + ((e.clientX / window.outerWidth) - 0.5) * 0.7
        this.eMouseMesh.position.x = -1.97 + ((e.clientX / window.outerWidth) - 0.5) * 0.7

    }

    // Create plane and set in monitor
    createScreen(map)
    {
        map.encoding = THREE.sRGBEncoding
        const monitorMaterial = new THREE.MeshBasicMaterial({ color: "#b5b5b5", map: map, side: THREE.DoubleSide })
        const monitor = new THREE.Mesh(this.monitorGeometry, monitorMaterial)
        monitor.position.set(-0.403, 0.748, -0.785)
        return monitor
    }

    // Create screensaver for when bodymovin destroyed
    createScreenSaver()
    {
        const screenSaverMaterial = new THREE.MeshBasicMaterial({
            map: this.resources.wallpaper,
            side: THREE.DoubleSide
        })
        screenSaverMaterial.depthWrite = false
        this.screenSaver = new THREE.Mesh(this.monitorGeometry, screenSaverMaterial)
        this.screenSaver.position.set(-0.403, 0.748, -3)
        this.screenSaver.rotation.z = -Math.PI
        this.screenSaver.rotation.y = -Math.PI
        this.scene.add(this.screenSaver)
        this.projects[0].model = this.screenSaver
        this.setScreen()
    }
    
    // set the sscene to display projects
    setProjectScene()
    {
        if(this.sizes.width < 480)
        {
            this.arrow1Mesh.scale.set(0.25, 0.08, 0.1)
            this.arrow2Mesh.scale.set(0.25, 0.08, 0.1)
            this.arrow1Mesh.position.y -= 0.04
            this.arrow2Mesh.position.y -= 0.04

        }
        gsap.to(this.arrowMaterial.uniforms.uAlpha, {duration: 0.5, value: 1})
        for(let i = 1; i < this.projects.length; i++)
        {
            this.objectsToIntersect.push(this.projects[i].model)
        }
        this.nextScreen()
    }

    // when arrow2 is clicked, goto next project
    nextScreen()
    {
        this.projects[this.showing++].model.position.z = -3
        if(this.projects[this.showing] === undefined){
            this.showing = 1
        }
        this.projects[this.showing].model.position.z = -0.782
    }

    // arrow1, show prev project
    prevScreen()
    {
        this.projects[this.showing--].model.position.z = -3
        if(this.showing === 0){
            this.showing = (this.projects.length) - 1
        }
        this.projects[this.showing].model.position.z = -0.782
    }

    // Remove projects and display Screen Saver
    removeProjectScene()
    {
        gsap.to(this.arrowMaterial.uniforms.uAlpha, {duration: 0.5, value: 0})
        for(let i = 1; i < this.projects.length; i++)
        {
            this.projects[i].model.position.z = -3
            this.objectsToIntersect.pop(this.projects[i].model)
        }
        this.showing = 0
        this.projects[this.showing].model.position.z = -0.782
    }

    // Create all project screens and hide until project part
    setScreen()
    {
        for(let i = 1; i < this.projects.length; i++)
        {
            this.projects[i].image = this.resources[this.projects[i].name]
            this.projects[i].image.flipY = true
            this.projects[i].model = this.createScreen(this.projects[i].image)
            this.projects[i].model.name = this.projects[i].name
            this.projects[i].model.url = this.projects[i].href
            this.projects[i].model.position.z = -3
            this.projects[i].model.rotation.z = -Math.PI
            this.projects[i].model.rotation.y = -Math.PI
            this.scene.add(this.projects[i].model)
        }
    }

}