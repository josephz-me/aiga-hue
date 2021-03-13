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

  $(".designerCard img").attr("src", `img/${industries[careerFrontend].file}`);
  $("body").css("background", `${industries[careerFrontend].color}`);
  $(".loadingScreen").css(
    "background-color",
    `${industries[careerFrontend].color}`
  );
  $(".designerCard h1").text(`The ${careerFrontend}`);

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
    $("#salaryPercent").text(`${mostCommonSalaryPercent}%`);
    $("#generatedSalary").text(`${mostCommonSalary.toLowerCase()}%`);
    $("#totalDesignerNum").text(selectedDesigners.length);

    //go through each person, check if they have one of top 5 skill, if yes log and move on

    //MATTER JS CATEGORIES

    //satisfactionIAmTwo
    let satisfactionIAmTwo = {};
    tallyResponses(selectedDesigners, satisfactionIAmTwo, 22);

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
      console.log(ImCurrentlyCounter, responseImCurrentlyArr.length);
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
