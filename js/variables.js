const questions = [
  "I've worked in design for:",
  "I work in:",
  "Industries I work with:",
  "My skills include:",
  "I am currently learning:",
  "I am currently a/an:",
  "I work in:__1",
  "I work in:__2",
  "I work in:__3",
  "I'm not currently working because:",
  "I'm a/an:",
  "My job is challenging because:",
  "My job is great because:",
  "My organization has:",
  "My department has:",
  "I've worked here for:",
  "I've had my role for:",
  "I typically work:",
  "I make:",
  "My benefits include:",
  "I have:",
  "I am:",
  "I am:__1",
  "I feel:",
  "On the side I:",
  "I learned design from:",
  "I got my degree in:",
  "I've had:",
  "I stay current with design by:",
  "I'm currently:",
  "My ZIP code is:",
  "My age is:",
  "I identify as:",
  "LGBTQIA+ status:",
  "I am:__2",
  "I feel the most critical issues/challenges currently facing design are:",
  "I feel the most critical issues/challenges currently facing design are:__",
  "I think the emerging/future technologies that will have the biggest impact on design are:",
  "I think the most critical design skills for the future will be:",
  "My main priorities are:",
];

const industries = {
  "Graphic Designer": {
    name: "Graphic Designer",
    bio:
      "Graphic Designers create visual communications that convey messages beautifully and effectively using principles such as typography, shape and color.",
    backend: "Graphic design",
    file: "graphic.png",
    svg: "graphic-vector.svg",
    color: "#DF5739",
    text: "graphic-text.png",
    textColor: "#CB3C1D",
    textSvg: "graphic-text-vector.svg",
  },
  "UX/UI Designer": {
    name: "UX/UI Designer",
    bio:
      "UX/UI Designers develop enjoyable and accessible experiences for users across digital platforms using design principles, prototyping tools and code.",
    backend: "UX design",
    file: "uxui.png",
    svg: "uxui-vector.svg",
    // color: "#5E96FF",
    color: "#3FE1EC",
    text: "uxui-text.png",
    textColor: "#0B8C95",
    textSvg: "uxui-text-vector.svg",
  },
  Illustrator: {
    name: "Illustrator",
    bio:
      "Illustrators create images using physical and digital tools that convey ideas and stories through materials like books, character design, and concept art.",
    backend: "Illustration",
    file: "illustrator.png",
    svg: "illustrator-vector.svg",
    color: "#FFAF36",
    text: "illustrator-text.png",
    textColor: "#ED9B20",
    textSvg: "illustrator-text-vector.svg",
  },
  "Game Designer": {
    name: "Game Designer",
    bio:
      "Game Designers work on teams to create stories, characters and assets used in video games through skills like writing code, 3D modeling, and animation.",
    backend: "Game design",
    file: "game.png",
    svg: "game-vector.svg",
    // file: "gameDesigner.png",
    color: "#1A67C1",
    text: "game-text.png",
    textColor: "#1054A4",
    textSvg: "game-text-vector.svg",
  },
  "AI Designer": {
    name: "AI Designer",
    bio:
      "AI Designers work with teams of engineers to create AI prototypes, build developer tools, and collect data to increase the effectiveness of services.",
    backend: "AI / Algorithm design",
    file: "ai.png",
    svg: "ai-vector.svg",
    color: "#39BF5F",
    text: "ai-text.png",
    textColor: "#24B54D",
    textSvg: "ai-text-vector.svg",
  },
  "Packaging Designer": {
    name: "Packaging Designer",
    bio:
      "Packaging Designers design beautiful and economical packaging for clients using graphic and industrial design principles like color, form, and typography.",
    backend: "Packaging design",
    file: "packaging.png",
    svg: "packaging-vector.svg",
    color: "#FFA093",
    text: "packaging-text.png",
    textColor: "#EE7767",
    textSvg: "packaging-text-vector.svg",
  },
  "AR/VR Designer": {
    name: "AR/VR Designer",
    bio:
      "AR/VR Designers create immersive experiences across AR/VR applications using their knowledge of design principles, 3D tools, and code.",
    backend: "AR / VR design",
    file: "arvr.png",
    svg: "arvr-vector.svg",
    color: "#7642E2",
    text: "arvr-text.png",
    textColor: "#5D25D2",
    textSvg: "arvr-text-vector.svg",
  },
};

const satisfactionLevels = {
  "I am:__1": {
    "Ready to call it quits": {
      column: 1,
      image: "smile-01.png",
      svg: "smile-vector.svg",
    },
    "Not really satisfied, but I deal": {
      column: 1,
      image: "smile-02.png",
      svg: "smile-vector.svg",
    },
    "Not sure": {
      column: 1,
      image: "smile-03.png",
      svg: "smile-vector.svg",
    },
    "Happy, but there's room for improvement": {
      column: 1,
      image: "smile-04.png",
      svg: "smile-vector.svg",
    },
    "Extremely satisfied with my work situation": {
      column: 1,
      image: "smile-05.png",
      svg: "smile-vector.svg",
    },
  },
  "I'm currently:": {
    "Firing on all cylinders to find something new": {
      column: 2,
      image: "star-01.png",
      svg: "star-vector.svg",
    },
    "Ready to make a move, but it's not urgent": {
      column: 2,
      image: "star-02.png",
      svg: "star-vector.svg",
    },
    "Open to opportunities, but not actively looking": {
      column: 2,
      image: "star-03.png",
      svg: "star-vector.svg",
    },
    "Casually looking, if something pops up I might pursue": {
      column: 2,
      image: "star-04.png",
      svg: "star-vector.svg",
    },
    "Happy to stay where I am": {
      column: 2,
      image: "star-05.png",
      svg: "star-vector.svg",
    },
  },
  "I feel:": {
    "I keep my things in a box": {
      column: 3,
      image: "heart-01.png",
      svg: "heart-vector.svg",
    },
    "I'm a little concerned": {
      column: 3,
      image: "heart-02.png",
      svg: "heart-vector.svg",
    },
    "Not sure": {
      column: 3,
      image: "heart-03.png",
      svg: "heart-vector.svg",
    },
    "Fairly stable": {
      column: 3,
      image: "heart-04.png",
      svg: "heart-vector.svg",
    },
    "Rock solid": {
      column: 3,
      image: "heart-05.png",
      svg: "heart-vector.svg",
    },
  },
  "I have:": {
    "Promising opportunities for advancement": {
      column: 4,
      image: "arrow-05.png",
      svg: "arrow-vector.svg",
    },
    "Some opportunity for advancement": {
      column: 4,
      image: "arrow-04.png",
      svg: "arrow-vector.svg",
    },
    "Limited opportunity for advancement": {
      column: 4,
      image: "arrow-03.png",
      svg: "arrow-vector.svg",
    },
    "Not sure": {
      column: 4,
      image: "arrow-02.png",
      svg: "arrow-vector.svg",
    },
    "No opportunity for advancement": {
      column: 4,
      image: "arrow-01.png",
      svg: "arrow-vector.svg",
    },
  },
  "I am:": {
    "Learning and increasing my skill set every day": {
      column: 5,
      image: "bulb-05.png",
      svg: "bulb-vector.svg",
    },
    "Learning some new skills": {
      column: 5,
      image: "bulb-04.png",
      svg: "bulb-vector.svg",
    },
    "Learning very little": {
      column: 5,
      image: "bulb-03.png",
      svg: "bulb-vector.svg",
    },

    "Not sure": {
      column: 5,
      image: "bulb-02.png",
      svg: "bulb-vector.svg",
    },

    "Learning nothing": {
      column: 5,
      image: "bulb-01.png",
      svg: "bulb-vector.svg",
    },
  },
};

$(".logo")
  .on("mouseenter", () => {
    $(".logo a").text("AIGA & You");
  })
  .on("mouseleave", () => {
    $(".logo a").text("AIGA & Hue");
  });
