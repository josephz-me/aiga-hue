// developers.google.com/sheets/api/quickstart/js
//console.cloud.google.com/apis/credentials/oauthclient/881169780362-ii0egvl0h94gtbbs5vr9iejv7cqpc5ku.apps.googleusercontent.com?authuser=1&project=aiga-design-1615907291563
//youtube.com/watch?v=shctaaILCiU

let portfolios = [
  {
    name: "Michael Levall",
    designerType: "Game Designer",
    link: "michaellevall.com",
  },
  {
    name: "David Shaver",
    designerType: "Game Designer",
    link: "davidshaver.net",
  },
  {
    name: "Jay van Hutten",
    designerType: "Game Designer",
    link: "jayvanhutten.com",
  },
  {
    name: "Nathalie Jankie",
    designerType: "Game Designer",
    link: "nathaliejankie.nl/",
  },
  {
    name: "Nicolas Kraj",
    designerType: "Game Designer",
    link: "nicolaskraj.com",
  },
  {
    name: "Alex Coven",
    designerType: "Graphic Designer",
    link: "alexcoven.com",
  },
  {
    name: "Martijn Snapper",
    designerType: "Graphic Designer",
    link: "martijnsnapper.com",
  },
  {
    name: "Stephen Calvillo",
    designerType: "Graphic Designer",
    link: "stephencalvillodesign.com",
  },
  {
    name: "Julie Bonnemoy",
    designerType: "Graphic Designer",
    link: "juliebonnemoy.com",
  },
  {
    name: "Kevin",
    designerType: "Graphic Designer",
    link: "kevincraftdesign.com",
  },
  {
    name: "Alexandra Erkaeva",
    designerType: "Illustrator",
    link: "erkaeva.com",
  },
  {
    name: "Naomi Wilkinson",
    designerType: "Illustrator",
    link: "naomiwilkinson.co.uk/",
  },
  {
    name: "Nake Kitch",
    designerType: "Illustrator",
    link: "natekitch.com",
  },
  {
    name: "Ping Zhu",
    designerType: "Illustrator",
    link: "pingszoo.com",
  },
  {
    name: "Malika Favre",
    designerType: "Illustrator",
    link: "malikafavre.com",
  },
  {
    name: "Aileen",
    designerType: "UX/UI Designer",
    link: "aileen.co",
  },
  {
    name: "Wendy Schorr",
    designerType: "UX/UI Designer",
    link: "wendyschorr.com",
  },
  {
    name: "Zara Drei",
    designerType: "UX/UI Designer",
    link: "zaradrei.com",
  },
  {
    name: "Vera Chen",
    designerType: "UX/UI Designer",
    link: "verachen.me",
  },
  {
    name: "Ljubomir Bardžić",
    designerType: "UX/UI Designer",
    link: "ljubomirbardzic.com",
  },
  {
    name: "Adlan Ramly",
    designerType: "AR/VR Designer",
    link: "adlanramly.com",
  },
  {
    name: "Marina Roselli",
    designerType: "AR/VR Designer",
    link: "mroselli.com",
  },
  {
    name: "Tica Lin",
    designerType: "AR/VR Designer",
    link: "ticalin.com",
  },
  {
    name: "Thiébault Delaporte-Richard",
    designerType: "AR/VR Designer",
    link: "thieb.co",
  },
  {
    name: "Dominik Hofacker",
    designerType: "AR/VR Designer",
    link: "dominikhofacker.me/",
  },
  {
    name: "Quentin Moreau",
    designerType: "AR/VR Designer",
    link: "quentinmoreau.com",
  },
  {
    name: "Qian Yang",
    designerType: "AI Designer",
    link: "yangqian.myportfolio.comhome",
  },
  {
    name: "Eric Wadkins",
    designerType: "AI Designer",
    link: "ericwadkins.com",
  },
  {
    name: "Damir Kotoric",
    designerType: "AI Designer",
    link: "damirkotoric.com",
  },
  {
    name: "Nadia Piet",
    designerType: "AI Designer",
    link: "nadiapiet.com",
  },
  {
    name: "Josh Campbell",
    designerType: "AI Designer",
    link: "driftcafe.com",
  },
  {
    name: "Ethan Ye",
    designerType: "AI Designer",
    link: "ethanye.com",
  },
  {
    name: "Cheri Zhou",
    designerType: "Packaging Designer",
    link: "cherizhou.cc",
  },
  {
    name: "Kati Forner",
    designerType: "Packaging Designer",
    link: "katiforner.com",
  },
  {
    name: "Studio MPLS",
    designerType: "Packaging Designer",
    link: "studiompls.com",
  },
  {
    name: "Auge Design",
    designerType: "Packaging Designer",
    link: "auge-design.com",
  },
  {
    name: "Think Packaging",
    designerType: "Packaging ",
    link: "auge-design.com",
  },
];

const generatePortfolios = (career) => {
  console.log(career);
  for (portfolio in portfolios) {
    if (portfolios[portfolio].designerType === career) {
      console.log("matched");
      $(".responses").append(`
      <div class='profile'>
      <p>${portfolios[portfolio].name}</p>
      <a target='_blank' href='https://www.${portfolios[portfolio].link}'>${portfolios[portfolio].link}</a>
      </div>`);
    } else {
      // console.log("not found");
    }
  }
};
