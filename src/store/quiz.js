const INITIAL_STATE = [
  {
    id: 0,
    author: "Samet Atasever",
    description: "HTML Testi Açıklaması",
    createdAt: "11 Haziran 2020",
  },
  {
    id: 1,
    author: "Kemal Güneş",
    description: "Javascript Testi Açıklaması",
    createdAt: "10 Haziran 2020",
  },
  {
    id: 2,
    author: "Rasim Kaya",
    description: "React Testi Açıklaması",
    createdAt: "8 Haziran 2019",
  },
  {
    id: 3,
    author: "İbrahim Beyaz",
    description: "Angular Testi Açıklaması",
    createdAt: "15 Haziran 2017",
  },
];

export const quizzesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FILTER_QUIZZES":
      return state.quizzes.filter((quiz) => {
        return quiz.description
          .toLowerCase()
          .includes(action.payload.query.toLowerCase());
      });
    default:
      return state;
  }
};
