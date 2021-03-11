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
let columnWidth = 400;
let columnNum = 5;

browserW = window.innerWidth;
browserH = window.innerHeight;
let render = Render.create({
  element: document.body,
  engine: engine,

  options: {
    width: columnWidth * columnNum,
    height: browserH,
    wireframes: false,
    background: "transparent",
    wireframeBackground: "transparent",
  },
});

//boundaries
let thickness = 100;
let ground = Bodies.rectangle(
  (columnWidth * columnNum) / 2,
  browserH + thickness / 2 + 2,
  columnWidth * columnNum,
  thickness,
  {
    isStatic: true,
    render: {
      lineWidth: 1,
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

$(function () {
  $(".columnData .column")
    .on("mouseenter", function () {
      // console.log("entered");
    })
    .on("mouseleave", function () {
      console.log("left");
    });
});
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
  for (let i = 0; i < columnNum + 1; i++) {
    World.add(
      engine.world,
      Bodies.rectangle(columnWidth * i, browserH / 2, 1, browserH, {
        isStatic: true,
        render: {
          fillStyle: "#ffffff",
        },
      })
    );
  }

  // let satisfyPercentages = {};
  // satisfyPercentages[mostCommonIam] = mostCommonIamPercent;
  // satisfyPercentages[mostCommonIFeel] = mostCommonIFeelPercent;
  // satisfyPercentages[mostCommonImCurrently] = mostCommonImCurrentlyPercent;

  if (typeof fetch !== "undefined") {
    var select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };
    var loadSvg = function (url) {
      return fetch(url)
        .then(function (response) {
          return response.text();
        })
        .then(function (raw) {
          return new window.DOMParser().parseFromString(raw, "image/svg+xml");
        });
    };
    for (let c = 0; c < 5; c++) {
      for (let i = 0; i < 10; i++) {
        loadSvg(
          "./img/satisfactionIcons/" +
            satisfactionLevels["I feel:"][mostCommonIFeel].svg
        ).then(function (root) {
          let svgScale = Common.random(0.1, 0.25);
          var vertexSets = select(root, "path").map(function (path) {
            return Vertices.scale(
              Svg.pathToVertices(path, 30),
              svgScale,
              svgScale
            );
          });
          World.add(
            engine.world,
            Bodies.fromVertices(
              Common.random(200 + c * 400 - 20, 200 + c * 400 + 20),
              Common.random(0, 10),
              vertexSets,
              {
                render: {
                  sprite: {
                    texture: `./img/satisfactionIcons/${satisfactionLevels["I feel:"][mostCommonIFeel].image}`,
                    xScale: svgScale / 1,
                    yScale: svgScale / 1,
                  },
                },
              },
              true
            )
          );
        });
      }
    }
    // for (let i = 0; i < 60; i++) {
    //   loadSvg(
    //     "./img/satisfactionIcons/" +
    //       satisfactionLevels["I am:"][mostCommonIam].svg
    //   ).then(function (root) {
    //     let svgScale = 0.13;
    //     var vertexSets = select(root, "path").map(function (path) {
    //       return Vertices.scale(
    //         Svg.pathToVertices(path, 30),
    //         svgScale,
    //         svgScale
    //       );
    //     });
    //     World.add(
    //       engine.world,
    //       Bodies.fromVertices(
    //         Common.random(0, browserW),
    //         Common.random(0, browserH / 2),
    //         vertexSets,
    //         {
    //           render: {
    //             sprite: {
    //               texture: `./img/satisfactionIcons/${satisfactionLevels["I am:"][mostCommonIam].image}`,
    //               xScale: svgScale / 1,
    //               yScale: svgScale / 1,
    //             },
    //           },
    //         },
    //         true
    //       )
    //     );
    //   });
  }

  // for (let i = 0; i < 5; i++) {
  //   loadSvg("./img/" + industries["UX/UI Designer"].svg).then(function (
  //     root
  //   ) {
  //     let svgScale = 0.3;
  //     var vertexSets = select(root, "path").map(function (path) {
  //       return Vertices.scale(
  //         Svg.pathToVertices(path, 30),
  //         svgScale,
  //         svgScale
  //       );
  //     });

  //     World.add(
  //       engine.world,
  //       Bodies.fromVertices(
  //         Common.random(0, browserW),
  //         Common.random(0, browserH / 2),
  //         vertexSets,
  //         {
  //           render: {
  //             sprite: {
  //               texture: `./img/${industries["UX/UI Designer"].file}`,
  //               xScale: svgScale / 2,
  //               yScale: svgScale / 2,
  //             },
  //           },
  //         },
  //         true
  //       )
  //     );
  //   });
  // }

  // for (let i = 0; i < 20; i++) {
  //   loadSvg(
  //     "./img/satisfactionIcons/" +
  //       satisfactionLevels["I'm currently:"][mostCommonImCurrently].svg
  //   ).then(function (root) {
  //     let svgScale = 0.1;
  //     var vertexSets = select(root, "path").map(function (path) {
  //       return Vertices.scale(
  //         Svg.pathToVertices(path, 30),
  //         svgScale,
  //         svgScale
  //       );
  //     });

  //     World.add(
  //       engine.world,
  //       Bodies.fromVertices(
  //         Common.random(0, browserW),
  //         Common.random(0, browserH / 2),
  //         vertexSets,
  //         {
  //           render: {
  //             sprite: {
  //               texture: `./img/satisfactionIcons/${satisfactionLevels["I'm currently:"][mostCommonImCurrently].image}`,
  //               xScale: svgScale / 1,
  //               yScale: svgScale / 1,
  //             },
  //           },
  //         },
  //         true
  //       )
  //     );
  //   });
  // }
  // }

  let mouse = Mouse.create(render.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: { visible: false },
      stiffness: 1,
    },
  });

  // setInterval(() => {
  //   console.log(mouse.absolute.x);
  // }, 200);

  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

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
    // leftWall,
    ceiling,
    ground,
    mouseConstraint,
  ]);
  Engine.run(engine);
  Render.run(render);
};
