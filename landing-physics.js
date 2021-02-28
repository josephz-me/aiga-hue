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
      file: "graphicDesigner.png",
      color: "#6F39DF",
    },
    "UX/UI Designer": {
      file: "UXUI.png",
      color: "#5E96FF",
    },
    Illustrator: {
      file: "illustrator.png",
      color: "#F2AE49",
    },
    "Game Designer": {
      file: "gameDesigner.png",
      color: "#4ED07A",
    },
    "AR/VR Designer": {
      file: "ARVR.png",
      color: "#3AD8D8",
    },
    "AI Designer": {
      file: "AIDesigner.png",
      color: "#F2AE49",
    },
    "Packaging Designer": {
      file: "packaging.png",
      color: "#E25757",
    },
  };

  for (let industry in industries) {
    World.add(engine.world, [
      Bodies.rectangle(
        Common.random(browserW - 700, browserW),
        Common.random(0, browserH - 200),
        200,
        200,
        {
          friction: 0.001,
          restitution: 0.5,
          career: industry,
          render: {
            sprite: {
              texture: "img/" + industries[industry].file,
              xScale: 0.6,
              yScale: 0.6,
            },
          },
        }
      ),
    ]);
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
      // console.log(mouseConstraint.body.career);
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

      $("body").css("background", `${industries[careerTitle].color}`);

      for (body in bodies) {
        if ("career" in bodies[body]) {
          if (bodies[body].career !== careerTitle) {
            bodies[body].render.opacity = 0.3;
          } else {
            bodies[body].timeScale = 0.2;
            let forceMagnitude = 0.5 * bodies[body].mass;
            Body.applyForce(bodies[body], bodies[body].position, {
              x:
                (forceMagnitude + Common.random() * forceMagnitude) *
                Common.choose([1, -1]),
              y: -forceMagnitude + 1 * -forceMagnitude,
            });
          }
        }
      }

      // setTimeout(function () {
      //   engine.timing.timeScale = 1;
      //   // console.log("running");
      // }, 1000);

      // create some random forces
      // explosion(engine);
      engine.world.gravity.y = 0.03;
    },
    function () {
      $("body").css("background", `#20232c`);
      var bodies = Composite.allBodies(engine.world);
      for (body in bodies) {
        bodies[body].render.opacity = 1;
        bodies[body].timeScale = 1;
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
