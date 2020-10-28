import React from 'react';

export default function CardButtonIcon({ pathname, isSaved }) {
  return (
    <>
      { (pathname === '/' && !isSaved) &&
        (<svg className='card-button-icon card-button-icon_bookmark'
          width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.38218 12.7137L1 16.9425V1L13 1V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z" strokeWidth="2" />
        </svg>)
      }
      { (pathname === '/' && isSaved) &&
        (<svg className='card-button-icon card-button-icon_saved'
          width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1C0 0.447715 0.447715 0 1 0H13C13.5523 0 14 0.447715 14 1V19L7 13.5L0 19V1Z" />
        </svg>)
      }
      { pathname !== '/' &&
        (<svg className='card-button-icon card-button-icon_bin'
          width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z" />
        </svg>)
      }
    </>
  )
}