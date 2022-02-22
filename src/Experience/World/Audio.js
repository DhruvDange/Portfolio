import Experience from "../Experience";


export default class AudioExperience
{
    constructor()
    {
        this.experience = new Experience


        this.uAlpha = 1
        this.isPlaying = false
        this.context = null

        this.setElements()
        this.setButtonEvent()

    }

    setElements()
    {
        this.biscuit = document.querySelector("#biscuit")
        this.nightDriving = document.querySelector("#nightDriving")
        this.retroFunky = document.querySelector("#retroFunky")
        this.letsStart = document.querySelector("#letsStart")

        this.remove = document.querySelector(".remove")
        this.hide = document.querySelector(".hide")

        this.musicModal = document.querySelector(".musicModal")

        this.audio = document.querySelector(".player")
        this.audio.volume = 0.5
    }

    setButtonEvent()
    {
        this.biscuit.addEventListener('click', ()=> {
            this.audio.src = 'audio/music/biscuit.mp3'
            if(!this.context)
                this.setAudioContext()
            this.audio.play();
        })

        this.nightDriving.addEventListener('click', ()=> {
            this.audio.src = 'audio/music/nightdriving.mp3'
            if(!this.context)
                this.setAudioContext()
            this.audio.play();
        })

        this.retroFunky.addEventListener('click', ()=> {
            this.audio.src = 'audio/music/retro_funky.mp3'
            if(!this.context)
                this.setAudioContext()
            this.audio.play();
        })

        this.letsStart.addEventListener('click', ()=> {
            this.audio.src = 'audio/music/lets_start.mp3'
            if(!this.context)
                this.setAudioContext()
            this.audio.play();
        })

        this.hide.addEventListener('click', ()=> {
            this.musicModal.style.display = 'none'; 
        })

        this.remove.addEventListener('click', ()=> {
            this.musicModal.remove()
        })
    }

    setAudioContext()
    {
        this.context = new AudioContext()
        this.src = this.context.createMediaElementSource(this.audio)

        this.analyser = this.context.createAnalyser()
        this.src.connect(this.analyser)

        this.analyser.connect(this.context.destination)
        
        this.analyser.fftSize = 16384

        this.bufferLength = this.analyser.frequencyBinCount

        this.dataArray = new Uint8Array(this.bufferLength)

        this.bars = 118
        this.sum = 0 
    }

    update()
    {
        if(this.audio.duration > 0 && !this.audio.paused)
        {
            this.isPlaying = true
        }
        else
        {
            this.isPlaying = false
            this.uAlpha = 1
        }

        if(this.isPlaying)
        {
            this.analyser.getByteFrequencyData(this.dataArray)
            this.sum = 0
            for(let i = 0; i < this.bars; i++){
                this.sum += this.dataArray[i]
            }
            let avg = this.sum / (118 * 255)
            
            avg *= 1.5
            avg = avg.toFixed(2)
            this.uAlpha = avg
        }
        
    }

}

