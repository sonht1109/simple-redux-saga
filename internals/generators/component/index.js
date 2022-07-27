module.exports = {
  description: "Create a component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Component displayname:",
      default: "NewComponent",
    },
    {
      type: "input",
      name: "path",
      message: "Component path from src/components/:",
      default: "",
    },
  ],
  actions: (data) => {
    const path = `../../src/components/${
      data?.path ? data?.path + "/" : ""
    }{{properCase name}}/`;
    return [
      {
        type: "add",
        path: path + "index.ts",
        templateFile: "./component/index.ts.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: path + `{{properCase name}}.tsx`,
        templateFile: "./component/component.tsx.hbs",
        abortOnFail: true,
      },
    ];
  },
};
