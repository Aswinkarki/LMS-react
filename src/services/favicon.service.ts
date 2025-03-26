export const setFavicon = (url: string): void => {
    const existingLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const link = existingLink || document.createElement('link');
  
    link.rel = 'icon';
    link.href = url;
  
    if (!existingLink) {
      document.head.appendChild(link);
    }
  };
  