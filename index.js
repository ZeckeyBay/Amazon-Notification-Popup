import('https://code.jquery.com/jquery-3.6.0.min.js')
  .then( () => {
    (function () {
    var storageName = 'lastVisitedProducts';
    var getStorage = JSON.parse(localStorage.getItem(storageName)) || [];
    var url = window.location.href

    if (url.indexOf('dp') > -1) {
        var productStorage = getStorage;
        var discountRate = ['10','20','30','40','50']
        var discount = discountRate[Math.floor(Math.random() * discountRate.length)];
        var productDetails = {
            name: jQuery('#productTitle').text().trim(),
            productUrl: url,
            image: jQuery('.imgTagWrapper').children('img').attr('src'),
            discount: discount
        };
        
        var isProductVisitedBefore = false;

        getStorage.some(function(item){
            if (item.name.indexOf(productDetails.name) > -1) {
                isProductVisitedBefore = true

                return true;
            }
        });

        !isProductVisitedBefore && productStorage.push(productDetails);
        
        localStorage.setItem(storageName, JSON.stringify(productStorage.slice(-3)));
    } else if(getStorage.length === 3) {
        var notifications = '';

        getStorage.forEach(function(element) {
            notifications +=
                '<a class="notifications"  href="' + element.productUrl + '" style="margin-bottom: 10px;" onmouseover="this.style.backgroundColor = \'#ddd\'"; onmouseout="this.style.backgroundColor = \'white\'";>' +
                    '<img class="product-image" style="background-image: url(' + element.image + ');' +
                        'height: 60px;' +
                        'width: 45px;' +
                        'background-size: contain;' +
                        'background-repeat: no-repeat;">' +
                    '<span class="product-name" style="' +
                        'font-size: 14px;' +
                        'font-weight: 400;' +
                        'width: 80%;' +
                        'padding-left: 10px;' +
                        'height: 60px;' +
                        'align-items: center;">' + '<strong>Summer Sale -' + element.discount + '%</strong>' + '<br>'  + element.name + '</span>' +
                '</a>';
        });

        var html =
        '<div class="notification-bell" style="height: 50px;' +
            'width: 50px;' +
            'z-index: 999999999999;' +
            'background-color: #ffbd59;' +
            'display: block;' +
            'position: fixed;' +
            'color: white;' +
            'top: 50%;' +
            'right: 1%;' +
            'border-radius: 25px;">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bell" viewBox="0 0 16 16" style="' +
            'margin-top: 10px;' +
            'margin-left: 10px;' +
            'cursor: pointer;">' +
                '<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>' +
            '</svg>' +
            '<span class="close-button" style="' +
                'display: none;' +
                'font-size: 32px;' +
                'cursor: pointer;' +
                'left: 15.5px;' +
                'position: relative;' +
                'top: 15px;">X</span>' +
            '<div class="notification-title" style="' +             
                'display:none;' +
                'font-size: 25px;' +
                'top: -330px;' +
                'color: white;' +
                'display: none;' +
                'left: -455px;' +
                'width: 450px;' +
                'position: relative;' +
                'border-radius: 10px 10px 0px 0px;' +
                'padding-left: 15px;' +
                'padding-top: 20px;' +
                'padding-bottom: 10px;' +
                'font-weight: bold;' +
                'background-color: #ffbd59;">Discover Amazing Deals' +
                '<div class="notification-container" style="' +
                    'display:none;' +
                    'border: 2px solid #ffbd59;' +
                    'top: 20px;' +
                    'color: white;' +
                    'border-radius: 0 0 10px 10px;' +
                    'display: none;' +
                    'left: -15px;' +
                    'width: 450px;' +
                    'position: relative;' +
                    'padding-left: 10px;' +
                    'padding-bottom: 5px;' +
                    'padding-top: 15px;' +
                    'background-color: white;' +
                    'height: 230px;">' +
                    notifications +
                '</div>' +
            '</div>' +
        '</div>';

        jQuery('.notification-bell').remove()
        jQuery('body').append(html);
        jQuery('.notifications').css('display', 'flex');
        jQuery('.notification-bell svg, .notification-bell .close-button').on('click.toggle:notification', function(){
            jQuery('.notification-title, .notification-container, .close-button,  .notification-bell svg').toggle();
        });
    }
})();
})
    



