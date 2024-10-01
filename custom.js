// For Main Slider
$('.main-slider').owlCarousel({
    loop: true,
    margin: 0, 
    dots:true, 
    animateOut: 'fadeOut', 
    autoplay: true,   
    autoplayHoverPause: true,
    items: 1,
    nav: false 
    });
    
    // For News slider
    $('.news-slide').owlCarousel({
      loop: true,
      margin: 0,
      dots:false,
      autoplay: true,
      animateOut: 'fadeOut',
      items: 1,
      nav: true
      });
    
    // For Event Slide
      $('.event-slide').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        dots:false,
        nav: true,
        autoplayTimeout: 2500,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            1199: {
                items: 3
            }
        }
    });
    $(".event-slide .owl-prev").html(' <i class="fas fa-arrow-circle-left"></i>');
    $(".event-slide .owl-next").html(' <i class="fas fa-arrow-circle-right"></i>');
    
    // For Gallery Slide
    $('.gallery-slide').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        dots:false,
        nav: true,
        autoplayTimeout: 2500,
        responsive: {
            0: {
                items: 1
            },
            767: {
                items: 2
            },
            1199: {
                items: 3
            }
        }
    });
    $(".gallery-slide .owl-prev").html(' <i class="fas fa-arrow-circle-left"></i>');
    $(".gallery-slide .owl-next").html(' <i class="fas fa-arrow-circle-right"></i>');
    
    // For photo slide
    $('.photos-slide').owlCarousel({
        loop: true,
        margin: 18,
        autoplay: false,
        dots:true,
        nav: true,
        autoplayTimeout: 2500,
        responsive: {
            0: {
              nav: false,
                items: 1
            },
            767: {
              nav: false,
                items: 2
            },
            1199: {
              nav: false,
                items: 3
            },
            1366: {
                items: 4
            }
        }
    });
    $(".our-junction-slide .owl-prev").html(' <i class="fas fa-arrow-circle-left"></i>');
    $(".our-junction-slide .owl-next").html(' <i class="fas fa-arrow-circle-right"></i>');
    
    // Scroll top top
    $(window).scroll(function(){ 
    if ($(this).scrollTop() > 500) {  
    $('.scrollup').fadeIn();
    } else {   
    $('.scrollup').fadeOut(); 
    }
    });  
    $('.scrollup').click(function(){ 
    $("html, body").animate({ scrollTop: 0 }, 900);
    return false;
    }); 
    
    // For sticky navbar 
    window.onscroll = function() {myFunction()};
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
    
    // For custom search 
    $(document).ready(function(){
      $(".searchbtn").click(function(){
          $(".customnav").addClass("searchOpen");
          $("body").css("position","fixed");
      });
      $(".closebtn").click(function(){
        $(".customnav").removeClass("searchOpen");
        $("body").css("position","inherit");
    });
    });
    
    
    // For New arrival books in elibrary page
    $('.bookarival-slides').owlCarousel({
      loop:false,
      nav:true,
      dots:false,
      margin:20,
      responsiveClass:true,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:4, 
              margin:10
          },
          1400:{
            items:4,  
            margin:20
        }  
      } 
    })
    $(".bookarival-slides .owl-prev").html(' <i class="fas fa-arrow-circle-left"></i>'); 
    $(".bookarival-slides .owl-next").html(' <i class="fas fa-arrow-circle-right"></i>'); 
    
    // For media gallery details page
    $('.mediagalleryalbum').owlCarousel({
      loop:true,
      nav:true, 
      items:1, 
      dots:false
    })
    $(".mediagalleryalbum .owl-prev").html(' <i class="fas fa-arrow-circle-left"></i>'); 
    $(".mediagalleryalbum .owl-next").html(' <i class="fas fa-arrow-circle-right"></i>'); 
    
    
    // For media gallery details page
    $('.mediagalleryalbum2').owlCarousel({
      loop:true,
      nav:false, 
      items:1, 
      autoplay: true,   
      dots:false
    })
    $(".mediagalleryalbum2 .owl-prev").html(' <i class="fas fa-arrow-circle-left"></i>'); 
    $(".mediagalleryalbum2 .owl-next").html(' <i class="fas fa-arrow-circle-right"></i>'); 
    
    
    // For Past Recruiters
    $('.infrastructureSlides').owlCarousel({
      loop:true, 
      nav:true,  
      dots:false, 
      autoplay: false,   
      margin:15, 
      responsiveClass:true,
      responsive:{
          0:{
              items:1
          },
          600:{ 
            items:1
          },  
          768:{ 
            items:2,  
            margin:15
        }
      } 
    })
    $(".infrastructureSlides .owl-prev").html(' <i class="fas fa-arrow-circle-left"></i>'); 
    $(".infrastructureSlides .owl-next").html(' <i class="fas fa-arrow-circle-right"></i>'); 
    function createCookie(name, value, days) {
        var expires;
    
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    }
    
    function readCookie(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }
    
    function eraseCookie(name) {
        createCookie(name, "", -1);
    }
    
      // For active light and dark mode 
    $(document).ready(function($) {
      $(".theme-mode-btn").click(function () {
        $(this).toggleClass("active"); 
        $("body").toggleClass("dark-mode-active");  
        if($("body").hasClass("dark-mode-active"))
        {
          createCookie("darkModeActive","T",2);
        }
        else
        {
          eraseCookie("darkModeActive");
        }
    
      }); 
    }); 
    
    
    // For font increase and decrese 
    var $affectedElements = $("body, .sidebar-list li a, .header-links a, .content-area .page-title h1, .quote-text p, .list-with-date li .card-detail-col p, .card-thumb-det h3, footer .footer-btm p, .sidebar h3, .breadcrumbh-sec ol.breadcrumb li, .breadcrumbh-sec ol.breadcrumb li a, .marquee-inner p, .list-with-date.with-sep li"); // Can be extended, ex. $("div, p, span.someClass")
    // Storing the original size in a data attribute so size can be reset
    $affectedElements.each( function(){ 
      var $this = $(this);
      $this.data("orig-size", $this.css("font-size") );
    });
    $("#btn-increase").click(function(){
      changeFontSize(1);
    })
    $("#btn-decrease").click(function(){
      changeFontSize(-1);
    })
    $("#btn-orig").click(function(){
      $affectedElements.each( function(){
            var $this = $(this);
            $this.css( "font-size" , $this.data("orig-size") );
       });
    })
    function changeFontSize(direction){
        $affectedElements.each( function(){
            var $this = $(this);
            $this.css( "font-size" , parseInt($this.css("font-size"))+direction );
        });
    }
    
    
    // For smooth scroll 
    $(document).ready(function(){
      $(".sidebar-list li a").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({  
            scrollTop: $(hash).offset().top+500  
          }, 800, function(){
               window.location.hash = hash;
          });
        }
      });
    });
    
    // For placement counter
    $('.placement-stat h3 .count').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 9000,
          easing: 'swing', 
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });
    
    $(document).ready(function(){
    $(".logincollapse .dropdown-toggle").click(function(){
      $(".loginddinner").toggleClass("show");
    });
    });