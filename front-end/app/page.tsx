import Link from 'next/link'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <h1>Hello World</h1>
      <Link href="/users">users</Link>
    </main>
  )
}
