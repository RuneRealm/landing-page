/**
 * Utility functions for scrolling
 */

/**
 * Scrolls to an element with the specified ID
 * @param sectionId - The ID of the element to scroll to
 * @param options - Optional scrolling options
 */
export const scrollToSection = (
  sectionId: string, 
  options: { 
    behavior?: ScrollBehavior; 
    delay?: number;
    offset?: number;
    updateUrl?: boolean;
  } = {}
): void => {
  const { 
    behavior = 'smooth', 
    delay = 100,
    offset = 0,
    updateUrl = true
  } = options;
  
  // Update the URL if requested
  if (updateUrl) {
    // Use history API to update the URL without a full page reload
    const newUrl = sectionId === 'home' ? '/' : `/${sectionId}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior
      });
    }
  }, delay);
};

export default {
  scrollToSection
};
