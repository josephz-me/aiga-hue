let questions = [
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

// ];
$.getJSON("data.json", (data) => {
  let richDesigner = 0;

  for (let designer in data) {
    if (
      data[designer][questions[18]] === "$100,000 to $149,999" &&
      data[designer][questions[22]].includes("Happy")
    ) {
      richDesigner++;
    }
  }

  console.log(richDesigner);
});
