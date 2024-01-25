

export const initialize = async (config) => {
    // Override environment variables with config values
    process.env = { ...process.env, ...config };
}


export async function getReducers() {
    const slices = await import("./slices");
    return slices;
}
  
export async function getPages() {
    const pages = await import("./pages");
    return pages;
}
  