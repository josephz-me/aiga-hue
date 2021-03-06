let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  Common = Matter.Common;

let engine = Engine.create();

browserW = window.innerWidth;
browserH = window.innerHeight;
let render = Render.create({
  element: document.body,
  engine: engine,

  options: {
    width: browserW,
    height: browserH,
    wireframes: false,
    background: "#4686FC",
  },
});

let ground = Bodies.rectangle(browserW / 2, browserH - 30, browserW, 60, {
  isStatic: true,
  render: {
    strokeStyle: "white",
    fillStyle: "#4686FC",
    lineWidth: 2,
  },
});
let leftWall = Bodies.rectangle(30, browserH / 2, 60, browserH, {
  isStatic: true,
  render: {
    strokeStyle: "white",
    fillStyle: "#4686FC",
    lineWidth: 2,
  },
});
let rightWall = Bodies.rectangle(browserW - 30, browserH / 2, 60, browserH, {
  isStatic: true,
  render: {
    strokeStyle: "white",
    fillStyle: "#4686FC",
    lineWidth: 2,
  },
});
// let stack = Matter.Composites.stack(
//   browserW / 3,
//   0,
//   4,
//   4,
//   0,
//   0,
//   function (x, y) {
//     let sides = Math.round(Matter.Common.random(2, 8));
//     return Matter.Bodies.polygon(x, y, sides, Matter.Common.random(5, 40));
//   }
// );

let stack = Composites.stack(20, -600, 15, 15, 0, 0, function (x, y) {
  return Bodies.circle(x, y, Common.random(20, 40), {
    // return Bodies.polygon(x, y, Common.random(2, 8), Common.random(20, 60), {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
    render: {
      fillStyle: "#ffffff",
      opacity: Math.random(1),
    },
    name: "hello",
  });
});
let stackTwo = Composites.stack(20, -300, 20, 10, 0, 0, function (x, y) {
  return Bodies.circle(x, y, Common.random(10, 20), {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
    render: {
      fillStyle: "#0045FF",
      opacity: Math.random(1),
    },
    name: "hello",
  });
});

let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: true },
    stiffness: 1,
  },
});

Matter.Events.on(mouseConstraint, "mousedown", function () {
  let body = mouseConstraint.body;
  if (body !== null) {
    console.log("body ID:" + mouseConstraint.body.id);
  } else {
    return;
  }
});

render.mouse = mouse;

World.add(engine.world, [stack, leftWall, rightWall, ground, mouseConstraint]);
Engine.run(engine);
Render.run(render);

//remove objects
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    World.remove(engine.world, stack);
    // World.add(engine.world, stackTwo);
    console.log("done");
  }
};
