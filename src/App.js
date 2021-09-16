import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Corona from './components/Corona';
import Weather from './components/Weather'
import Stock from './components/Stock';

function App() {
  return (
    <div className="App">
      <Header />

      <nav></nav>
      <section>
        <article className="article_box corona">
          <Corona />
        </article>
        <article className="article_box weather">
          <Weather />
        </article>
        <article className="article_box stock">
          <Stock />
        </article>
      </section>

      <Footer />
    </div>
  );
}

export default App;
