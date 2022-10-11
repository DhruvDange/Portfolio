import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter
{

    constructor()
    {
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        var body = document.body,
            html = document.documentElement;
        this.bodyHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // resize Event
        window.addEventListener('resize', () =>
        {

            // Update sizes
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.bodyHeight = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);

            this.trigger('resize')
        })

    }
}