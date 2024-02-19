// Utility functions for section navigation
// Handler for container click, integrates other functions
export const scrollToNextSection = (sectionsData: string[]) => {
  const currentSectionIndex = findCurrentSectionIndex(sectionsData);
  const nextSectionIndex = currentSectionIndex + 1;
  scrollToSection(nextSectionIndex, sectionsData);
};

// Function to find the index of the current section in view
export const findCurrentSectionIndex = (sectionsData: string[]) =>
  sectionsData.findIndex((_, index) => {
    const sectionElement = document.getElementById(sectionsData[index]);
    if (sectionElement) {
      const { top, bottom } = sectionElement.getBoundingClientRect();
      return top < window.innerHeight && bottom > 0; // Section is in the viewport
    }
    return false;
  });

// Function to scroll to the next section based on the current section index
export const scrollToSection = (
  nextSectionIndex: number,
  sectionsData: string[]
) => {
  if (nextSectionIndex < sectionsData.length) {
    const nextSection = document.getElementById(sectionsData[nextSectionIndex]);
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });
    }
  }
};
