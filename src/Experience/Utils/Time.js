import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.readyTime = 0
        this.ready = false
        this.sinceReady = 0
        this.delta = 16 // 60fps def

        window.requestAnimationFrame( () => 
        {
            this.tick()
        })
    }

    setReady()
    {
        this.readyTime = Date.now()
        this.ready = true
    }

    tick()
    {
        
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        if(this.ready)
        {
            this.sinceReady = currentTime - this.readyTime
        }
    
        this.trigger('tick')

        window.requestAnimationFrame( () =>
        {
            this.tick()
        })
    }
}