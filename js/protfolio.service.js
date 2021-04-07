var gProjects = [
    {
        id: makeId(),
        name: "MinesSweeper",
        title: "Mines Sweeper",
        desc: "This is a mines sweaper game,You should be careful from the mines!!",
        imgUrl: "MinesSweeper",
        url: "myProjects/OPTIONAL DELIVERY - Sunday 2200/index.html",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: makeId(),
        name: "Touch-Nums",
        title: "Touch-Nums",
        desc: "Just counting numbers up to which level you chose ",
        imgUrl: "Touch-Nums",
        url: "myProjects/Ex-touch-nums/index.html",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: makeId(),
        name: "Ball-Board",
        title: "Ball-Board",
        desc: "This is the ball game .There are sticky spots you should be awere of that could pop and sec! ",
        imgUrl: "Ball-Board",
        url: "myProjects/ball-board-start-here/index.html",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: makeId(),
        name: "Books Shop",
        title: "Books-Shop",
        desc: "Good place to buy a new book and get some background info",
        imgUrl: "Books-Shop",
        url: "myProjects/ex-book-shop/index.html",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: makeId(),
        name: "Pacman",
        title: "Pacman",
        desc: "The old and well recognised game, with new look",
        imgUrl: "pacman",
        url: "myProjects/pacman-inClass/index.html",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    }
]



function getProjects() {
    return gProjects;
}

function getProjById(id) {
  return  gProjects.find((project)=> project.id === id);
}
