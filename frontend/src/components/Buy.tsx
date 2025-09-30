import { useState } from 'react';
import presaleAbi from '../abis/presale.json';
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther, formatEther } from 'viem';

const PRESALE_ADDRESS = import.meta.env.VITE_PRESALE_ADDRESS as string | undefined;

function weiToEth(n?: bigint | number | string) {
  if (n === undefined) return '0';
  try {
    return formatEther(BigInt(n as any));
  } catch (e) {
    return '0';
  }
}

export default function Buy() {
  const { address, isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState('0.1');

  if (!PRESALE_ADDRESS) {
    return <div>Please set VITE_PRESALE_ADDRESS in your .env to interact with the presale.</div>;
  }

  const { data: rate } = useContractRead({ address: PRESALE_ADDRESS as any, abi: presaleAbi as any, functionName: 'rate' });
  const { data: totalRaised } = useContractRead({ address: PRESALE_ADDRESS as any, abi: presaleAbi as any, functionName: 'totalRaised' });
  const { data: hardCap } = useContractRead({ address: PRESALE_ADDRESS as any, abi: presaleAbi as any, functionName: 'hardCap' });
  const { data: contribution } = useContractRead({ address: PRESALE_ADDRESS as any, abi: presaleAbi as any, functionName: 'contributions', args: [address ?? '0x0000000000000000000000000000000000000000'] });
  const { data: active } = useContractRead({ address: PRESALE_ADDRESS as any, abi: presaleAbi as any, functionName: 'isActive' });

  // prepare write (buy) with value
  const { config } = usePrepareContractWrite({ address: PRESALE_ADDRESS as any, abi: presaleAbi as any, functionName: 'buy', value: ethAmount ? parseEther(ethAmount) : 0n } as any);
  const { write, isLoading: isBuying } = useContractWrite(config);

  const progress = (() => {
    try {
      const t = totalRaised ? BigInt(totalRaised as any) : 0n;
      const h = hardCap ? BigInt(hardCap as any) : 0n;
      if (h === 0n) return 0;
      return Number((t * 100n) / h);
    } catch (e) {
      return 0;
    }
  })();

  const price = (() => {
    try {
      // rate is tokens per 1 ETH (1e18). Show tokens per ETH by dividing rate / 1e18
      if (!rate) return '—';
      const r = BigInt(rate as any);
      // convert to a human readable token per ETH assuming token has 18 decimals
      return (Number(r) / 1e18).toFixed(2) + ' token/ETH';
    } catch (e) {
      return '—';
    }
  })();

  return (
    <div className="buy-card" style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, maxWidth: 480 }}>
      <h3>Presale</h3>
      <div style={{ marginBottom: 8 }}>
        <div style={{ height: 10, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#60a5fa' }} />
        </div>
        <div style={{ fontSize: 12, marginTop: 6 }}>{progress}% raised — {weiToEth(totalRaised as any)} / {weiToEth(hardCap as any)} ETH</div>
      </div>

      <div style={{ marginBottom: 8 }}>Price: {price}</div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} />
        <button onClick={() => write?.()} disabled={!isConnected || !write || isBuying || !active}>
          {isBuying ? 'Buying...' : 'Buy'}
        </button>
      </div>

      <div style={{ fontSize: 12 }}>
        Your contribution: {weiToEth(contribution as any)} ETH
      </div>

      {!active && <div style={{ color: 'orange', marginTop: 8 }}>Sale is not active</div>}
    </div>
  );
}
