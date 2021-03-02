$(function () {
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

  //boundaries
  let ground = Bodies.rectangle(browserW / 2, browserH + 30 + 2, browserW, 60, {
    isStatic: true,
    render: {
      lineWidth: 2,
    },
  });
  let ceiling = Bodies.rectangle(browserW / 2, -32, browserW, 60, {
    isStatic: true,
    render: {
      lineWidth: 2,
    },
  });
  let leftWall = Bodies.rectangle(-30 - 2, browserH / 2, 60, browserH * 2, {
    isStatic: true,
    render: {
      lineWidth: 2,
    },
  });
  let rightWall = Bodies.rectangle(
    browserW + 30 + 2,
    browserH / 2,
    60,
    browserH * 2,
    {
      isStatic: true,
      render: {
        lineWidth: 2,
      },
    }
  );

  let industries = {
    "Graphic Designer": {
      name: "Graphic Designer",
      file: "ARVR.png",
      svg: "./img-test/arvr-vector.svg",
      // file: "graphicDesigner.png",
      color: "#6F39DF",
    },
    "UX/UI Designer": {
      name: "UX/UI Designer",
      file: "UXUI.png",
      svg: "./img-test/uxui-vector.svg",
      // file: "UXUI.png",
      color: "#5E96FF",
    },
    Illustrator: {
      name: "Illustrator",
      file: "illustrator.png",
      svg: "./img-test/illustrator-vector.svg",
      color: "#F2AE49",
    },
    "Game Designer": {
      name: "Game Designer",
      file: "packaging.png",
      svg: "./img-test/packaging-vector.svg",
      // file: "gameDesigner.png",
      color: "#4ED07A",
    },
    "AI Designer": {
      name: "AI Designer",
      file: "packaging.png",
      svg: "./img-test/packaging-vector.svg",
      // file: "AIDesigner.png",
      color: "#E25757",
    },
    "Packaging Designer": {
      name: "Packaging Designer",
      file: "packaging.png",
      svg: "./img-test/packaging-vector.svg",
      color: "#A9926F",
    },
    "AR/VR Designer": {
      name: "AR/VR Designer",
      file: "packaging.png",
      svg: "./img-test/packaging-vector.svg",
      color: "#39D8D8",
    },
  };

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

    Object.keys(industries).forEach((key) =>
      loadSvg(industries[key].svg).then(function (root) {
        var vertexSets = select(root, "path").map(function (path) {
          return Vertices.scale(Svg.pathToVertices(path, 30), 0.25, 0.25);
        });

        console.log(Object.keys(industries));
        World.add(
          engine.world,
          Bodies.fromVertices(
            Common.random(0, browserW),
            40,
            vertexSets,
            {
              career: industries[key].name,
              render: {
                fillStyle: "transparent",
                strokeStyle: "white",
                lineWidth: 1,
                sprite: {
                  texture: `./img-test/${industries[key].file}`,
                  xScale: 0.125,
                  yScale: 0.125,
                },
              },
            },
            true
          )
        );
      })
    );
  }

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

  //Hover events

  $(".careers a").hover(
    function () {
      let careerTitle = $(this).text();
      let bodies = Composite.allBodies(engine.world);
      console.log(bodies);
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

  hideLoading();
});

const hideLoading = () => {
  setTimeout(() => {
    $(".loadingScreen").addClass("hideLoading");
  }, 500);
  setTimeout(() => {
    $(".loadingScreen").remove();
  }, 3000);
};
