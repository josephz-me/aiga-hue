$(function () {
  $(".careers a").on("click", function () {
    let careerBackend = $(this).attr("id");
    let careerFrontend = $(this).text();
    sessionStorage.setItem("careerBackend", careerBackend);
    sessionStorage.setItem("careerFrontend", careerFrontend);
  });

  $(".careers a").hover(
    function () {
      let careerTitle = $(this).text();
      let bodies = Composite.allBodies(engine.world);
      $("body").css("background", `${industries[careerTitle].color}`);
      for (body in bodies) {
        if ("career" in bodies[body]) {
          if (bodies[body].career !== careerTitle) {
            bodies[body].render.opacity = 0.3;
          } else {
            // bodies[body].timeScale = 0.2;
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
      engine.world.gravity.y = 0.03;
    },
    function () {
      $("body").css("background", `#20232c`);
      var bodies = Composite.allBodies(engine.world);
      for (body in bodies) {
        bodies[body].render.opacity = 1;
      }
      engine.world.gravity.y = 1;
      engine.timing.timeScale = 1;
    }
  );

  // PHYSICS STUFF

  let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
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

  Matter.Render.setPixelRatio(render, "auto");

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

    Object.keys(industries).forEach((key) => {
      loadSvg("./img/" + industries[key].svg).then(function (root) {
        let svgScale = 0.3;
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
            Common.random(browserW / 2, browserW),
            Common.random(0, browserH / 2),
            vertexSets,
            {
              career: industries[key].name,
              render: {
                sprite: {
                  texture: `./img/${industries[key].file}`,
                  xScale: svgScale / 2,
                  yScale: svgScale / 2,
                },
              },
            },
            true
          )
        );
      });
      // load text svgs
      loadSvg("./img/" + industries[key].textSvg).then(function (root) {
        let svgScale = 0.27;
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
            Common.random(browserW / 4, browserW),
            Common.random(0, browserH / 2),
            vertexSets,
            {
              career: industries[key].name,
              render: {
                sprite: {
                  texture: `./img/${industries[key].text}`,
                  xScale: svgScale / 1,
                  yScale: svgScale / 1,
                },
              },
            },
            true
          )
        );
      });
    });
  }

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

  var explosion = function (engine) {
    var bodies = Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
      var body = bodies[i];

      if (!body.isStatic && body.position.y >= 500) {
        var forceMagnitude = 0.02 * body.mass;

        Body.applyForce(body, body.position, {
          x:
            (forceMagnitude + Common.random() * forceMagnitude) *
            Common.choose([1, -1]),
          y: -forceMagnitude + Common.random() * -forceMagnitude,
        });
      }
    }
  };

  hideLoading();
});

//LOADING SCREEN
const hideLoading = () => {
  setTimeout(() => {
    $(".loadingScreen").addClass("hideLoading");
  }, 1000);
  setTimeout(() => {
    $(".loadingScreen").remove();
  }, 3000);
};

const openAbout = () => {
  // Get the modal
  let modal = document.getElementById("aboutModal");

  window.onclick = function (event) {
    if (event.target == modal) {
      $("#aboutModal").removeClass("showAbout");
    }
  };

  $("#aboutModal").addClass("showAbout");
};
