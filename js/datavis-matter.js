let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Mouse = Matter.Mouse,
  Events = Matter.Events,
  MouseConstraint = Matter.MouseConstraint,
  Composites = Matter.Composites,
  Vertices = Matter.Vertices,
  Composite = Matter.Composite,
  Common = Matter.Common,
  Svg = Matter.Svg;

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
    background: "transparent",
    wireframeBackground: "transparent",
  },
});

//boundaries
let thickness = 200;
let ground = Bodies.rectangle(
  browserW / 2,
  browserH + thickness / 2 + 2,
  browserW,
  thickness,
  {
    isStatic: true,
    render: {
      lineWidth: 2,
    },
  }
);
let ceiling = Bodies.rectangle(
  browserW / 2,
  -thickness / 2 - 2,
  browserW,
  thickness,
  {
    isStatic: true,
    render: {
      lineWidth: 2,
    },
  }
);
let leftWall = Bodies.rectangle(
  -thickness / 2 - 2,
  browserH / 2,
  thickness,
  browserH * 2,
  {
    isStatic: true,
    render: {
      lineWidth: 2,
    },
  }
);
let rightWall = Bodies.rectangle(
  browserW + thickness / 2 + 2,
  browserH / 2,
  thickness,
  browserH * 2,
  {
    isStatic: true,
    render: {
      lineWidth: 2,
    },
  }
);

//triggered behavior
const startDataVis = (
  selectedDesigners,
  mostCommonIFeel,
  mostCommonIFeelPercent,
  mostCommonIam,
  mostCommonIamPercent,
  mostCommonImCurrently,
  mostCommonImCurrentlyPercent
) => {
  // (key = response), (value = frequency);
  // let satisfyPercentages = {};
  // satisfyPercentages[mostCommonIam] = mostCommonIamPercent;
  // satisfyPercentages[mostCommonIFeel] = mostCommonIFeelPercent;
  // satisfyPercentages[mostCommonImCurrently] = mostCommonImCurrentlyPercent;

  for (let i = 0; i < mostCommonIamPercent; i++) {
    let scale = 0.1;
    World.add(
      engine.world,
      Bodies.circle(Common.random(50, browserW - 50), 20, 35, {
        restitution: 0.5,
        render: {
          fillStyle: "#888888",
          sprite: {
            texture: `./img/coins/${satisfactionLevels["I am:"][mostCommonIam]}`,
            xScale: scale,
            yScale: scale,
          },
        },
      })
    );
  }

  //   console.log(mostCommonIam);
  //   console.log(mostCommonIFeel);

  for (let i = 0; i < mostCommonIFeelPercent; i++) {
    let scale = 0.1;
    World.add(
      engine.world,
      Bodies.circle(Common.random(50, browserW - 50), 20, 35, {
        restitution: 0.5,
        render: {
          fillStyle: "#888888",
          sprite: {
            texture: `./img/coins/${satisfactionLevels["I feel:"][mostCommonIFeel]}`,
            xScale: scale,
            yScale: scale,
          },
        },
      })
    );
  }

  console.log(mostCommonImCurrently);
  mostCommonImCurrently = "Open to opportunities, but not actively looking";
  console.log(satisfactionLevels["I'm currently:"][mostCommonImCurrently]);
  console.log(mostCommonImCurrently);

  for (let i = 0; i < mostCommonImCurrentlyPercent; i++) {
    let scale = 0.1;
    World.add(
      engine.world,
      Bodies.circle(Common.random(50, browserW - 50), 20, 35, {
        restitution: 0.5,
        render: {
          fillStyle: "#888888",
          sprite: {
            texture: `./img/coins/${satisfactionLevels["I'm currently:"][mostCommonImCurrently]}`,
            xScale: scale,
            yScale: scale,
          },
        },
      })
    );
  }

  //   for (percentage in satisfyPercentages) {
  //     for (i = 0; i++; i < satisfyPercentages[percentage] / 2) {}
  //   }

  //   if (typeof fetch !== "undefined") {
  //     var select = function (root, selector) {
  //       return Array.prototype.slice.call(root.querySelectorAll(selector));
  //     };

  //     var loadSvg = function (url) {
  //       return fetch(url)
  //         .then(function (response) {
  //           return response.text();
  //         })
  //         .then(function (raw) {
  //           return new window.DOMParser().parseFromString(raw, "image/svg+xml");
  //         });
  //     };

  //     Object.keys(industries).forEach((key) => {
  //       loadSvg("./img/" + industries[key].svg).then(function (root) {
  //         let svgScale = 0.3;
  //         var vertexSets = select(root, "path").map(function (path) {
  //           return Vertices.scale(
  //             Svg.pathToVertices(path, 30),
  //             svgScale,
  //             svgScale
  //           );
  //         });

  //         World.add(
  //           engine.world,
  //           Bodies.fromVertices(
  //             Common.random(browserW / 2, browserW),
  //             Common.random(0, browserH / 2),
  //             vertexSets,
  //             {
  //               career: industries[key].name,
  //               render: {
  //                 sprite: {
  //                   texture: `./img/${industries[key].file}`,
  //                   xScale: svgScale / 2,
  //                   yScale: svgScale / 2,
  //                 },
  //               },
  //             },
  //             true
  //           )
  //         );
  //       });
  //       // load text svgs
  //       loadSvg("./img/" + industries[key].textSvg).then(function (root) {
  //         let svgScale = 0.27;
  //         var vertexSets = select(root, "path").map(function (path) {
  //           return Vertices.scale(
  //             Svg.pathToVertices(path, 30),
  //             svgScale,
  //             svgScale
  //           );
  //         });

  //         World.add(
  //           engine.world,
  //           Bodies.fromVertices(
  //             Common.random(browserW / 4, browserW),
  //             Common.random(0, browserH / 2),
  //             vertexSets,
  //             {
  //               career: industries[key].name,
  //               render: {
  //                 sprite: {
  //                   texture: `./img/${industries[key].text}`,
  //                   xScale: svgScale / 4,
  //                   yScale: svgScale / 4,
  //                 },
  //               },
  //             },
  //             true
  //           )
  //         );
  //       });
  //     });
  //   }

  let mouse = Mouse.create(render.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: { visible: false },
      stiffness: 1,
    },
  });

  Matter.Events.on(mouseConstraint, "mousedown", function () {
    let body = mouseConstraint.body;
    if (body !== null) {
    } else {
      return;
    }
  });

  render.mouse = mouse;
  World.add(engine.world, [
    // stack,
    leftWall,
    rightWall,
    ceiling,
    ground,
    mouseConstraint,
  ]);
  Engine.run(engine);
  Render.run(render);
};
