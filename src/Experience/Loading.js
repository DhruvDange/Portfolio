import * as THREE from 'three'
import gsap from "gsap";
import Experience from "./Experience";
import EventEmitter from './Utils/EventEmitter';

export default class Loading extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.uAlpha = 1

        this.overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
        this.overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uAlpha: { value: this.uAlpha },
                uTime: { value: 0 },
            },
            vertexShader: `
                varying vec2 vUv;
            
                void main(){
                    gl_Position = vec4(position, 1.0);
                    vUv = uv;
            }`,
            fragmentShader: `
                uniform float uAlpha;
                void main(){
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        })

        this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        this.scene.add(this.overlay)

    }

    setAplha()
    {
        gsap.to(this.overlayMaterial.uniforms.uAlpha, {duration: 1, value: 0})
    }
}