<template>

<div class="container">
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="http://www.thymeleaf.org"> Thymeleaf -
                Plain </a>
        </div>
    </div>
    <h1>Encrypt</h1>
    <input id="message"/>
    <div>
        <button id="getPublicKey">get public key</button>
    </div>

    <p id="publicKey"/>
    <div>
        <button id="encryption">encrypt</button>
    </div>
    <p id="encryptionResult"/>
    <div>
        <button id="decryption">decrypt</button>
    </div>
    <p id="decryptionResult"/>
</div>
</template>
<script>
var $ = require("jquery");
var publicKeyUrl = "http://localhost:8081/encryption-parameters";
var encryptUrl = "http://localhost:8081/encryption-data";
$("#getPublicKey").click(function(e) {
  e.preventDefault();
  $("#publicKey").text("loading...");
  $.ajax({
    url: publicKeyUrl,
    type: "GET",
    xhrFields: {
      withCredentials: true
    },
    success: function(result) {
      $("#publicKey").text(result["publicKey"]);
      if (result["publicKey"] != null && result["publicKey"] != "") {
        $("#publicKey").text(result["publicKey"]);
      }
    },
    error: function() {
      alert("error");
    }
  });
});

$("#encryption").click(function(e) {
  e.preventDefault();
  var encrypt = new JSEncrypt();
  var publicKey = $("#publicKey").text();
  encrypt.setPublicKey(publicKey);
  var msg = $("#message").val();
  var value = { cardNo: msg, idType: "2" };
  var encrypted = encrypt.encrypt(JSON.stringify(value));
  console.log(encrypted);
  $("#encryptionResult").text(encrypted);
  $.ajax({
    type: "POST",
    url: encryptUrl,
    contentType: "application/json",
    data: JSON.stringify({ encryptedData: encrypted }),
    xhrFields: {
      withCredentials: true
    },
    success: function(result) {
      console.log("successful" + result);
    }
  });
});
</script>