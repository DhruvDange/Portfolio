import Experience from "./Experience";
import * as THREE from "three"

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.camera = this.experience.camera

        this.setWebGLInstance()
    }

    isIOSDevice(){
        return /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !window.MSStream;
     }

    setWebGLInstance()
    {
        if(!this.isIOSDevice())
        {
            this.webGLRenderer = new THREE.WebGLRenderer({
                antialias: true,
            });
        }
        else
        {
            this.webGLRenderer = new THREE.WebGLRenderer({
            });
        }
        this.webGLRenderer.localClippingEnabled = false
        this.webGLRenderer.outputEncoding = THREE.sRGBEncoding;
        this.webGLRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.webGLRenderer.toneMappingExposure = 1.0;
        this.webGLRenderer.setSize(this.sizes.width, this.sizes.height);
        this.webGLRenderer.setPixelRatio(this.sizes.pixelRatio);


        this.canvas.appendChild(this.webGLRenderer.domElement)
        //document.body.appendChild(this.webGLRenderer.domElement)
    }

    resize()
    {
        this.webGLRenderer.setSize(this.sizes.width, this.sizes.height);
        this.webGLRenderer.setPixelRatio(this.sizes.pixelRatio);

    }

    update()
    {
        this.webGLRenderer.render(this.scene, this.camera.instance)
    }
}