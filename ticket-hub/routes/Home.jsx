import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <>
      <h1>Ticket Hub</h1>
      <Link to="/order" className="btn btn-outline-secondary">Place an Order</Link>
    </>
  )
}