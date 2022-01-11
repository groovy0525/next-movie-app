export const getImagePath = (fileName: string, format = "original") => {
  return `https://image.tmdb.org/t/p/${format}${fileName}`;
};
