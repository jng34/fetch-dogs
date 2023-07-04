import { useState } from 'react';

function Home() {
  const [dogs, setDogs] = useState(null);

  return (
    <div>
      <header>
        Home of Fetch Dogs!
      </header>
    </div>
  )
}


export default Home;