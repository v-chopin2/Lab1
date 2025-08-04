function calculatePrice() {
    var s = document.getElementById("salary").value;
    var d = document.getElementById("days").value;
    console.log("Calculating price")
    console.log(s)
    console.log(d)
    let finalPrice = 0;
    dailyRate = s/365;
    finalPrice = dailyRate * d;
    document.getElementById("finalPrice").innerHTML = finalPrice;
  }