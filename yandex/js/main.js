const toggles = Array.from(document.getElementsByClassName('js-nav'));

function tab() {

	toggles.forEach(item => {
		item.addEventListener('click', selectToggle)
	});

	function selectToggle() {
		if (this.dataset.nav == 'burger'){
			this.classList.toggle('is-open');
			this.nextElementSibling.classList.toggle('is-open');
			document.body.classList.toggle('hidden');
		} else {
			toggles.forEach(item => {
				item.firstElementChild.classList.remove('is-open');
			});
			this.firstElementChild.classList.add('is-open');

		}
		
	}

};

tab();


function initMap() {
	// на какой контейнер навесить карту(не забудь дать ему высоту через стили)
	const mapContainer = document.getElementById('map')
	// координаты (будем использовать и для карты, и для маркера)
	const coordinates = { lat: 46.760992, lng: 36.80197 }
	// хороший зум для плейса
	const correctZoom = 13
	// создаем новую карту 
	// на наш контейнер
	// с центром в наших координатах
	// с нашим идеальным зумом
	const map = new google.maps.Map(mapContainer, {
	  center: coordinates,
	  zoom: correctZoom,
	});
	// создаем маркер
	// в точке наших координат
	// на нашей карте
	// с кастомной иконкой с нашей статики
	const marker = new google.maps.Marker({
	  position: coordinates,
	  map: map,
	  icon: '/static/img/candle.png'
	});
	// создаем инфо виндоу
	// с контентом html (не пиши html в js)(это дял быстрого примера)
	const infowindow = new google.maps.InfoWindow({
	  content: '<p class="title"> WEBCASE </p>',
	});
	// на наш маркер навешиваем прослушиватель события клик
	marker.addListener("click", () => {
	  // на клик открываем инфо виндоу созданное выше
	  // с якорем на наш маркер
	  // на нашей карте
	  infowindow.open({
		anchor: marker,
		map,
		shouldFocus: false,
	  });
	});
  }
  window.initMap = initMap





const slickOptions = {
	arrows: true,
	nextArrow: '<a class="control slick-next" ></a>',
	prevArrow: '<a class="control slick-prev" ></a>',
	dots: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	mobileFirst: true,
	responsive: [
	  {
		breakpoint: 992,
		settings: {
		  
		  slidesToShow: 2
		}
	  },
	  
	],
  }

  $('.js-slider').slick(slickOptions)
