const burger = Array.from(document.getElementsByClassName('js-burger'))[0];
burger.addEventListener('click', () => {
	burger.classList.toggle('is-open');
	burger.nextElementSibling.classList.toggle('is-open');
	document.body.classList.toggle('hidden');
});


let video = Array.from(document.getElementsByClassName('js-play'))[0];
const play = Array.from(document.getElementsByClassName('js-play'))[1];
play.addEventListener('click', () => {
	play.classList.add('hiden');
	video.innerHTML = '<iframe class="page__bg-img" src="https://www.youtube.com/embed/DppVAQqaNE4?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&loop=1&playlist=DppVAQqaNE4&start=0 " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
});


const endDate = new Date(2022, 02, 01);
function getTimer () {
	const startDate = new Date();
	let days = Math.floor((endDate-startDate)/1000/60/60/24);
	let hours = Math.floor((endDate-startDate)/1000/60/60) % 24;
	let minutes = Math.floor((endDate-startDate)/1000/60) % 60;
	let seconds = Math.floor((endDate-startDate)/1000) % 60;
	if(seconds < 10) seconds ='0' + seconds;
	if(minutes < 10) minutes ='0' + minutes;
	if(hours < 10) hours ='0' + hours;
	if(days < 10) days ='0' + days;
	days = '<li class="timer__item">'+ days +'<span class="timer__sub-item">days</span></li><li class="timer__item">'+ hours +'<span class="timer__sub-item">hours</span></li><li class="timer__item">' +minutes +'<span class="timer__sub-item">minutes</span></li><li class="timer__item">'+ seconds +'<span class="timer__sub-item">secons</span></li>';
	document.getElementById('timer').innerHTML = days;	
	};
getTimer ();
window.setInterval(getTimer, 1000);





const slickHeadliner = {
	arrows: true,
	nextArrow: '<a class="control slick-next" ></a>',
	prevArrow: '<a class="control slick-prev" ></a>',
	
	slidesToShow: 1,
	slidesToScroll: 1,
	mobileFirst: true,
	responsive: [
	  {
		breakpoint: 1200,
		settings: {
		  
		  slidesToShow: 3
		}
	  },
	  
	],
  }
  const slickSponsor = {
	arrows: false,
	dots: true,
	slidesToShow: 2,
	slidesToScroll: 1,
	mobileFirst: true,
	responsive: [
	  {
		breakpoint: 1200,
		settings: {
		  
		  slidesToShow: 6
		}
	  },
	  
	],
  }

  $('.js-headliner').slick(slickHeadliner)
  $('.js-sponsor').slick(slickSponsor)



document.addEventListener('DOMContentLoaded', () => {
	let up = Array.from(document.getElementsByClassName('js-up'))[0];
    window.onscroll = () => {
        if (window.pageYOffset > 400) {
            up.style.display = 'block'
        } else {
            up.style.display = 'none'
        }
    }
    up.addEventListener('click', () => {
        window.scrollBy({
            top: -document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
  // ищем все формы
  const forms = Array.from(document.getElementsByClassName('js-form-ajax'))
  // идем по ним
  forms.forEach(form => {
    // создаем новый инстанс валидатора, подвязав в него нашу форму
    const validator = new Validator(form, async function (err, is_valid) {
      // если форма валидна
      if (is_valid) {
        // берем метод с дата-атрибута
        const method = form.dataset.method
        // берем ссылку с дата-атрибута
        const action = form.dataset.action
        // получаем все с полей в виде форм даты
        const body = new FormData(form)
        // преобразовываем в JSON, смотря, что хочет сервер
        const value = Object.fromEntries(body.entries());
        // создаем запрос на тот action, что нашли
        const response = await fetch(action, {
          // с тем методом, что нашли. Сокращенная запись method
          method: method,
          // так надо
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          // превращаем наш обьект с данными в строку. так надо
          body: JSON.stringify(value),
        });
        // если все ок
        if (response.ok) {
          // проверяем что нам ответил сервер
          let result = await response.json();
          form.reset()
        }
      }
    })
  })
})

