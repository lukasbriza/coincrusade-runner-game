

export const onWindowResize = () => {
    if (window.game.isBooted) {
        setTimeout(() => {
            //const sizes = screenSizes()
            //window.game.scale.resize(sizes.width, sizes.height)
            //window.game.canvas.setAttribute("style", `display: block; width: ${sizes.width}px; height: ${sizes.height}px;`)
            // window.game.events.emit("resize")
        }, 100)
    }
}