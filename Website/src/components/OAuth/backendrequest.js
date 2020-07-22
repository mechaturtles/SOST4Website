var DexcomAccessTokenRequest = (authorization_code) => {
    var data = {
        client_secret: process.env.REACT_APP_DEXCOM_CLIENT_SECRET,
        client_id: process.env.REACT_APP_DEXCOM_CLIENT_ID,
        code: authorization_code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/oauth/dexcom"
    }
    const combineParams = (obj) => {
        let str = [];
        for (let p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        return str.join("&");
      }
    //var query = `client_secret=${data.client_secret}&client_id=${data.client_id}&code=${data.code}&grant_type=authorization_code&redirect_uri=${data.redirect_uri}`;    
    var query = combineParams(data);
    console.log(query);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "https://sandbox-api.dexcom.com/v2/oauth2/token");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(query);
}

export default DexcomAccessTokenRequest;