import './App.css';
import Header from './components/Header';
import PromoText from './components/PromoText'
import Overview from './components/Overview';
import Slogan from './components/Slogan';
import Faq from './components/Faq';
import Reviews from './components/Reviews'
import Blog from './components/Blog'
import Checklist from './components/Checklist';
import Footer from './components/Footer'

function App() {
  const promoTexts = [
    ["Change.It is an exciting online ", "name changing", " service ",
    " that simplifies the process of how to change your name."],
    ["We strive to provide the very best in ",
    "automation", ",", " coupled with a personal, human touch."]
  ];

  return (
    <div className="app__container">
      <div className="app__body">
        <Header />
        <PromoText textArray={promoTexts[0]} />
        <Overview />
        <Slogan />
        <Faq />
        <PromoText textArray={promoTexts[1]}/>
        <Reviews />
        <Blog />
        <Checklist />
        <Footer />
      </div>
    </div>
  );
}

export default App;
