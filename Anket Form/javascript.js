//Sayfa yüklendiğinde yapılacak işlem
document.addEventListener("DOMContentLoaded", function() {
  var addFormDiv = document.getElementById("addFormDiv");
  var anketcontainer = document.getElementById("anketcontainer");
  var fillForm = document.getElementById("fillForm");

  if (addFormDiv && anketcontainer) {
    anketcontainer.style.display = "none";
    fillForm.style.display = "none";
  }
});

//Soru ekle butonuna basıldığında dropdown type değerini alıyor
function SelectType(type,dtId){
    var toggle = document.getElementById(dtId);
    toggle.innerText = type;
}

//Etiket Ekle butonuna basıldığı zaman input ve dropdown ekler ve değerlerin dolu olup olmadığını kotrol eder.
document.getElementById("AddQuestion").addEventListener("click", function() {

  var typeButton=document.getElementsByClassName("dropdown-toggle");
  var textboxes=document.getElementsByClassName("formTextBox");
  var errordiv = document.getElementById("errorDiv");
  var inputBoxes = document.querySelectorAll('.input-box');
  var lastInputBox = inputBoxes[inputBoxes.length - 1];

  //değer seçilmeyen dropdown sayısını almak için değişken tanımlandı
  var notSelected=0;
    //Dropdown değerlerinin doluluğunu kontrol eder.
    for (var i = 0; i < typeButton.length; i++) {
        var typeButtonValue = typeButton[i].textContent;
        if(typeButtonValue.includes("Seç"))
        {
          notSelected++;
            errordiv.textContent="Tüm değerleri doldurun.";
        }
    }

    //İnput değerlerinin doluluğunu kontrol eder.
    for (var i = 0; i < textboxes.length; i++) {
      var textboxValue=textboxes[i].value;
      if(textboxValue.length < 1)
      {
        notSelected++;
        errordiv.textContent="Tüm değerleri doldurun.";
      }
    }
    
    //İnput ve Dropdown değerlerini ekler.
    if(notSelected < 1)
    {
      var errordiv = document.getElementById("errorDiv");
      errordiv.textContent=" ";
      var newInputBox = document.createElement('div');
      newInputBox.classList.add('input-box');
      newInputBox.innerHTML = `
        <input type="text" class="formTextBox" name="name" id="name" placeholder="Etiket Giriniz" autocomplete="off">
        <div class="dropdown">
          <button id="dt${inputBoxes.length + 1}" class="btn btn-outline-primary dropdown-toggle formType" type="button" data-bs-toggle="dropdown" aria-expanded="false">Tip Seçin</button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button" onclick="SelectType('Text','dt${inputBoxes.length + 1}')">Text</button></li>
            <li><button class="dropdown-item" type="button" onclick="SelectType('Select','dt${inputBoxes.length + 1}')">Select</button></li>
            <li><button class="dropdown-item" type="button" onclick="SelectType('Number','dt${inputBoxes.length + 1}')">Number</button></li>
            <li><button class="dropdown-item" type="button" onclick="SelectType('Password','dt${inputBoxes.length + 1}')">Password</button></li>
          </ul>
        </div>`;

        lastInputBox.parentNode.insertBefore(newInputBox, lastInputBox.nextSibling);
    }

        console.log(notSelected);
});

//Kaydet butonuna basıldığında input ve dropdown'a girilen verileri console ekranına yazdırıyor.
var data = []; 
// İnput ve Dropdown değerlerini kaydetmek için boş bir dizi oluşturuldu

document.getElementById("gonder").addEventListener("click", function() {

  var inputBoxes = document.querySelectorAll('.input-box');
  var typeButton = document.getElementsByClassName("dropdown-toggle");
  var textboxes = document.getElementsByClassName("formTextBox");
  var errorDiv = document.getElementById("errorDiv");

  // Değer seçilmeyen dropdown sayısını almak için değişken tanımlandı
  var notSelected = 0;
  
  //Dropdown değerlerinin doluluğunu kontrol eder.
  for (var i = 0; i < typeButton.length; i++) {
    var typeButtonValue = typeButton[i].textContent;
    if (typeButtonValue === "Tip Seçin") {
      notSelected++;
    }
  }

  //İnput değerlerinin doluluğunu kontrol eder.
  for (var i = 0; i < textboxes.length; i++) {
    var textboxValue = textboxes[i].value;
    if (!textboxValue) {
      notSelected++;
    }
  }

  if (notSelected > 0) {
    errorDiv.textContent = "Tüm alanları doldurun.";
  } 
  else{
    //İnput ve Dropdown verilerini data dizisine ekliyor
    inputBoxes.forEach(function(inputBox,index) {
      var input = inputBox.querySelector('input');
      var dropdownButton = inputBox.querySelector('.dropdown-toggle');
      var dropdownValue = dropdownButton ? dropdownButton.innerText : null;
      var dropdown = dropdownValue !== 'Tip Seçin' ? dropdownValue : null;
      
      var question = {
        input: input.value,
        dropdown: dropdown
      };
  
      data.push(question); // Yeni soruyu data dizisine ekliyoruz
  
      //Form Ekle sayfasında başlık inputundaki değeri listele sayfasındaki span'a eklemektedir.
      if (index === 0) {
        var anket1 = document.getElementById('anket1');
        if (anket1) {
          var inputValue = input.value;
          var shortenedValue = inputValue.length > 10 ? inputValue.substring(0, 10) + '.' : inputValue;
          anket1.querySelector('span').innerText = shortenedValue;
        }
      }
    });
    console.log(data); // Tüm verileri konsola yazdırıyoruz
  
    //Form Ekle sayfasını gizleyip Form Listele sayfasını ekranda göstermektedir.
    var addFormDiv = document.getElementById("addFormDiv");
    var anketcontainer = document.getElementById("anketcontainer");
  
    if (addFormDiv && anketcontainer) {
      addFormDiv.style.display = "none";
      anketcontainer.style.display = "block";
    }
  }
}); 

//Form Listele sayfasındaki Ekle butonuna basıldığında Form Ekle sayfasına geçiş yapmaktadır.
document.getElementById("editForm").addEventListener("click", function() {
  // addFormDiv sayfasını görünür yap
  document.getElementById("addFormDiv").style.display = "block";
  
  // anketcontainer sayfasını gizle
  document.getElementById("anketcontainer").style.display = "none";
  
  // Tüm input değerlerini sıfırla
  var inputElements = document.getElementsByTagName("input");
  for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].value = "";
  }
  
  // Tüm dropdown değerlerini sıfırla
  var dropdownButtons = document.getElementsByClassName("dropdown-toggle");
  for (var i = 0; i < dropdownButtons.length; i++) {
    dropdownButtons[i].innerText = "Tip Seçin";
  }
});

//Sil butonuna basıldığında alert mesajı ile uyarıp sonra silme işlemini yapıyor.
var deleteButtons = document.getElementsByClassName('delete');

Array.from(deleteButtons).forEach(function(deleteButton) {
  deleteButton.addEventListener('click', function() {
    var confirmation = confirm("Anket formunu silmek istediğinize emin misiniz?");
    
    if (confirmation) {
      alert("Anket silindi!");
      var anketDiv = this.parentNode;
      anketDiv.remove(); // Anket div'inin silinmesi
    } else {
      // İptal işlemi
      return;
    }
  });
});


//Düzenle butonuna basıldığında yapılacak olan işlemler
document.getElementById("edit").addEventListener("click", function() {
    // addFormDiv sayfasını görünür yap
  document.getElementById("addFormDiv").style.display = "block";
  
  // anketcontainer sayfasını gizle
  document.getElementById("anketcontainer").style.display = "none";
});

//Doldur butonuna basıldığında yapılacak olan işlemler
document.getElementById("fill").addEventListener("click", function() {
  // fillForm sayfasını görünür yap
  document.getElementById("fillForm").style.display = "block";

  // anketcontainer sayfasını gizle
  document.getElementById("anketcontainer").style.display = "none";

  // İlk veriyi form class'ına span olarak ekleme işlemini yapar
  var firstInputValue = data[0].input; // Dizinin ilk input değerini alır
  var fillDiv = document.querySelector('.fill'); // fill class'ına sahip div elemanını seçer

  var spanElement = document.createElement('span'); // Yeni bir span elementi oluşturur
  spanElement.textContent = firstInputValue; // Span elementinin içeriğini ilk input değeriyle dolduruyor

  fillDiv.appendChild(spanElement); // Span elementini fill div'inin içine ekliyor

  for (var i = 1; i < data.length; i++) {
    var inputValues = data[i].input;
    var dropdownValue = data[i].dropdown;

    // Yeni fill-box divini oluşturuyor
    var fillBox = document.createElement("div");
    fillBox.classList.add("fill-box");

    // Yeni span öğesini oluşturuyor
    var spanElement = document.createElement("span");
    spanElement.textContent = inputValues + ": ";

    // Yeni input öğesini oluşturuyor
    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", dropdownValue);

    // fill-box içine span ve input öğelerini ekliyor
    fillBox.appendChild(spanElement);
    fillBox.appendChild(inputElement);

    // fillForm içine fill-box öğesini ekliyor
    var fillButton = document.querySelector(".fillButton");
    fillForm.insertBefore(fillBox, fillButton);
  }

  // fillForm içine fillButton öğesini ekliyor
  fillForm.insertBefore(fillButton, fillForm.lastElementChild);
});

// fillForm içerisinde ki fillButton id'li Doldur butonuna bakıldığında alert mesajı verecek.
document.getElementById("fillButton").addEventListener("click", function() {
  alert('Form kaydetme işleminiz başarıyla oluşturuldu.');
});

//Listele sayfası Örnek Tasarım Düzenle butonu
var editButtons = document.getElementsByClassName('edit');

Array.from(editButtons).forEach(function(editButton) {
  editButton.addEventListener('click', function() {
    alert("Örnek Liste tasarımıdır! \nDeğer bulunmadığından düzenleme yapılamamaktadır.");
  });
});

//Listele sayfası Örnek Tasarım Doldur butonu
var fillButtons = document.getElementsByClassName('btnfill');

Array.from(fillButtons).forEach(function(fillButton) {
  fillButton.addEventListener('click', function() {
    alert("Örnek Liste tasarımıdır! \nDeğer bulunmadığından form doldurulamamaktadır.");
  });
});
