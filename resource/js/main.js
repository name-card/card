// get name from URL
const username = window.location.search.substring(1);
if (username) {
  console.log('Username: ', username);
  getData(`resource/json/${username}`, user => {
    // add css theme
    // make random theme
    // cjew bidv
    // cmvf blue
    // hsfz grey
    if (!user.theme) {
      let themeNumber = randomNumber(1, 4);
      switch (themeNumber) {
        case 1:
          user.theme = 'bidv'
          break;
        case 2:
          user.theme = 'blue'
          break;
        case 3:
          user.theme = 'grey'
          break;
        default:
          user.theme = 'bidv'
          break;
      }
    }

    let link = document.createElement('link');
    link.href = `resource/theme/${user.theme}.css`;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';

    document.getElementsByTagName('head')[0].appendChild(link);
    // end theme
    // console.log(`Name card of ${user.name}`);
    document.title = encode(user.name).toUpperCase();

    if (user.ads) {
      document.getElementById('ads').src = `resource/ads/${user.ads}`;
    }
    if (user.logo) {
      document.getElementById('logo').src = `resource/logo/${user.logo}`;
    }

    user.avatar = user.avatar ? user.avatar : 'default.png';
    document.getElementById('avatar').src = `data:image;base64,${user.avatar}`;

    document.getElementById('name').innerHTML = user.name.toUpperCase();
    document.getElementById('role').innerHTML = user.role;
    document.getElementById('pos').innerHTML = user.pos;

    document.getElementById('phone_href').href = 'tel:' + user.phone_href;
    document.getElementById('phone').innerHTML = user.phone;

    document.getElementById('tel_href').href = 'tel:' + user.tel_href;
    document.getElementById('tel').innerHTML = user.tel;

    document.getElementById('email_href').href = 'mailto:' + user.email;
    document.getElementById('email').innerHTML = user.email;

    document.getElementById('address_href').href = user.address_href;
    document.getElementById('address').innerHTML = user.address;

    document.getElementById('zalo').href = user.zalo;
    document.getElementById('facebook').href = user.facebook;
    document.getElementById('website').href = user.website;
    document.getElementById('vcf').href = `resource/vcf/${user.vcf}`;
    document.getElementById('vcf').download = encode(user.name, true) + '.vcf';
  })
}

function encode(str, flg) {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
  str = str.replace(/??|??|???|???|??/g, 'I');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
  str = str.replace(/???|??|???|???|???/g, 'Y');
  str = str.replace(/??/g, 'D');
  if (flg) {
    str = str.replace(/ /g, '_');
  }
  return str;
}

function getData(url, cb) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const obj = JSON.parse(xhttp.responseText)
      // decript value
      obj.name = decrypt(obj.name)
      obj.first = decrypt(obj.first)
      obj.last = decrypt(obj.last)
      obj.role = decrypt(obj.role)
      obj.pos = decrypt(obj.pos)
      obj.phone_href = decrypt(obj.phone_href)
      obj.phone = decrypt(obj.phone)
      obj.tel_href = decrypt(obj.tel_href)
      obj.tel = decrypt(obj.tel)
      obj.email = decrypt(obj.email)
      obj.address = decrypt(obj.address)
      obj.zalo = decrypt(obj.zalo)
      obj.facebook = decrypt(obj.facebook)
      // console.log(obj);
      cb(obj);
    }
  }
  xhttp.open('GET', url, true);
  xhttp.send();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var element = document.getElementsByClassName('flip');
for (let i = 0; i < element.length; i++) {
  element[i].addEventListener('click', flip => {
    var elm = document.getElementById('card-content');
    if (elm.style.transform == "rotateY(180deg)") {
      elm.style.transform = "rotateY(0deg)";
    } else {
      elm.style.transform = "rotateY(180deg)";
    }
  })
}

function decrypt(str) {
  const result = [];
  let t;
  str.split('').map(s => {
    t = s.charCodeAt(0);
    if (t >= 48 && t <= 126) {
      result.push(String.fromCharCode(t - 1))
    } else {
      result.push(s)
    }
  })
  return result.join('');
}

function encrypt(str) {
  const result = [];
  let t;
  str.split('').map(s => {
    t = s.charCodeAt(0);
    if (t >= 48 && t <= 125) {
      result.push(String.fromCharCode(t + 1))
    } else {
      if (t !== 10) {
        result.push(s)
      }
    }
  })
  return result.join('');
}