import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import { fetchText } from "./api";
import { fetchVideo } from "./api";
import { fetchFlowerObject } from "./api";

function Header() {
  return (
    <header className="hero card-header">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-info">Flower Image</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="Flower Image" />
        </figure>
      </div>
    </div>
  );
}


function Text(props) {
  return (
    <figure className="text">
      <p>{props.src}</p>
    </figure>
  );
}

function Video(props) {
  return (
    <div className="card">
      <div className="card-video">
        <figure className="video">
          <video src={props.src} alt="Flower video" autoplay muted playsinline/>
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url.img} />
            <Text src={url.text} />
            <Video src={url.video} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { flower } = event.target.elements;
    props.onFormSubmit(flower.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="flower" defaultValue="sakura">
                <option value="sakura">sakura</option>
                <option value="sumire">sumire</option>
                <option value="tutuji">tutuji</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Main() {
  // const [imageURL, setImageURL] = useState(null);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchFlowerObject("sakura").then((objURLs) => {
      objURLs.map(obj => {
        setUrls(url => ([
          ...url, 
          {
            img: obj.image,
            text: obj.text,
            video: obj.video
          }
        ]));
      });
    });
  }, []);

  function reloadImages(flower) {
    fetchImages(flower).then((imgURLs) => {
      imgURLs.map((img) => {
        urls.push({ img: img });
      });
      setUrls(urls);
    });
    setUrls(urls);
  }

  function reloadText(flower) {
    fetchImages(flower).then((textURLs) => {
      textURLs.map((text) => {
        urls.push({ text: text });
      });
      setUrls(urls);
    });
  }

  function reloadVideo(flower) {
    fetchImages(flower).then((videoURLs) => {
      videoURLs.map((video) => {
        urls.push({ video: video });
      });
      setUrls(urls);
    });
  }

  // function reloadText(flower) {
  //   fetchText(flower).then((urls) => {
  //     setUrls(urls);
  //   });
  // }

  // function reloadVideo(flower) {
  //   fetchVideo(flower).then((urls) => {
  //     setUrls(urls);
  //   });
  // }

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>My Flower Image Gallery</p>
        <p>
          <a href="https://example.com">Home Page</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
