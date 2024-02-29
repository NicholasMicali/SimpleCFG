import './App.css';
import './bigButton.css';
import { Link } from 'react-router-dom';

function Header() {

  const handleDownload = () => {
    const imageUrl = './outfile.png';
    const a = document.createElement('a')
    a.href = imageUrl;
    a.download = 'outfile.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="App-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px', paddingTop: '10px', paddingBottom: '10px', paddingRight: '10px', paddingLeft: '30px', backgroundColor: 'darkcyan'}}>
      <div className="left-header" style={{ marginRight: '70px', display: 'flex' }}>
        <Link
          to="/"
          className="headLink"
          style={{color: 'white'}}
        >
          Home
        </Link>
      </div>
      <div className="middle-header" style={{ display: 'flex', gap: '25px', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link 
          to="/about"
          className="headLink"
          style={{color: 'white'}}
        >
          About
        </Link>
        <Link
          to="/example"
          className="headLink"
          style={{color: 'white'}}
        >
          Examples
        </Link>
      </div>
      <div className="right-header">
          <button className="bigButton" 
            onClick={handleDownload} 
            style={{color: 'white', fontWeight: 'bold', borderColor: 'white', padding: '10px'}}
          >
            Download Image
          </button>
      </div>
    </div>
  );
}

export default Header;