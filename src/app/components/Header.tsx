import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl font-mono mb-2">Anant Kumar</h1>
          <h2 className="text-2xl text-gray-400 font-mono mb-4">Software Developer Engineer</h2>
        </div>
        <Image
          src="/pfp.jpeg"
          alt="Profile picture"
          width={150}
          height={150}
          className="rounded-full object-cover"
          style={{
            aspectRatio: "1/1",
            objectFit: "cover",
            objectPosition: "center 30%"
          }}
        />
      </div>

      <div className="flex space-x-4 text-2xl mb-8">
        <Link href="https://x.com/_anant_kr" className="hover:text-blue-400">
          <FaTwitter />
        </Link>
        <Link href="https://www.linkedin.com/in/anant0059/" className="hover:text-blue-600">
          <FaLinkedin />
        </Link>
        <Link href="https://github.com/anant0059" className="hover:text-gray-400">
          <FaGithub />
        </Link>
        <Link href="https://leetcode.com/anant_0059/" className="hover:text-[#FFA116]">
          <SiLeetcode />
        </Link>
      </div>

      <nav className="mb-12">
        <ul className="flex space-x-6 font-mono">
          <li><Link href="/" className="hover:underline">home</Link></li>
          <li><Link href="/blog" className="hover:underline">blog</Link></li>
          <li><Link href="/projects" className="hover:underline">projects</Link></li>
          <li><Link href="/experience" className="hover:underline">experience</Link></li>
          <li><Link href="/music" className="hover:underline">music</Link></li>
        </ul>
      </nav>
    </>
  )
}