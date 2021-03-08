$(function () {
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

  let careerBackend = sessionStorage.getItem("careerBackend");
  let careerFrontend = sessionStorage.getItem("careerFrontend");
  $("body").css("background", `${industries[careerFrontend].color}`);
  $(".loadingScreen").css(
    "background-color",
    `${industries[careerFrontend].color}`
  );
  $(".designerCard h1").text(`The ${careerFrontend}`);
  console.log(careerBackend);

  let selectedDesigners;
  let designersInCareer = [];
  let designerEmploymentType = [];
  let designerHoursWorked = [];

  $.getJSON("data.json", (data) => {
    //CAREER
    for (let designer in data) {
      if (data[designer][questions[1]].includes(careerBackend)) {
        // selectedDesigner++;
        designersInCareer.push(data[designer]);
      }
    }

    //employment type
    let employmentType =
      designersInCareer[getRandomInt(designersInCareer.length)][questions[5]];

    for (let designer in designersInCareer) {
      if (designersInCareer[designer][questions[5]] === employmentType) {
        designerEmploymentType.push(designersInCareer[designer]);
      }
    }

    //hours worked
    let hoursWorked =
      designerEmploymentType[[getRandomInt(designerEmploymentType.length)]][
        questions[17]
      ];
    if (hoursWorked.includes("|")) {
      hoursWorked = hoursWorked.substr(0, hoursWorked.indexOf("|"));
    }

    for (let designer in designerEmploymentType) {
      if (
        designerEmploymentType[designer][questions[17]].includes(hoursWorked)
      ) {
        designerHoursWorked.push(designerEmploymentType[designer]);
      }
    }

    selectedDesigners = [...designerHoursWorked];

    //generate in card UI
    $(".employmentType .data").text(hoursWorked);
    $(".hoursWorked .data").text(employmentType);

    //https://www.codegrepper.com/code-examples/javascript/how+to+count+duplicate+values+in+dictionary+javascript
    var salaries = {};
    let highestSalaryFreq = 0;
    let mostCommonSalary = "";
    let mostCommonSalaryPercent;

    tallyResponses(selectedDesigners, salaries, 18);
    let sortedResponses = sortResponses(
      salaries,
      highestSalaryFreq,
      mostCommonSalary,
      mostCommonSalaryPercent
    );
    highestSalaryFreq = sortedResponses.highestElementFreq;
    mostCommonSalary = sortedResponses.mostCommonElement;
    mostCommonSalaryPercent = sortedResponses.mostCommonElementPercent;

    //inject into UI card
    $("#salaryPercent").text(`${mostCommonSalaryPercent}%`);
    $("#generatedSalary").text(`${mostCommonSalary.toLowerCase()}%`);
    $("#totalDesignerNum").text(selectedDesigners.length);

    //go through each person, check if they have one of top 5 skill, if yes log and move on

    //satisfactionIAm
    let satisfactionIAm = {};
    tallyResponses(selectedDesigners, satisfactionIAm, 22);

    let highestIAmFreq = 0;
    let mostCommonIam = "";
    let mostCommonIamPercent;

    let sortedIAmResponses = sortResponses(
      satisfactionIAm,
      highestIAmFreq,
      mostCommonIam,
      mostCommonIamPercent
    );
    highestIAmFreq = sortedIAmResponses.highestElementFreq;
    mostCommonIam = sortedIAmResponses.mostCommonElement;
    mostCommonIamPercent = sortedIAmResponses.mostCommonElementPercent;

    $(".iAm .mostCommonElement").text(`${mostCommonIam.toLowerCase()}"`);
    $(".iAm .mostCommonElementPercent").text(`${mostCommonIamPercent}%`);

    //satisfactionIFeel
    let satisfactionIFeel = {};
    tallyResponses(selectedDesigners, satisfactionIFeel, 23);

    let highestIFeelFreq = 0;
    let mostCommonIFeel = "";
    let mostCommonIFeelPercent;

    let sortedIFeelResponses = sortResponses(
      satisfactionIFeel,
      highestIFeelFreq,
      mostCommonIFeel,
      mostCommonIFeelPercent
    );
    highestIFeelFreq = sortedIFeelResponses.highestElementFreq;
    mostCommonIFeel = sortedIFeelResponses.mostCommonElement;
    mostCommonIFeelPercent = sortedIFeelResponses.mostCommonElementPercent;

    $(".iFeel .mostCommonElement").text(`${mostCommonIFeel.toLowerCase()}"`);
    $(".iFeel .mostCommonElementPercent").text(`${mostCommonIFeelPercent}%`);

    //satisfactionImCurrently
    let satisfactionImCurrently = {};
    tallyResponses(selectedDesigners, satisfactionImCurrently, 29);

    let highestImCurrentlyFreq = 0;
    let mostCommonImCurrently = "";
    let mostCommonImCurrentlyPercent;

    let sortedImCurrentlyResponses = sortResponses(
      satisfactionImCurrently,
      highestImCurrentlyFreq,
      mostCommonImCurrently,
      mostCommonImCurrentlyPercent
    );
    highestImCurrentlyFreq = sortedImCurrentlyResponses.highestElementFreq;
    mostCommonImCurrently = sortedImCurrentlyResponses.mostCommonElement;
    mostCommonImCurrentlyPercent =
      sortedImCurrentlyResponses.mostCommonElementPercent;

    $(".ImCurrently .mostCommonElement").text(
      `${mostCommonImCurrently.toLowerCase()}"`
    );
    $(".ImCurrently .mostCommonElementPercent").text(
      `${mostCommonImCurrentlyPercent}%`
    );

    //TRIGGER MATTER JS
    startDataVis(
      selectedDesigners,
      mostCommonIFeel,
      mostCommonIFeelPercent,
      mostCommonIam,
      mostCommonIamPercent,
      mostCommonImCurrently,
      mostCommonImCurrentlyPercent
    );
  });

  const tallyResponses = (untallied, desired, question) => {
    untallied.forEach(function (i) {
      desired[i[questions[question]]] =
        (desired[i[questions[question]]] || 0) + 1;
    });
  };

  const sortResponses = (
    unsorted,
    highestElementFreq,
    mostCommonElement,
    mostCommonElementPercent
  ) => {
    for (element in unsorted) {
      if (highestElementFreq === 0) {
        highestElementFreq = unsorted[element];
      } else {
        if (unsorted[element] > highestElementFreq) {
          highestElementFreq = unsorted[element];
        }
      }
    }

    mostCommonElement = Object.keys(unsorted).find(
      (key) => unsorted[key] === highestElementFreq
    );
    mostCommonElementPercent = Math.round(
      (highestElementFreq / selectedDesigners.length) * 100
    );
    return {
      unsorted,
      highestElementFreq,
      mostCommonElement,
      mostCommonElementPercent,
    };
  };

  // https://www.javascripttutorial.net/javascript-return-multiple-values/

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  hideLoading();
});

const hideLoading = () => {
  setTimeout(() => {
    $(".loadingScreen").addClass("hideLoading");
  }, 1200);
  setTimeout(() => {
    $(".loadingScreen").remove();
  }, 3000);
};
