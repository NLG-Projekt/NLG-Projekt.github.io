const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

console.log(collisions);
canvas.width = 1820;
canvas.height = 900;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}
const entrymap = [];
for (let i = 0; i < entrydata.length; i += 70) {
    entrymap.push(entrydata.slice(i, 70 + i));
}
console.log(entrymap);


const boundaries = []
const offset = {
    x: -400,
    y: -450
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) 
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})

const entry = []

entrymap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) 
            entry.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})
console.log(entry)
const image = new Image();
image.src = "../IMGs/Map.png";

const forgroundImage = new Image();
forgroundImage.src = "../IMGs/Foeground.png";

const playerdown = new Image();
playerdown.src = "../IMGs/playerdown.png";
const playerleft = new Image();
playerleft.src = "../IMGs/playerLeft.png";
const playerright = new Image();
playerright.src = "../IMGs/playerRight.png";
const playerup = new Image();
playerup.src = "../IMGs/playerUp.png";



const player = new Sprite({
    position:{
        x:canvas.width / 2 - (192 / 4) / 2,
        y:canvas.height / 2 - 68 / 2
    },
    image: playerdown,
    frames:{max: 4},
    sprites:{
        up: playerup,
        left: playerleft,
        right: playerright,
        down: playerdown,
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})
const Forground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: forgroundImage
})
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

const movables = [background, ...boundaries, Forground,...entry]

function rectangularcolison({rectangule1, rectangule2}) {
    return(       
        rectangule1.position.x + rectangule1.width >= rectangule2.position.x &&
        rectangule1.position.x <= rectangule2.position.x + rectangule2.width &&
        rectangule1.position.y <= rectangule2.position.y + rectangule2.height &&
        rectangule1.position.y + rectangule1.height >= rectangule2.position.y 
    )
}
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((Boundary) => {
            Boundary.draw()
    })
    entry.forEach((entry) => {
        entry.draw()
    })
    player.draw()
    Forground.draw()

    let moving= true
    player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.image = player.sprites.up
        player.moving = true
        for(let i =0; i<boundaries.length; i++) {
            const Boundary = boundaries[i]
            if (
                rectangularcolison({
                    rectangule1: player, 
                    rectangule2: {...Boundary, 
                        position: {
                    x:Boundary.position.x ,
                    y:Boundary.position.y +3
                }
                }
            })
        ){
        moving=false
        break
        }
    }
    if (moving)
    movables.forEach((movable) => {
        movable.position.y +=3
    })
}
    if (keys.a.pressed && lastKey === 'a') {
        player.image = player.sprites.left
        player.moving = true
        for(let i =0; i<boundaries.length; i++) {
            const Boundary = boundaries[i]
            if (
                rectangularcolison({
                    rectangule1: player, 
                    rectangule2: {...Boundary, 
                        position: {
                    x:Boundary.position.x +3,
                    y:Boundary.position.y
                }
                }
            })
        ){
        moving=false
        break
        }
        }

        if (moving)
        movables.forEach((movable) => {
            movable.position.x +=3
        })
    }
    if (keys.s.pressed && lastKey === 's'){
        player.image = player.sprites.down
        player.moving = true
        for(let i =0; i<boundaries.length; i++) {
            const Boundary = boundaries[i]
            if (
                rectangularcolison({
                    rectangule1: player, 
                    rectangule2: {...Boundary, 
                        position: {
                    x:Boundary.position.x ,
                    y:Boundary.position.y -3
                }
                }
            })
        ){
        moving=false
        break
        }
        }

        if (moving)
        movables.forEach((movable) => {
            movable.position.y -=3
        })
    }
    if (keys.d.pressed && lastKey === 'd') {
        player.image = player.sprites.right
        player.moving = true
        for(let i =0; i<boundaries.length; i++) {
            const Boundary = boundaries[i]
            if (
                rectangularcolison({
                    rectangule1: player, 
                    rectangule2: {...Boundary, 
                        position: {
                    x:Boundary.position.x -3,
                    y:Boundary.position.y
                }
                }
            })
        ){
        moving=false
        break
        }
        }

        if (moving)
        movables.forEach((movable) => {
            movable.position.x -=3
        })
    }
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case "s":
            keys.s.pressed = true;
            lastKey = 's';
            break;

        case "d":
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;

        case "d":
            keys.d.pressed = false;
            break;
    }
});
