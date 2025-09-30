import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  if (isConnected)
    return (
      <div>
        <span>Connected: {address}</span>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );

  return (
    <div>
      {connectors.map((c) => (
        <div key={c.id} style={{ marginBottom: 8 }}>
          <button
            onClick={async () => {
              setLocalError(null);
              setConnecting(c.id);
              try {
                // use connectAsync for better error handling
                await connectAsync?.({ connector: c as any });
              } catch (err: any) {
                console.error('connect error', err);
                setLocalError(err?.message ?? String(err));
              } finally {
                setConnecting(null);
              }
            }}
            disabled={connecting != null}
          >
            {connecting === c.id ? `${c.name} (connecting...)` : c.name}
          </button>
          {!c.ready && <span style={{ marginLeft: 8, color: '#666' }}> (not ready)</span>}
        </div>
      ))}
      {(error || localError) && <div style={{ color: 'red' }}>{(localError ?? error?.message) || ''}</div>}
    </div>
  );
}
