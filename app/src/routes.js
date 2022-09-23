export default [
  {
    name: "SolNote",
    path: "/",
    component: require("@/components/PageHome").default,
  },
  {
    name: "Note",
    path: "/:note",
    component: require("@/components/PageNote").default,
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)*",
    component: require("@/components/PageNotFound").default,
  },
];
