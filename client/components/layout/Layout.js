import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='bg-pink-200 h-screen pt-20'>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
