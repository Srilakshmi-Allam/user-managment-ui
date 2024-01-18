export const getPathFromURL = (url) => {
  const pathParts = url.split("/").filter(Boolean); // Remove empty parts
  const path = pathParts.slice(2, 4).join("/");
  return `/${path}`;
};

export const formatDate = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${month}-${day}-${year}`;
}

