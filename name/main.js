// get name from URL
const username = window.location.search.substring(1);
if (username) {
  console.log('Username: ', username);
  getData(`../resource/json/${username}.txt`, user => {
    // add css theme
    // make random theme
    let theme = 'default';
    let themeNumber = randomNumber(1, 3);
    // themeNumber = 2;
    switch (themeNumber) {
      case 1:
        theme = 'neumorphism_grey'
        break;
      case 2:
        theme = 'neumorphism_blue'
        break;
      default:
        break;
    }
    let link = document.createElement('link');
    link.href = `../resource/theme/${theme}.css`;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';

    document.getElementsByTagName('head')[0].appendChild(link);
    // end theme
    console.log(`Name card of ${user.name}`);
    document.title = encode(user.name).toUpperCase();

    if (user.ads) {
      document.getElementById('ads').src = `../resource/ads/${user.ads}`;
    }
    if (user.logo) {
      document.getElementById('logo').src = `../resource/logo/${user.logo}`;
    }

    user.avatar = user.avatar ? user.avatar : 'default.png';
    document.getElementById('avatar').src = `../resource/avatar/${user.avatar}`;

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
    document.getElementById('vcf').href = `../resource/vcf/${user.vcf}`;
    document.getElementById('vcf').download = encode(user.name, true) + '.vcf';
  })
}

function encode(str, flg) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  if (flg) {
    str = str.replace(/ /g, '_');
  }
  return str;
}

function getData(url, cb) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(decrypt(xhttp.responseText));
      cb(JSON.parse(decrypt(xhttp.responseText)));
    }
  };
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