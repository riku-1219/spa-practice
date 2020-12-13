import React, {useState, useEffect} from 'react';

const CheckBox = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefs, setPrefs] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: {
        "X-API-KEY": 'txoJHsTPn2FZJH94ezJGJ9OxKejn76ecrgOrwDlb'
      }
    })
    .then(res => res.json())
    .then(
      (data) => {
        setIsLoaded(true);
        setPrefs(data.result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
}, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {prefs.map(item => (
          <>
          <label htmlFor="check">{item.prefName}：</label>
          <input type="checkbox" id="check" onClick={setIsChecked(!isChecked)} />
          </>
        ))}
      </> 
    );
  }   
}

export default CheckBox;