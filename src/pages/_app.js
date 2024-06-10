import { Boogaloo } from 'next/font/google'

const boogaloo = Boogaloo({
    weight: '400',
    subsets: ['latin'],
  })
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={boogaloo.className}>
      <Component {...pageProps} />
    </main>
  )
}