class Cupcake {
  constructor() {
    this.container2 = $("#container2");
    this.Form = $("#cupcakeForm");
    this.createList();
    this.postCupcake();
    this.Ul = $("<ul></ul>");
  }

  async createList() {
    let cupcakesJson = await axios.get("/api/cupcakes");
    let cupcakes = cupcakesJson.data.cupcakes;
    this.Ul.empty();
    this.container2.prepend(this.Ul);
    for (let cupcake of cupcakes) {
      let listItem = $("<li></li>");
      let cupcakeImg = $("<img>");
      cupcakeImg.attr({
        src: cupcake.image,
        alt: "cupcake",
        class: "cupcakeImg",
      });
      listItem.append(cupcakeImg);
      this.Ul.append(listItem);
    }
  }

  postCupcake() {
    this.Form.on("submit", async (evt) => {
      evt.preventDefault();
      await axios.post("/api/cupcakes", {
        flavor: $("#flavor").val(),
        size: $("#size").val(),
        rating: $("#rating").val(),
        image: $("#image").val(),
      });
      $("input").val("");
      this.createList();
    });
  }
}

new Cupcake();

// const theUl = $("#list");
// const theForm = $("#cupcakeForm");
// async function createList() {
//   theUl.empty();
//   cupcakesJson = await axios.get("/api/cupcakes");
//   cupcakes = cupcakesJson.data.cupcakes;
//   for (cupcake of cupcakes) {
//     let listItem = $("<li></li>");
//     let cupcakeImg = $("<img>");
//     cupcakeImg.attr({
//       src: cupcake.image,
//       alt: "cupcake",
//       class: "cupcakeImg",
//     });
//     listItem.append(cupcakeImg);
//     theUl.append(listItem);
//   }
// }

// function postCupcake() {
//   theForm.on("submit", async function (evt) {
//     evt.preventDefault();
//     add_cupcake = await axios.post("/api/cupcakes", {
//       flavor: $("#flavor").val(),
//       size: $("#size").val(),
//       rating: $("#rating").val(),
//       image: $("#image").val(),
//     });
//     $("input").val("");
//     createList();
//   });
// }

// (function () {
//   createList();
//   postCupcake();
// })();
