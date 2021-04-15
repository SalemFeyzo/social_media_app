import Link from 'next/link'
import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'

const Navbar = () => {
  return (
    <nav className='bg-pink-500 text-white flex place-items-center justify-between w-screen fixed shadow-md'>
      <Link href='/'>
        <div className='pl-5 py-3 flex place-items-center cursor-pointer'>
          <Image
            src='/logo.svg'
            alt='site logo'
            className='h-4 w-7'
            width={65}
            height={60}
          />
          <span className='font-bold'>Social Media App</span>
        </div>
      </Link>
      <div className='px-3 flex place-items-center '>
        <Link href='/'>
          <a className='navLink'>Home</a>
        </Link>
        <Link href='/profile'>
          <a className='navLink text-2xl'>
            <CgProfile />
          </a>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
