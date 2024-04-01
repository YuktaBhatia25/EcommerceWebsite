import  { useEffect } from 'react'

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(event.target && !ref.current.contains(event.target)) {
        callback();
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
    document.addEventListener('mousedown', handleClickOutside)
  }, [ref, callback]);
}

export default useClickOutside