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
  (columnWidth * columnNum) / 2,
  -thickness / 2 - 20,
  columnWidth * columnNum,
  thickness,
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
  selectedIAmTwoResponse,
  selectedIAmTwoResponsePercent,
  mostCommonImCurrently,
  mostCommonImCurrentlyPercent,
  selectedIHaveResponse,
  selectedIHaveResponsePercent,
  selectedIAmResponse,
  selectedIAmResponsePercent
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

  let responses = [
    [selectedIAmTwoResponse, selectedIAmTwoResponsePercent],
    [mostCommonImCurrently, mostCommonImCurrentlyPercent],
    [mostCommonIFeel, mostCommonIFeelPercent],
    [selectedIHaveResponse, selectedIHaveResponsePercent],
    [selectedIAmResponse, selectedIAmResponsePercent],
  ];

  if (typeof fetch !== "undefined") {
    for (let c = 0; c < Object.keys(satisfactionLevels).length; c++) {
      let category = Object.keys(satisfactionLevels)[c];

      if (c + 1 > 1 && c + 1 < 5) {
        loadSvg("./img/satisfactionIcons/chat-vector.svg").then(function (
          root
        ) {
          let svgScale = 0.2;
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
              200 + c * 400,
              Common.random(0, 10),
              vertexSets,
              {
                restitution: 0.5,
                quoteCol: "quote-" + (c + 1),
                render: {
                  sprite: {
                    texture: `./img/satisfactionIcons/chat-inactive.png`,
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

      //print satisfaction icons
      let bodyNum = Math.floor(responses[c][1] / 10);

      for (let i = 0; i < bodyNum; i++) {
        loadSvg(
          "./img/satisfactionIcons/" +
            satisfactionLevels[category][responses[c][0]].svg
        ).then(function (root) {
          let svgScale = Common.random(0.17, 0.27);
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
              Common.random(200 + c * 400 - 100, 200 + c * 400),
              Common.random(0, 10),
              vertexSets,
              {
                restitution: 0.5,
                column: c + 1,
                render: {
                  sprite: {
                    texture: `./img/satisfactionIcons/${
                      satisfactionLevels[category][responses[c][0]].image
                    }`,
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
  }
  let mouse = Mouse.create(render.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: { visible: false },
      stiffness: 1,
    },
  });

  setInterval(() => {
    let mouseX = mouse.absolute.x;
    if (mouseX > 0 && mouseX < 400) {
      if (!$(".one").hasClass("show")) {
        $(".showButton").removeClass("showButton");
        $(".show").removeClass("show");
        $(".one").addClass("show");
        $(".one .button").addClass("showButton");
      }
    } else if (mouseX > 400 && mouseX < 800) {
      if (!$(".two").hasClass("show")) {
        $(".showButton").removeClass("showButton");
        $(".show").removeClass("show");
        $(".two").addClass("show");
        $(".two .button").addClass("showButton");
      }
    } else if (mouseX > 800 && mouseX < 1200) {
      if (!$(".three").hasClass("show")) {
        $(".showButton").removeClass("showButton");
        $(".show").removeClass("show");
        $(".three").addClass("show");
        $(".three .button").addClass("showButton");
      }
    } else if (mouseX > 1200 && mouseX < 1600) {
      if (!$(".four").hasClass("show")) {
        $(".showButton").removeClass("showButton");
        $(".show").removeClass("show");
        $(".four").addClass("show");
        $(".four .button").addClass("showButton");
      }
    } else if (mouseX > 1600 && mouseX < 2000) {
      if (!$(".five").hasClass("show")) {
        $(".showButton").removeClass("showButton");
        $(".show").removeClass("show");
        $(".five").addClass("show");
        $(".five .button").addClass("showButton");
      }
    }
  }, 100);

  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

  Matter.Events.on(mouseConstraint, "mousedown", function () {
    if (this.body !== null) {
      let body = mouseConstraint.body;
      if ("quoteCol" in body) {
        let desiredQuote = $(`.${body.quoteCol}`);
        body.render.sprite.texture = "./img/satisfactionIcons/chat-active.png";
        $(desiredQuote).addClass("showQuote");
        setTimeout(() => {
          $(desiredQuote.removeClass("showQuote"));
          // body.render.sprite.texture =
          //   "./img/satisfactionIcons/chat-inactive.png";
        }, 6000);
      } else {
        console.log("not a chat bubble");
      }
    }
  });

  render.mouse = mouse;
  World.add(engine.world, [ceiling, ground, mouseConstraint]);
  Engine.run(engine);
  Render.run(render);
};

const replaceBodies = (columnNum, category, response, responsePercent) => {
  let allBodies = Composite.allBodies(engine.world);
  for (body in allBodies) {
    let col = allBodies[body].column;
    if (col === columnNum) {
      Composite.remove(engine.world, allBodies[body]);
    }
  }
  let newBodies = Math.floor(responsePercent / 10) * 1;
  if (newBodies < 1) {
    newBodies++;
  }

  for (let i = 0; i < newBodies; i++) {
    loadSvg(
      "./img/satisfactionIcons/" + satisfactionLevels[category][response].svg
    ).then(function (root) {
      let svgScale = Common.random(0.2, 0.3);
      // let svgScale = Common.random(0.08, 0.2);
      var vertexSets = select(root, "path").map(function (path) {
        return Vertices.scale(Svg.pathToVertices(path, 30), svgScale, svgScale);
      });
      World.add(
        engine.world,
        Bodies.fromVertices(
          Common.random(
            200 + (columnNum - 1) * 400 - 100,
            200 + (columnNum - 1) * 400
          ),
          Common.random(0, 100),
          vertexSets,
          {
            column: satisfactionLevels[category][response].column,
            render: {
              sprite: {
                texture: `./img/satisfactionIcons/${satisfactionLevels[category][response].image}`,
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
};

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

const map = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

$(".columnData .button").hover(
  function () {
    let desiredCol = parseInt($(this).attr("id"), 10);
    let bodies = Composite.allBodies(engine.world);
    for (body in bodies) {
      if ("column" in bodies[body]) {
        if (bodies[body].column === desiredCol) {
          let forceMagnitude = 0.03 * bodies[body].mass;
          Body.applyForce(bodies[body], bodies[body].position, {
            x:
              (forceMagnitude + Common.random() * forceMagnitude) *
              Common.choose([1, -1]),
            y: -forceMagnitude + 1 * -forceMagnitude,
          });
        }
      }
    }
    // engine.world.gravity.y = 0.03;
  },
  function () {
    // engine.world.gravity.y = 1;
  }
);
