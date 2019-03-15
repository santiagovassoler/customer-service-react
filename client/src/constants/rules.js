const rules = {
  visitor: {
    static: ["home-page:visit"]
  },
  writer: {
    static: ["home-page:visit"]
      },
  admin: {
    static: [
      "home-page:visit",
      "dashboard-page:visit"
    ]
  }
};

export default rules;