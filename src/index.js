import * as pages from "./pages";
import * as reducers from "./slices";

export const initialize = async (config) => {
    // Override environment variables with config values
    process.env = { ...process.env, ...config };
}


export const getPages = () => {
  return pages;
};

export const getReducers = () => {
    return reducers;
  };

