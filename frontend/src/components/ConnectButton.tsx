import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

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
        <button key={c.id} onClick={() => connect({ connector: c })} disabled={!c.ready}>
          {c.name}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  );
}
