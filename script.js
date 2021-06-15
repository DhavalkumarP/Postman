console.log('PostMan');
var i = 0;
let j = 0;
let para1 = document.getElementById('para1');
para1.style.display = 'none';
let RJSON = document.getElementById('RJSON');
let JSONS = document.getElementById('JSON');
let CustomPara = document.getElementById('CustomPara');
JSONS.addEventListener('click', () => {
    para1.style.display = 'none';
    RJSON.style.display = 'block';
})
CustomPara.addEventListener('click', () => {
    para1.style.display = 'block';
    RJSON.style.display = 'none';
})
let plus = document.getElementById('plus');
plus.addEventListener('click', (e) => {
    i += 1;
    // for (let index = 1; index <=i; index++) {
    str = `<div class="row g-3" id="minubtn${i + 1}">
        <legend class="col-form-label col-sm-2 pt-0">Parameter${i + 1} :</legend>
        <div class="col-md-6" style="width: 320px;">
            <input type="text" class="form-control" id="key${i + 1}" placeholder="key${i + 1}">
        </div>
        <div class="col-md-6 mx-3" style="width: 320px;">
            <input type="text" class="form-control" id="value${i + 1}" placeholder="value${i + 1}">
        </div>
        <div class="col-md-6 mx-3" style="width: 320px;">
            <button type="button" id="btn${i + 1}" onclick="minus(('minu'+this.id))" class="btn btn-primary minus"> - </button>
        </div>
    </div>`
    // e.preventDefault();
    let x = document.createElement('div');
    x.setAttribute('id', `param${i + 1}`);
    x.innerHTML = str;
    para1.append(x);
    // }

})

function minus(id) {
    document.getElementById(id).remove();
    j += 1;
    if (j == i) {
        i = 0;
        j = 0
    }
}

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {


    let get = document.getElementById('GET');
    let post = document.getElementById('POST');
    if (get.checked) {
        let url = document.getElementById('url').value;
        var response = document.getElementById('response');

        console.log(url);
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            //    console.log(data);
            let result = JSON.stringify(data);
            response.innerHTML = result;
        })
    }
    else if(post.checked){
        let url = document.getElementById('url').value;
        var response = document.getElementById('response');
        if(JSONS.checked){
            let data = document.getElementById('JSONText').value;
        }
        else if(CustomPara.checked){
            // var data ={}
            
            // var ii=0;
            // while(((document.getElementById('key' + (ii + 1)).value) && (document.getElementById('value' + (ii + 1)).value)) !=undefined){
            //     // data[keys = val];
            //     var keys = document.getElementById('Key' + (ii + 1)).value;
            //     var val = document.getElementById('value' + (ii + 1)).value;
            //     console.log(ii)
            //     console.log(keys);
            //     console.log(val);
            //     data[keys] = val;
            //     data=JSON.stringify(data)
            //     ii++;
            // }

            var data = {};
            let index=0;
            while (index<i+1) {
                    if(document.getElementById(`key${index + 1}`) != undefined)
                    {
                        let key = document.getElementById(`key${index + 1}`).value;
                        let value = document.getElementById(`value${index + 1}`).value;
                        data[key] = value;
                        console.log(key);
                        console.log(value);
                        // console.log(data);
                        index++;
                        
                    }
                }
                data=JSON.stringify(data);
            console.log(data);
        }
        params = {
            method: 'post',
            headers: {
                'Containt-Type': 'application/json'
            },
            body: data
        }
        fetch(url, params).then((response) => {
            return (response.json());
        }).then((data) => {
            let result = JSON.stringify(data);
            console.log(data);
            response.innerHTML = result;
        })
    }
})