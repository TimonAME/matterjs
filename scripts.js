
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

let engine;
let render;
let runner;

function init() {
    // create an engine
    engine = Engine.create();
   
    // create a renderer
    render = Render.create({
        element: document.getElementById("areaToRender"),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            pixelRatio: 1,
            background: '#fafafa',
            wireframes: false // <-- important
        }
    });
   
    // run the renderer
    Render.run(render);
   
    // create runner
    runner = Runner.create();
   
    // run the engine
    Runner.run(runner, engine);
}

let lastClear = "(not given)"
function clearWorld(exampleName) {
    if (lastClear != exampleName) {
        lastClear = exampleName
    
        Matter.Composite.clear(engine.world, false)
    }
}

function StartBoxes() {
    clearWorld("Boxes")
    // create two boxes and a ground
    let circleA = Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, 80, 80);
    let circleB = Bodies.circle(window.innerWidth / 2 - 50, window.innerHeight / 2 - 150, 40, {
        render: {
            fillStyle: 'red',
            strokeStyle: 'blue',
            lineWidth: 3
        }
    });

    /*
    let circle = Bodies.circle(425, 300, 50, {
        render: {
            fillStyle: 'blue',
            strokeStyle: 'red',
            lineWidth: 3
        }
    });
    */

    // create borders
    let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true });
    let ceiling = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 60, { isStatic: true });
    let leftWall = Bodies.rectangle(0, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true });
    let rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true });
   
    // add all of the bodies to the world
    Composite.add(engine.world, [circleA, circleB, ground, ceiling, leftWall, rightWall]);
   
    Engine.update(engine);
}