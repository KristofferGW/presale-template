import { useState } from 'react'
import './App.css'
import ConnectButton from './components/ConnectButton'
import Buy from './components/Buy'
import Button from './components/Button'
import Modal from './components/Modal'
import Input from './components/Input'
import Tooltip from './components/Tooltip'

function App() {
  const [openTokenomics, setOpenTokenomics] = useState(false)
  const [newsletter, setNewsletter] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between py-4">
        <h2 className="text-2xl font-bold">PuppyPepe Presale</h2>
        <div>
          <ConnectButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <section>
          <div className="rounded-lg p-6 bg-white shadow">
            <h1 className="text-3xl font-extrabold mb-2">PuppyPepe (PPUP)</h1>
            <p className="text-slate-600 mb-4">The memecoin for pet lovers and meme traders. Limited presale — buy early, claim later.</p>

            <div className="flex gap-3 items-center mb-4">
              <Button variant="primary" onClick={() => setOpenTokenomics(true)}>Tokenomics</Button>
              <Button variant="ghost" onClick={() => window.scrollTo({ top: 9999, behavior: 'smooth' })}>How to buy</Button>
            </div>

            <ul className="text-sm text-slate-700 space-y-2">
              <li>• 10% of supply reserved for liquidity</li>
              <li>• 70% sold in presale</li>
              <li>• 20% team & community</li>
            </ul>

            <div className="mt-4">
              <Tooltip text="Maximum supply is fixed at 1,000,000 PPUP">
                <span className="text-xs text-slate-500">Max Supply: 1,000,000</span>
              </Tooltip>
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-lg p-4 bg-white shadow">
              <Buy />
            </div>
          </div>
        </section>

        <aside>
          <div className="rounded-lg p-6 bg-white shadow">
            <h3 className="text-lg font-semibold mb-2">Join the pack</h3>
            <p className="text-sm text-slate-600 mb-4">Subscribe to our updates and get a reminder before the presale ends.</p>

            <div className="flex gap-2">
              <Input placeholder="you@email.com" value={newsletter} onChange={(e: any) => setNewsletter(e.target.value)} />
              <Button onClick={() => alert(`Thanks! We'll email ${newsletter}`)}>Subscribe</Button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium">Quick facts</h4>
              <div className="text-xs text-slate-600 mt-2">
                <div>Chain: Ethereum (testnets supported)</div>
                <div>Presale: live now</div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-xs text-slate-500">
        <div>Not financial advice — this is a fictional memecoin for demo purposes only.</div>
      </footer>

      <Modal open={openTokenomics} onClose={() => setOpenTokenomics(false)} title="Tokenomics">
        <div className="space-y-2">
          <div>Max supply: 1,000,000 PPUP</div>
          <div>Presale allocation: 700,000 PPUP</div>
          <div>Liquidity: 100,000 PPUP</div>
          <div>Team & community: 200,000 PPUP</div>
        </div>
      </Modal>
    </div>
  )
}

export default App
