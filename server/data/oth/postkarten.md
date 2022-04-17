# Postkarten

<div id="container" class="img-gallery">

</div>

<script>
    let container = document.getElementById("container");
    let cards = [
        "01-front.png",
        "01-back.png",
        "02-front.png",
        "02-back.png",
        "03-front.png",
        "03-back.jpg",
        "04-front.png",
        "04-back.png",
        "05-front.png"
    ];
    for (let card of cards) {
        let filename = "/postcards/card-" + card;
        let img = document.createElement("div");
        img.classList.add("img-gallery-item");
        img.setAttribute("data-img", filename);
        img.setAttribute("data-caption", card);
        container.appendChild(img);
    }
</script>