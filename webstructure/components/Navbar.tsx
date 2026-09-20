import Link from "next/link"
export default function Navbar() {
    return (
        <>
        
         <nav className="bg-gray-700 text-white flex gap-5">
          <Link href={'/'}>Home</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/contact'}>Contact</Link>
          <Link href={'/login'}>Login</Link>
          <Link href={'/signup'}>Signup</Link>
        </nav>
        </>
    )
}