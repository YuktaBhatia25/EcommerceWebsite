import { useEffect } from 'react'

export const useDynamicTitle = (pageTitle, defaultTitle) => {
  useEffect(() => {
    document.title = pageTitle;
    return () => {
      document.title = defaultTitle;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTitle]);
  return null;
}
