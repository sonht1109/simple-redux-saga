module.exports = {
  description: "Create a container",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Container displayname:",
      default: "NewContainer",
    },
    {
      type: "confirm",
      name: "reducer",
      message: "Using reducer?",
      default: "y",
    },
    {
      type: "input",
      name: "path",
      message: "Container path from src/containers/:",
      default: "",
    },
  ],
  actions: (data) => {
    const defaultPath = `../../src/containers/${
      data?.path ? data?.path + "/" : ""
    }{{properCase name}}/`;

    const reducerPath = defaultPath + "store/";

    const defaultActions = [
      {
        type: "add",
        path: defaultPath + "index.tsx",
        templateFile: "./container/index.tsx.hbs",
        abortOnFail: true,
      },
    ];

    const reducerActions = [
      {
        type: "add",
        path: reducerPath + "actions.ts",
        templateFile: "./container/actions.ts.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: reducerPath + "constants.ts",
        templateFile: "./container/constants.ts.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: reducerPath + "reducer.ts",
        templateFile: "./container/reducer.ts.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: reducerPath + "types.ts",
        templateFile: "./container/types.ts.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: reducerPath + "index.ts",
        templateFile: "./container/store-index.ts.hbs",
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../../src/redux/root-reducers.ts",
        templateFile: "./container/modify.import-reducer.ts.hbs",
        pattern: new RegExp(/.*\[IMPORT NEW REDUCERS\].*/),
        abortOnFail: true,
      },
      {
        type: "modify",
        path: "../../src/redux/root-reducers.ts",
        templateFile: "./container/modify.combine-reducer.ts.hbs",
        pattern: new RegExp(/.*\[COMBINE NEW REDUCERS\].*/),
        abortOnFail: true,
      },
    ];

    const actions = !data?.reducer ? defaultActions : [...defaultActions, ...reducerActions];

    return actions;
  },
};
