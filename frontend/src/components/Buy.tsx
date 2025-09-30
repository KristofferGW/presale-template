import { useState } from 'react';
import presaleAbi from '../abis/presale.json';
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import Input from './Input';
import Button from './Button';
import Modal from './Modal';

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
  const { write, isLoading: isBuying, isSuccess, data: txData } = useContractWrite(config);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // show modal when buy succeeds
  if (isSuccess && !confirmOpen) setConfirmOpen(true);

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
    <div className="buy-card border p-4 rounded-md max-w-md">
      <h3 className="text-lg font-semibold">Presale</h3>
      <div className="mb-3">
        <div className="h-2 bg-slate-200 rounded overflow-hidden">
          <div style={{ width: `${progress}%` }} className="h-full bg-blue-400" />
        </div>
        <div className="text-xs mt-2">{progress}% raised — {weiToEth(totalRaised as any)} / {weiToEth(hardCap as any)} ETH</div>
      </div>

      <div className="mb-3">Price: {price}</div>

      <div className="flex gap-2 mb-3">
        <Input value={ethAmount} onChange={(e: any) => setEthAmount(e.target.value)} />
        <Button variant="primary" onClick={() => write?.()} disabled={!isConnected || !write || isBuying || !active}>
          {isBuying ? 'Buying...' : 'Buy'}
        </Button>
      </div>

      <div className="text-xs">Your contribution: {weiToEth(contribution as any)} ETH</div>

      {!active && <div className="text-orange-600 mt-2">Sale is not active</div>}

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Buy confirmed">
        <div>Purchase transaction submitted.</div>
        <div className="mt-2 text-xs">Tx: {txData ? String((txData as any).hash ?? (txData as any).request?.hash) : '—'}</div>
      </Modal>
    </div>
  );
}
