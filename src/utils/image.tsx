export const generateProjectImagePaths = (
  projectSlug: string,
  imageCount: number
): string[] => {
  return Array.from(
    { length: imageCount },
    (_, index) => `/images/${projectSlug}/${projectSlug}-${index + 1}.png`
  );
};
