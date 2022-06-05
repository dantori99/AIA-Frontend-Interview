import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {

  const [images, setImages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://clear-tidal-maize.glitch.me/",
    }).then(result => {
      const entryImages = result.data.result.feed.entry;
      setImages(entryImages);
    });
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="bg-gray-700 h-1/4 w-full flex justify-center items-center flex-col">
        <a href="#" className="text-white border-b border-b-white font-bold text-4xl" onClick={() => window.location.reload()}>
          Image Search
        </a>

        <div>
          <input autoFocus className="border my-2 rounded-md text-gray-700 font-semibold px-3 py-1" type="text" id="searchQuery" onKeyUp={(e) => {
            if (e.key !== "Enter" || e.keyCode !== 13) return;
            console.log(this)
            setIsSearching(true);
            axios({
              method: "post",
              url: "https://clear-tidal-maize.glitch.me/search",
              data: {
                submitSearch: document.getElementById("searchQuery").value
              }
            }).then(result => {
              const data = JSON.parse(result.data.result.text)
              const imageData = data.photos.photo.map(i => `https://live.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`);
              setImages(imageData);
            });
          }} />
        </div>

        <div className="text-sm text-gray-400">
          hit enter to search
        </div>

      </div>
      
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3">

        {!isSearching ? (
          images.map((img, index) => {
            const imageData = img?.content[0]?._;
            const imageSrc = imageData?.slice(imageData?.indexOf("src=") + 5, imageData?.indexOf("width") - 2);
            return (
              <img src={imageSrc} className="w-96 h-48 object-fill mx-auto" key={index} />
            )
          })
        ) : images.map((img, index) => {
          return (
            <img src={img} className="w-96 h-48 object-fill mx-auto" key={index} />
          )
        })}

      </div>
    </div>
  );
}

export default App;
