import React from 'react'

function Whatsapp() {
  return (
    <div className=' z-[10000] fixed bottom-[24%] bg-orange-500 w-[3rem] hover:w-[5rem] transition-all ease-in-out right-0 rounded-l-2xl'>
          <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/9522582422?text=Hey%20Waltzify,%20We%20need%20your%20help..."
        >
            <img className='p-1 w-[3rem]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png" alt=""/>
        </a>
    </div>
  )
}

export default Whatsapp