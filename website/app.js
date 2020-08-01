/* Global Variables */
const zipInput = document.querySelector('#zip');
const generateButton = document.querySelector('#generate');
const feelingsInput = document.querySelector('#feelings');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
const apiKey = 'b8aa97ae33c5142d6a4e2a1269bf036a';
const countryCode = 'us'
const postedData = {}

// postData fuction to send data to server 
const postData = async (url = '', data = {}) => {
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match the content type header
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// fetch data from the openweathermap api 
// then send it to the server with the other two pieces of data
// so postedData object has three pieces date, feelings, temperature
// after posting data successfull retrieve it and update the UI
const getTemp = (zipCode) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`;

    fetch(url)
        .then((resp) => { return resp.json() }) // Convert data to json
        .then((data) => {
            // add temperature to postedData object
            postedData['temperature'] = data.main.temp;
            // console.log(postedData);
        }).then(() => {
            // send postedData object to the server
            postData('/postData', postedData);
        }).then(() => {
            fetch('/getData')
                .then((respo) => { return respo.json() })
                .then((dat) => {
                    console.log(dat);
                    date.innerHTML = `<p> date: ${dat.date} </p>`;
                    content.innerHTML = `<p> feeling: ${dat.feelings} </p>`;
                    temp.innerHTML = `<p> temperature: ${dat.temperature} Fahrenheit </p>`;
                })
        })
        .catch(() => {
            // catch any errors
        });

}

// event listener function to get zipcode value and fetch data with it
const getZipCode = (e) => {
    let zip = zipInput.value;
    let feelings = feelingsInput.value;
    getTemp(zip);
    postedData['feelings'] = feelings;
    postedData['date'] = newDate;
};

// get temprature data when generate button is clicked
generateButton.addEventListener('click', getZipCode);




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();