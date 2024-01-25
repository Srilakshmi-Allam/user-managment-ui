export function initialize(config) {
    if (config && config.EXALENT_BENEFITS_API) {
        process.env.REACT_APP_EXALENT_BENEFITS_API = config.EXALENT_BENEFITS_API;
    }
}


  export * from "./pages";
  export * from "./slices";