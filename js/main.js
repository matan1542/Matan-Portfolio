console.log('Starting up');
$(document).ready(init);


function init() {
    console.log('Starting')
    renderProtfolio();
    contactMessage();
}

function renderProtfolio() {

    var projects = getProjects();
    var $elRow = $('.projects-section');
    var strPortfolio = projects.map((project) => {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" data-proj-id ="${project.id}" href="#portfolioModal1">
        <div class="portfolio-hover">
         <div class="portfolio-hover-content">
         <i class="fa fa-plus fa-3x"></i>
         </div>
          </div>
         <img  class="img-fluid" src="img/portfolio/${project.imgUrl}.png" alt="">
            </a>
        <div class="portfolio-caption">
            <h4>${project.title}</h4>
             <p class="text-muted">Photography</p>
            </div>
        </div>  `

    })

    $elRow.html(strPortfolio);
    $('.portfolio-link').click(function () {
        renderModal($(this).data('proj-id'));
    })
}


function renderModal(id) {
    var project = getProjById(id);
    const d = new Date(project.publishedAt);
    console.log();

    console.log(project);
    var strPortfolioModal =
        `    <h2>${project.title}</h2>
          <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.imgUrl}.png" alt="">
            <p> ${project.desc}</p>
            <ul class="list-inline">
                <li>Date: ${d.getMonth()}/${d.getFullYear()}</li>
             <a href="${project.url}"><span class="modal-span-color">Enter into the game: </span></span>${project.title}</a>
              
            </ul>
            <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>`

    $('.modal-body').html(strPortfolioModal);
}


function contactMessage() {
    $('.btn-contact').click(() => {
        $('.body-input').val();
        $('.subject-input').val();
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=matan8380@gmail.com&su=${$('.subject-input').val()}&body=${$('.body-input').val()}`);
        $('.body-input').val('');
        $('.subject-input').val('');
        $('.email-input').val('');
    });
}