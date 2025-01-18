import Header from './components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-white">
      <Header />
      <div className="space-y-8 font-mono">
        <p className="text-lg">
          Hi! I&apos;m Anant Kumar, a software engineer dedicated to crafting innovative solutions through software development, product development, and automation.
        </p>

        <p className="text-lg">
          I&apos;m a tech enthusiast passionate about exploring new technologies, finding creative ways to solve problems, and continuously pushing the boundaries of what&apos;s possible.
          A lover of music who can get lost and high in its essence, I believe in maintaining balance, embracing inner peace, and fostering personal growth.
          Outside the tech world, I&apos;m on a journey of self-discovery, gaining new perspectives through experiences and creative expression.
        </p>
        
        <div className="mt-12">
          <h3 className="text-2xl text-gray-400 mb-4">
            Here&apos;s my most recent posts or <Link href="/blog" className="underline hover:text-gray-300">read a random one!</Link>
          </h3>
        </div>
      </div>
    </main>
  )
}
