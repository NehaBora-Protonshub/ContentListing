import React from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { TextField, IconButton, InputAdornment } from "@mui/material";

const SearchBar = ({ setValue, value, setSearch, setDumData, data }) => {
  return <TextField
    placeholder="Search"
    type="text"
    variant="outlined"
    fullWidth
    size="small"
    onChange={(e) => {
      setValue(e.target.value)
      setDumData(data.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }}
    value={value}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <IconButton>
            <img
              src="https://test.create.diagnal.com/images/search.png"
              alt="back_button"
              style={{ width: 15, height: 15 }}
            />
          </IconButton>
        </InputAdornment>
      ),

      endAdornment:
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => {
            setValue("")
            setSearch(false)
            setDumData([])
          }}
        >
          <IconButton>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/High-contrast-dialog-close.svg/768px-High-contrast-dialog-close.svg.png"
              alt="back_button"
              style={{ width: 15, height: 15 }}
            />
          </IconButton>
        </IconButton>
    }}
  />
}

const App = () => {
  const [data, setData] = React.useState([]);
  const [res, setRes] = React.useState();
  const [count, setCount] = React.useState(1);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState(false);
  const [dumData, setDumData] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (res) {
      setCount(count + 1);
    }
    console.log("page count", count, res?.["total-content-items"], data.length);
    fetch(`https://test.create.diagnal.com/data/page${count}.json`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => {
        setRes(json.page);
        setData([...data, ...json.page["content-items"].content]);
      })
      .catch((err) => console.log(err));
  };



  const onImageError = (e) => {
    e.target.src = "https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png"
  }
  console.log('jsbdf', count)
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <header className="App-header">
          <AppBar position="fixed" color="transparent" style={{ backgroundImage: 'url("https://test.create.diagnal.com/images/nav_bar.png")', backgroundSize: 'contain', boxShadow: 'none' }}>
            <Toolbar style={{ minHeight: 50 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ flex: 1, padding: 0 }}
              >
                <img
                  src="https://test.create.diagnal.com/images/Back.png"
                  alt="back_button"
                  style={{ width: 15, height: 15 }}
                />
              </IconButton>
              {!search &&
                <div variant="h6" component="div" style={{ flex: 7, textAlign: 'left' }}>
                  Romantic Comedy
                </div>}
              {search &&
                <SearchBar setValue={setValue} value={value} setSearch={setSearch} setDumData={setDumData} data={data} />
              }
              {!search &&
                <IconButton sx={{ flex: 1 }} onClick={() => setSearch(true)}>
                  <img
                    src="https://test.create.diagnal.com/images/search.png"
                    alt="search_button"
                    style={{ width: 15, height: 15 }}
                  />
                </IconButton>}
            </Toolbar>
          </AppBar>
        </header>
        <InfiniteScroll
          dataLength={data?.length} //This is important field to render the next data
          next={fetchData}
          hasMore={data.length <= res?.["total-content-items"]}
          loader={dumData.length === 0 && <h4>Loading...</h4>}
          className="Scroller"
          endMessage={
            <p style={{ textAlign: "center", color: 'white' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div class="grid-container">

            {dumData.length !== 0 ? dumData?.map((item, index) => (
              <div className="Column">
                <img
                  src={`https://test.create.diagnal.com/images/${item["poster-image"]}`}
                  alt="poster_image"
                  style={{ width: "100%", height: 150 }}
                  onError={onImageError}
                />
                <p style={{ color: "white", fontSize: 15, textAlign: 'left', margin: 0 }}>{item.name}</p>
              </div>
            )) : data?.map((item, index) => (
              <div className="Column">
                <img
                  src={`https://test.create.diagnal.com/images/${item["poster-image"]}`}
                  alt="poster_image"
                  style={{ width: "100%", height: 150 }}
                  onError={onImageError}
                />
                <p style={{ color: "white", fontSize: 15, textAlign: 'left', margin: 0 }}>{item.name}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </Box>
    </div>
  );
};

export default App;
