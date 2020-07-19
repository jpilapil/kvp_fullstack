const users = [
  {
    id: "79d4fa38-403b-4c36-b86a-8356dbfc5f9a",
    handle: "bobthebuilder",
    email: "bob@gmail.com",
    password: "5F4DCC3B5AA765D61D8327DEB882CF99",
    gender: "male",
    createdAt: 1592452421714,
    rating: 1,
    techInterestedIn: [
      //array of objects, map over to display on other users!!

      {
        name: "Amazon Echo/Alexa",
        popularity: 50,
        id: 4,
      },
      {
        name: "Amazon RDS",
        popularity: 50,
        id: 5,
      },
      {
        name: "Unity",
        popularity: 40,
        id: 199,
      },
    ],
  },
  {
    id: "bbfc927c-f3d4-4cdd-b872-9cb233a194aa",
    handle: "jisoo",
    email: "jisoo@gmail.com",
    password: "EEEAC4F9D754AAF4909392BCE3FF2FF3",
    gender: "female",
    createdAt: 1592452421714,
    rating: 2,
    techInterestedIn: [
      {
        name: "JavaScript",
        popularity: 60,
        id: 1,
      },
      {
        name: ".NET Core",
        popularity: 50,
        id: 2,
      },
      {
        name: "Amazon DynamoDB",
        popularity: 50,
        id: 3,
      },
    ],
  },
  {
    id: "2f816b3d-ba4b-4381-8a72-c9f55d3b9548",
    handle: "juanito",
    email: "juan@gmail.com",
    password: "A6BBC6A4D9981A9A3AF73B9E9AF353AD",
    gender: "na",
    createdAt: 1592452421714,
    rating: 3,
    techInterestedIn: [
      {
        name: "Ruby",
        popularity: 50,
        id: 81,
      },
      {
        name: "Angular",
        popularity: 50,
        id: 8,
      },
      {
        name: "Python",
        popularity: 50,
        id: 75,
      },
    ],
  },
  {
    id: "5079fcb3-e0b9-4049-998e-46115d3105eb",
    handle: "pEscobar",
    email: "pablo@gmail.com",
    password: "BE72E1341DFEFFCDCB4889ED13E577A3",
    gender: "male",
    createdAt: 1592452421714,
    rating: 4,
    techInterestedIn: [
      {
        name: "Apache Hive",
        popularity: 50,
        id: 10,
      },
      {
        name: "Apache Spark",
        popularity: 50,
        id: 11,
      },
      {
        name: "Apple TV",
        popularity: 50,
        id: 12,
      },
    ],
  },
  {
    id: "0f933bbd-d1fb-4ad5-80f0-661c3c0aa2f8",
    handle: "lisa",
    email: "lisa@gmail.com",
    password: "63D0CEA9D550E495FDE1B81310951BD7",
    gender: "female",
    createdAt: 1593894321997,
    rating: 5,
    techInterestedIn: [
      {
        name: "JavaScript",
        popularity: 60,
        id: 1,
      },
      {
        name: "C#",
        popularity: 50,
        id: 19,
      },
      {
        name: "C++",
        popularity: 50,
        id: 20,
      },
    ],
  },
  {
    id: "1d1e31cd-eff2-47de-b46d-4d45bb2dd97f",
    handle: "kawikaLovesKpop",
    email: "kawika@gmail.com",
    password: "63D0CEA9D550E495FDE1B81310951BD7",
    gender: "male",
    createdAt: 1593894550566,
    rating: 5,
    techInterestedIn: [
      {
        name: "Swift",
        popularity: 50,
        id: 91,
      },
      {
        name: "C#",
        popularity: 50,
        id: 19,
      },
      {
        name: "C++",
        popularity: 50,
        id: 20,
      },
    ],
  },
];

export default users;
