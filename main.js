window.addEventListener("load", function () {
    console.log("hi");
    let me = document.getElementById("kotet");
    let back = document.getElementById("body");
    let h = Math.floor(Math.random() * 360);
    me.style.backgroundColor = "hsl(" + h + ",70%,70%)";
});