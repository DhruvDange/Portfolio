// Centralised loader for all resources
import * as THREE from "three"
import EventEmitter from "./EventEmitter.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Experience from "../Experience.js";



export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources
        this.experience = new Experience()
        this.renderer = this.experience.renderer.webGLRenderer

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
        this.setAudio()
    }

    setAudio()
    {
        this.items['clickSound'] = new Audio('audio/click.mp3')
    }

    setLoaders()
    {
        this.loaders = {}

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('draco/')
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(dracoLoader)

        this.loaders.textureLoader = new THREE.TextureLoader()

        this.loaders.ktx2Loader = new KTX2Loader()
        this.loaders.ktx2Loader.setTranscoderPath('basis/')
        this.loaders.ktx2Loader.detectSupport(this.renderer)

        this.loaders.basisLoader = new BasisTextureLoader()
        this.loaders.basisLoader.setTranscoderPath('basis/')
        this.loaders.basisLoader.detectSupport(this.renderer)
    }


    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if(source.type === 'ktx2')
            {
                this.loaders.ktx2Loader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if(source.type === 'basis')
            {
                this.loaders.basisLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file);
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++

        this.loadPercent = (this.loaded / this.toLoad) * 100;
        this.loadPercent = this.loadPercent.toFixed(0)
        document.querySelector("#loading").style.width = `${this.loadPercent}%`

        if(this.loaded == this.toLoad)
        {

            document.querySelector(".Footer").style.display = 'block'
            document.querySelector(".Menu").style.display = 'block'
            document.querySelector(".meter").style.display = 'none'
            document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff";
            document.getElementsByTagName("html")[0].style.backgroundColor = "#ffffff";

            this.trigger('ready')
        }
    }
}