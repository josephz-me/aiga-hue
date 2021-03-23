$(function () {
  let careerBackend;
  let careerFrontend;

  randomizeDesigner = () => {
    careerFrontend = Object.keys(industries)[
      getRandomInt(Object.keys(industries).length)
    ];
    careerBackend = industries[careerFrontend].backend;

    sessionStorage.setItem("careerBackend", careerBackend);
    sessionStorage.setItem("careerFrontend", careerFrontend);
  };

  if (sessionStorage.getItem("careerBackend") == null) {
    randomizeDesigner();
  } else {
    careerBackend = sessionStorage.getItem("careerBackend");
    careerFrontend = sessionStorage.getItem("careerFrontend");
  }

  generatePortfolios(careerFrontend);

  const sortResponses = (unsorted) => {
    let responsesArr = Object.entries(unsorted);
    responsesArr.sort((a, b) => {
      if (a[1] < b[1]) {
        return 1;
      } else {
        return -1;
      }
    });
    return responsesArr;
  };

  $(".designerCard img").attr("src", `img/${industries[careerFrontend].file}`);
  $("body").css("background", `${industries[careerFrontend].color}`);

  $(".loadingScreen").css(
    "background-color",
    `${industries[careerFrontend].color}`
  );

  //use custom career bg colors for text
  $("#careerBio").text(industries[careerFrontend].bio);
  $(".designerCard h1").text(`The ${careerFrontend}`);
  $(".dependentData p").css("color", industries[careerFrontend].textColor);
  $(".dependentData b").css("color", industries[careerFrontend].textColor);
  $(".portfolios a").css("color", industries[careerFrontend].textColor);
  $(".portfolios p").css("color", industries[careerFrontend].textColor);
  $(".quote").css("color", industries[careerFrontend].textColor);
  $(".datavisCatch").css("background-color", industries[careerFrontend].color);

  let selectedDesigners;
  let designersInCareer = [];
  let designerEmploymentType = [];
  let designerHoursWorked = [];

  console.log(sessionStorage.getItem("enteredBefore"));
  if (sessionStorage.getItem("enteredBefore") === null) {
    $(".onboarding-container").css("visibility", "visible");
    sessionStorage.setItem("enteredBefore", true);
  }

  $.getJSON("data.json", (data) => {
    //CAREER
    for (let designer in data) {
      if (careerBackend === "UX design") {
        if (
          data[designer][questions[1]].includes(careerBackend) ||
          data[designer][questions[1]].includes("UI design")
        ) {
          designersInCareer.push(data[designer]);
        }
      } else {
        if (data[designer][questions[1]].includes(careerBackend)) {
          designersInCareer.push(data[designer]);
        }
      }
    }

    let numDesigners = 0;
    let hoursWorked;
    let employmentType;
    const minThreshold = 10;
    while (numDesigners < minThreshold) {
      //employment type
      employmentType =
        designersInCareer[getRandomInt(designersInCareer.length)][questions[5]];

      for (let designer in designersInCareer) {
        if (designersInCareer[designer][questions[5]] === employmentType) {
          designerEmploymentType.push(designersInCareer[designer]);
        }
      }

      //hours worked
      hoursWorked =
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
      numDesigners = selectedDesigners.length;
    }

    //CHAT BUBBLES
    let allSkills = selectedDesigners[0][questions[38]].split("|");
    let randomizedSkill =
      allSkills[Math.floor(Math.random() * allSkills.length)];
    $(".quote-2").text(
      `One of the most critical design skills for the future will be ${randomizedSkill.toLowerCase()}.`
    );

    let allChallenges = selectedDesigners[0][questions[35]].split("|");
    let randomizedChallenge =
      allChallenges[Math.floor(Math.random() * allChallenges.length)];
    $(".quote-3").text(
      `One of the most critical challenges facing design is ${randomizedChallenge.toLowerCase()}.`
    );

    let allIndustries = selectedDesigners[0][questions[2]].split("|");
    let randomizedIndustry =
      allIndustries[Math.floor(Math.random() * allIndustries.length)];
    $(".quote-4").text(
      `I am able to work with industries such as ${randomizedIndustry.toLowerCase()}.`
    );

    // SKILLS
    // Create empty dict for counting skills

    let countedSkills = {};
    let countedBenefits = {};
    for (designer in selectedDesigners) {
      // currSkills is the array of skills of the current designer
      let currSkills = selectedDesigners[designer][questions[3]].split("|");
      let currBenefit = selectedDesigners[designer][questions[19]].split("|");
      // count each of the skills
      currSkills.forEach((skill) => {
        if (countedSkills[skill] !== undefined) {
          countedSkills[skill] += 1;
        } else {
          countedSkills[skill] = 1;
        }
      });

      currBenefit.forEach((benefit) => {
        if (countedBenefits[benefit] !== undefined) {
          countedBenefits[benefit] += 1;
        } else {
          countedBenefits[benefit] = 1;
        }
      });
    }
    let sortedSkills = sortResponses(countedSkills);
    let sortedBenefits = sortResponses(countedBenefits);

    $("#generatedSkills").text(
      `${sortedSkills[0][0] ? sortedSkills[0][0] : ""},
      ${sortedSkills[1][0] ? sortedSkills[1][0] : ""},
      ${sortedSkills[2][0] ? sortedSkills[2][0] : ""},
      ${sortedSkills[3][0] ? sortedSkills[3][0] : ""}`
    );
    $("#generatedBenefits").text(
      `${sortedBenefits[0][0] ? sortedBenefits[0][0] : ""},
      ${sortedBenefits[1][0] ? sortedBenefits[1][0] : ""},
      ${sortedBenefits[2][0] ? sortedBenefits[2][0] : ""},
      ${sortedBenefits[3][0] ? sortedBenefits[3][0] : ""}`
    );

    let peopleWithSkills = 0;
    let peopleWithSkillsPercent = 0;
    let peopleWithBenefitsPercent = 0;
    let peopleWithBenefits = 0;
    for (designer in selectedDesigners) {
      if (
        selectedDesigners[designer][questions[3]].includes(
          sortedSkills[0][0] ||
            sortedSkills[0][1] ||
            sortedSkills[0][2] ||
            sortedSkills[0][3]
        )
      ) {
        peopleWithSkills++;
      }

      if (
        selectedDesigners[designer][questions[19]].includes(
          sortedBenefits[0][0] ||
            sortedBenefits[0][1] ||
            sortedBenefits[0][2] ||
            sortedBenefits[0][3]
        )
      ) {
        peopleWithBenefits++;
      }
    }

    peopleWithSkillsPercent = Math.trunc(
      (peopleWithSkills / selectedDesigners.length) * 100
    );
    peopleWithBenefitsPercent = Math.trunc(
      (peopleWithBenefits / selectedDesigners.length) * 100
    );
    $("#skillsPercent").text(`${peopleWithSkillsPercent}%`);
    $("#benefitsPercent").text(`${peopleWithBenefitsPercent}%`);

    //generate in card UI
    $(".employmentType .data").text(hoursWorked);
    $(".hoursWorked .data").text(employmentType);

    //https://www.codegrepper.com/code-examples/javascript/how+to+count+duplicate+values+in+dictionary+javascript
    var salaries = {};
    let highestSalaryFreq = 0;
    let mostCommonSalary = "";
    let mostCommonSalaryPercent;

    tallyResponses(selectedDesigners, salaries, 18);
    let sortedResponses = findHighestResponse(
      salaries,
      highestSalaryFreq,
      mostCommonSalary,
      mostCommonSalaryPercent
    );
    highestSalaryFreq = sortedResponses.highestElementFreq;
    mostCommonSalary = sortedResponses.mostCommonElement;
    mostCommonSalaryPercent = sortedResponses.mostCommonElementPercent;

    //inject into UI card
    $("#generatedSalary").text(`${mostCommonSalary.toLowerCase()}`);
    $("#salaryPercent").text(`${mostCommonSalaryPercent}%`);
    $("#totalDesignerNum").text(selectedDesigners.length);

    //go through each person, check if they have one of top 5 skill, if yes log and move on

    //MATTER JS CATEGORIES

    //satisfactionIAmTwo
    let satisfactionIAmTwo = {};
    tallyResponses(selectedDesigners, satisfactionIAmTwo, 22);

    let IAmTwoCounter = 0;
    let responseIAmTwoArr = sortResponses(satisfactionIAmTwo);
    let selectedIAmTwoResponse = responseIAmTwoArr[IAmTwoCounter][0];
    let selectedIAmTwoResponsePercent = Math.round(
      (responseIAmTwoArr[IAmTwoCounter][1] /
        Object.keys(selectedDesigners).length) *
        100
    );

    $(".iAmTwo .mostCommonElement").text(
      `${selectedIAmTwoResponse.toLowerCase()}"`
    );
    $(".iAmTwo .mostCommonElementPercent").text(
      `${selectedIAmTwoResponsePercent}%`
    );

    $(".one .button").on("click", () => {
      if (IAmTwoCounter < responseIAmTwoArr.length - 1) {
        IAmTwoCounter++;
      } else {
        IAmTwoCounter = 0;
      }

      selectedIAmTwoResponse = responseIAmTwoArr[IAmTwoCounter][0];
      selectedIAmTwoResponsePercent = Math.round(
        (responseIAmTwoArr[IAmTwoCounter][1] /
          Object.keys(selectedDesigners).length) *
          100
      );
      $(".iAmTwo .mostCommonElement").text(
        `${selectedIAmTwoResponse.toLowerCase()}"`
      );
      $(".iAmTwo .mostCommonElementPercent").text(
        `${selectedIAmTwoResponsePercent}%`
      );

      replaceBodies(
        1,
        "I am:__1",
        selectedIAmTwoResponse,
        selectedIAmTwoResponsePercent
      );
    });

    let satisfactionImCurrently = {};
    tallyResponses(selectedDesigners, satisfactionImCurrently, 29);

    let ImCurrentlyCounter = 0;
    let responseImCurrentlyArr = sortResponses(satisfactionImCurrently);
    let selectedImCurrentlyResponse =
      responseImCurrentlyArr[ImCurrentlyCounter][0];
    let selectedImCurrentlyResponsePercent = Math.round(
      (responseImCurrentlyArr[ImCurrentlyCounter][1] /
        Object.keys(selectedDesigners).length) *
        100
    );

    $(".imCurrently .mostCommonElement").text(
      `${selectedImCurrentlyResponse.toLowerCase()}"`
    );
    $(".imCurrently .mostCommonElementPercent").text(
      `${selectedImCurrentlyResponsePercent}%`
    );

    $(".two .button").on("click", () => {
      if (ImCurrentlyCounter < responseImCurrentlyArr.length - 1) {
        ImCurrentlyCounter++;
      } else {
        ImCurrentlyCounter = 0;
      }

      selectedImCurrentlyResponse =
        responseImCurrentlyArr[ImCurrentlyCounter][0];
      selectedImCurrentlyResponsePercent = Math.round(
        (responseImCurrentlyArr[ImCurrentlyCounter][1] /
          Object.keys(selectedDesigners).length) *
          100
      );
      $(".imCurrently .mostCommonElement").text(
        `${selectedImCurrentlyResponse.toLowerCase()}"`
      );
      $(".imCurrently .mostCommonElementPercent").text(
        `${selectedImCurrentlyResponsePercent}%`
      );

      replaceBodies(
        2,
        "I'm currently:",
        selectedImCurrentlyResponse,
        selectedImCurrentlyResponsePercent
      );
    });

    //satisfactionIFeel
    let satisfactionIFeel = {};
    tallyResponses(selectedDesigners, satisfactionIFeel, 23);

    let IFeelCounter = 0;
    let responseIFeelArr = sortResponses(satisfactionIFeel);
    let selectedIFeelResponse = responseIFeelArr[IFeelCounter][0];
    let selectedIFeelResponsePercent = Math.round(
      (responseIFeelArr[IFeelCounter][1] /
        Object.keys(selectedDesigners).length) *
        100
    );

    $(".iFeel .mostCommonElement").text(
      `${selectedIFeelResponse.toLowerCase()}"`
    );
    $(".iFeel .mostCommonElementPercent").text(
      `${selectedIFeelResponsePercent}%`
    );

    $(".three .button").on("click", () => {
      if (IFeelCounter < responseIFeelArr.length - 1) {
        IFeelCounter++;
      } else {
        IFeelCounter = 0;
      }

      selectedIFeelResponse = responseIFeelArr[IFeelCounter][0];
      selectedIFeelResponsePercent = Math.round(
        (responseIFeelArr[IFeelCounter][1] /
          Object.keys(selectedDesigners).length) *
          100
      );
      $(".iFeel .mostCommonElement").text(
        `${selectedIFeelResponse.toLowerCase()}"`
      );
      $(".iFeel .mostCommonElementPercent").text(
        `${selectedIFeelResponsePercent}%`
      );

      replaceBodies(
        3,
        "I feel:",
        selectedIFeelResponse,
        selectedIFeelResponsePercent
      );
    });

    //iHave
    let satisfactionIHave = {};
    tallyResponses(selectedDesigners, satisfactionIHave, 20);

    let IHaveCounter = 0;
    let responseIHaveArr = sortResponses(satisfactionIHave);
    let selectedIHaveResponse = responseIHaveArr[IHaveCounter][0];
    let selectedIHaveResponsePercent = Math.round(
      (responseIHaveArr[IHaveCounter][1] /
        Object.keys(selectedDesigners).length) *
        100
    );

    $(".iHave .mostCommonElement").text(
      `${selectedIHaveResponse.toLowerCase()}"`
    );
    $(".iHave .mostCommonElementPercent").text(
      `${selectedIHaveResponsePercent}%`
    );

    $(".four .button").on("click", () => {
      if (IHaveCounter < responseIHaveArr.length - 1) {
        IHaveCounter++;
      } else {
        IHaveCounter = 0;
      }

      selectedIHaveResponse = responseIHaveArr[IHaveCounter][0];
      selectedIHaveResponsePercent = Math.round(
        (responseIHaveArr[IHaveCounter][1] /
          Object.keys(selectedDesigners).length) *
          100
      );
      $(".iHave .mostCommonElement").text(
        `${selectedIHaveResponse.toLowerCase()}"`
      );
      $(".iHave .mostCommonElementPercent").text(
        `${selectedIHaveResponsePercent}%`
      );

      replaceBodies(
        4,
        "I have:",
        selectedIHaveResponse,
        selectedIHaveResponsePercent
      );
    });

    //iAmTwo
    let satisfactionIAm = {};
    tallyResponses(selectedDesigners, satisfactionIAm, 21);

    let IAmCounter = 0;
    let responseIAmArr = sortResponses(satisfactionIAm);
    let selectedIAmResponse = responseIAmArr[IAmCounter][0];
    let selectedIAmResponsePercent = Math.round(
      (responseIAmArr[IAmCounter][1] / Object.keys(selectedDesigners).length) *
        100
    );

    $(".iAm .mostCommonElement").text(`${selectedIAmResponse.toLowerCase()}"`);
    $(".iAm .mostCommonElementPercent").text(`${selectedIAmResponsePercent}%`);

    $(".five .button").on("click", () => {
      if (IAmCounter < responseIAmArr.length - 1) {
        IAmCounter++;
      } else {
        IAmCounter = 0;
      }

      selectedIAmResponse = responseIAmArr[IAmCounter][0];
      selectedIAmResponsePercent = Math.round(
        (responseIAmArr[IAmCounter][1] /
          Object.keys(selectedDesigners).length) *
          100
      );
      $(".iAm .mostCommonElement").text(
        `${selectedIAmResponse.toLowerCase()}"`
      );
      $(".iAm .mostCommonElementPercent").text(
        `${selectedIAmResponsePercent}%`
      );

      replaceBodies(
        5,
        "I am:",
        selectedIAmResponse,
        selectedIAmResponsePercent
      );
    });

    //TRIGGER MATTER JS
    startDataVis(
      selectedDesigners,
      selectedIFeelResponse,
      selectedIFeelResponsePercent,
      selectedIAmTwoResponse,
      selectedIAmTwoResponsePercent,
      selectedImCurrentlyResponse,
      selectedImCurrentlyResponsePercent,
      selectedIHaveResponse,
      selectedIHaveResponsePercent,
      selectedIAmResponse,
      selectedIAmResponsePercent
    );
  });

  const tallyResponses = (untallied, desired, question) => {
    untallied.forEach(function (i) {
      desired[i[questions[question]]] =
        (desired[i[questions[question]]] || 0) + 1;
    });
  };

  const findHighestResponse = (
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

  $(".cancel").on("click", () => {
    $(".onboarding-container").css("display", "none");
  });

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
