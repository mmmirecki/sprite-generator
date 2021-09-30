var lastElementX = 0
var lastElementY = 0
var selected
var generator = {
    img: {
        pos_x: 0,
        pos_y: 0,
        select: function () {
            var can = generator.board[this.pos_y][this.pos_x]
            console.log(can)
        }
    }
}
var sheet = document.getElementById("sheet")

class SpriteSheetGenerator {

    constructor(x, y) {
        this.init(x, y)
    }

    init(x, y) {
        const sheetElem = document.createElement("canvas")
        sheetElem.className = "sheetCanvas"
        const width = sheet.width / 32
        const height = sheet.height / 20
        sheetElem.width = width
        sheetElem.height = height
        let c = sheetElem
        let ctx = c.getContext("2d")
        let img = document.getElementById("sheet")
        ctx.drawImage(img, x, y, width, height, 0, 0, 47, 47)

        sheetElem.onclick = (event) =>{
            console.log(this)
        }        
        console.log(sheet.width)
        document.getElementById("items").appendChild(sheetElem)
    }

}


class BoardGenerator {

    constructor() {
        this.element = null
        this.selected = false
        this.init()
    }

    init() {
        var boardCv = document.createElement("canvas")
        boardCv.className = "boardCanvas"
        boardCv.onclick = (event) => {
            selected = this
            this.selected = true
            generator.img.select()
        }

        this.element = boardCv
        document.getElementById("board").appendChild(boardCv)
    }

    select() {
        console.log(this)
    }

}


window.addEventListener("DOMContentLoaded", (event) => {

    createBoard(10, 10)
    createSpriteSheet()

    function createSpriteSheet() {
        let items = []
        const sheet = document.getElementById("sheet")
        const width = sheet.width / 32
        const height = sheet.height / 20
        let sheetX = 0
        let sheetY = 0

        for (x = 0; x < 20; x++) {
            items.push(Array())
            
            for (y = 0; y < 16; y++) {
                items[x].push(new SpriteSheetGenerator(sheetX, sheetY))
                sheetX += width
            }
            sheetY += height
            sheetX = 0
            
        }
        sheetY=0
        sheetX=width*16
        for (x = 0; x < 20; x++) {
            items.push(Array())
            
            for (y = 0; y < 16; y++) {
                items[x+20].push(new SpriteSheetGenerator(sheetX, sheetY))
                sheetX += width
            }
            sheetY += height
            sheetX = width*16
            
        }
        
        generator.items= items

    }

    function createBoard(width, height) {
        let board = []
        for (let y = 0; y < width; y++) {
            board.push(Array())
            for (let x = 0; x < height; x++) {
                board[y].push(new BoardGenerator())
            }
        }
        generator.board = board
    }


    console.log(generator)
})
